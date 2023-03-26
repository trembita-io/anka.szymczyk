/** @jsx jsx */
import { graphql, HeadFC, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react";
import { useState } from "react";
import { jsx } from "theme-ui";
import Seo from "../components/accessabilities/seo";
import GridItem from "../components/home/grid-item";
import { GroupTitle } from "../components/home/group-title";
import Layout from "../components/structure/layout";
import locales from "../locales";
import { itemListWrapperStyles, itemStyles } from "../styles/item-list";
import { visuallyHidden } from "../styles/utils";

export type HomepageProps = {
  allMdx: {
    nodes: {
      frontmatter: {
        hidden?: boolean;
        title: string;
        slug: string;
        category: string;
        price?: string;
        sold?: boolean;
        cover: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
      __typename: "MdxProject";
    }[];
  };
};

const Homepage: React.FC<PageProps<HomepageProps>> = ({ data }) => {
  const { allMdx: projects } = data;
  const allProjects = [...projects.nodes];

  const visibleProjects = allProjects.filter(
    ({ frontmatter: item }) => item.hidden !== true
  );

  const allFilters = ["All"].concat([
    ...new Set(
      visibleProjects.map(({ frontmatter: { category } }) => category)
    ),
  ]);

  const [active, setActive] = useState("All");

  const sellingItems = visibleProjects.filter(
    ({ frontmatter: item }) => !!item.price
  );

  // const itemsCount = sellingItems.length;
  let divisor = 1;

  // for (let i = 0; i < itemsCount; i++) {
  //   const quotient = itemsCount % divisor;
  //   const quotientAlt = (itemsCount - 1) % divisor;

  //   if (quotient === 0 || quotientAlt === 0) {
  //     break;
  //   }

  //   divisor -= 1;
  // }

  const [soldActive, setSoldActive] = useState("All");

  const soldItems = visibleProjects.filter(
    ({ frontmatter: item }) => !item.price || item.sold
  );

  const soldFilters = ["All"].concat([
    ...new Set(
      visibleProjects
        .filter(({ frontmatter: item }) => !item.price || item.sold)
        .map(({ frontmatter: { category } }) => category)
    ),
  ]);

  return (
    <Layout slim={true}>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.home}
      </h1>
      <div className={`item-list-wrapper`} sx={itemListWrapperStyles}>
        <GroupTitle
          title={
            sellingItems.length > 0
              ? "Available for you"
              : `I don\'t have ${active} for you.`
          }
        >
          <br />
          {allFilters.map((filter) => (
            <button
              key={`${filter}-available`}
              onClick={() => setActive(filter)}
              className={`${
                active === filter
                  ? "bg-cyan-500 border-2 border-green-500"
                  : "bg-cyan-200 text-black"
              } px-4 py-2 font-semibold text-sm  text-white rounded-full shadow-sm ml-2`}
            >
              {filter}
            </button>
          ))}
        </GroupTitle>

        <div className={`item-list div${divisor}`}>
          {sellingItems.length > 0 && (
            <React.Fragment>
              {sellingItems
                .filter(
                  ({ frontmatter: item }) =>
                    active === "All" || item.category === active
                )
                .map(({ frontmatter: item }, index) => (
                  <GridItem
                    to={`/projects${item.slug}`}
                    className="item"
                    key={!!item.title ? item.title : item.slug}
                    sx={itemStyles}
                    data-testid={item.title ?? item.slug}
                  >
                    {!!item.cover?.childImageSharp?.gatsbyImageData ? (
                      <GatsbyImage
                        loading={index === 0 ? `eager` : `lazy`}
                        image={item.cover?.childImageSharp?.gatsbyImageData}
                        alt=""
                      />
                    ) : (
                      <img srcSet="/logo.png" />
                    )}
                    <span>{item.title}</span>

                    {item.price && (
                      <section className="absolute mt-3 p-1 rounded-r-lg bg-white">
                        <span className="absolute -right-1 -top-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                        {item.price}
                      </section>
                    )}
                  </GridItem>
                ))}
            </React.Fragment>
          )}
        </div>

        <GroupTitle title="My art">
          <br />
          {soldFilters.map((filter) => (
            <button
              key={`${filter}-unavailable`}
              onClick={() => setSoldActive(filter)}
              className={`${
                soldActive === filter
                  ? "bg-cyan-500 border-2 border-green-500"
                  : "bg-cyan-200 text-black"
              } px-4 py-2 font-semibold text-sm  text-white rounded-full shadow-sm ml-2`}
            >
              {filter}
            </button>
          ))}
        </GroupTitle>

        <div className="item-list">
          {soldItems
            .filter(
              ({ frontmatter: item }) =>
                soldActive === "All" || item.category === soldActive
            )
            .map(({ frontmatter: item }, index) => (
              <GridItem
                to={`/projects${item.slug}`}
                className="item"
                key={!!item.title ? item.title : item.slug}
                sx={itemStyles}
                data-testid={item.title ?? item.slug}
              >
                {!!item.cover?.childImageSharp?.gatsbyImageData ? (
                  <GatsbyImage
                    loading={index === 0 ? `eager` : `lazy`}
                    image={item.cover?.childImageSharp?.gatsbyImageData}
                    alt=""
                  />
                ) : (
                  <img srcSet="/logo.png" />
                )}
                <span>{item.title}</span>
              </GridItem>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { internal: { contentFilePath: { regex: "/content/projects/" } } }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          hidden
          date(formatString: "MMMM D, YYYY")
          title
          slug
          color
          price
          category
          sold
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                quality: 90
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
      }
      totalCount
    }
  }
`;

export default Homepage;

export const Head: HeadFC = () => <Seo />;
