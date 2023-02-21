/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import { itemListWrapperStyles, itemStyles } from "../styles/item-list";
import locales from "../locales";
import { visuallyHidden } from "../styles/utils";
import GridItem from "../components/grid-item";
import Seo from "../components/seo";
import Layout from "../components/layout";

export type HomepageProps = {
  allMdx: {
    nodes: {
      frontmatter: {
        title: string;
        slug: string;
        cover: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      }
      __typename: "MdxProject";
    }[];
  };
};

const Homepage: React.FC<PageProps<HomepageProps>> = ({
  data,
}) => {
  const { allMdx: projects } = data;
  const items = [...projects.nodes];
  const itemsCount = items.length;
  let divisor = 9;

  for (let i = 0; i < itemsCount; i++) {
    const quotient = itemsCount % divisor;
    const quotientAlt = (itemsCount - 1) % divisor;

    if (quotient === 0 || quotientAlt === 0) {
      break;
    }

    divisor -= 1;
  }

  return (
    <Layout slim={true}>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.home}
      </h1>
      <div className={`item-list-wrapper`} sx={itemListWrapperStyles}>
        <div className={`item-list div${divisor}`}>
          {items.length > 0 ? (
            items.map(({ frontmatter: item }, index) => (
              <GridItem
                to={`/projects/${item.slug}`}
                className="item"
                key={item.title}
                sx={itemStyles}
                data-testid={item.title}
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
            ))
          ) : (
            <div sx={{ padding: 3 }}>
              No projects and pages found at the locations defined for
              "projectsPath" and "pagesPath"
            </div>
          )}
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
          date(formatString: "MMMM D, YYYY")
          title
          slug
          color
          cover {
            childImageSharp {
              gatsbyImageData(width: 1200, quality: 90, formats: [AUTO, WEBP, AVIF])
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
