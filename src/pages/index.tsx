/** @jsx jsx */
import { graphql, HeadFC, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react";
import { jsx } from "theme-ui";
import GridItem from "../components/structure/grid-item";
import Layout from "../components/structure/layout";
import Seo from "../components/accessabilities/seo";
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
  const allItems = [...projects.nodes];

  const visibleItems = allItems.filter(
    ({ frontmatter: item }) => item.hidden !== true
  );

  const sellingItems = visibleItems.filter(
    ({ frontmatter: item }) => !!item.price
  );

  const itemsCount = sellingItems.length;
  let divisor = 1;

  for (let i = 0; i < itemsCount; i++) {
    const quotient = itemsCount % divisor;
    const quotientAlt = (itemsCount - 1) % divisor;

    if (quotient === 0 || quotientAlt === 0) {
      break;
    }

    divisor -= 1;
  }

  const soldItems = visibleItems.filter(
    ({ frontmatter: item }) => !item.price || item.sold
  );

  return (
    <Layout slim={true}>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.home}
      </h1>
      <div className={`item-list-wrapper`} sx={itemListWrapperStyles}>
        {sellingItems.length > 0 && <div className="relative isolate  gap-x-6 overflow-hidden bg-gray-50 py-2.5 px-6 sm:px-3.5 text-center">
            <svg
              viewBox="0 0 577 310"
              aria-hidden="true"
              className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
            >
              <path
                id="1d77c128-3ec1-4660-a7f6-26c7006705ad"
                fill="url(#49a52b64-16c6-4eb9-931b-8e24bf34e053)"
                fill-opacity=".3"
                d="m142.787 168.697-75.331 62.132L.016 88.702l142.771 79.995 135.671-111.9c-16.495 64.083-23.088 173.257 82.496 97.291C492.935 59.13 494.936-54.366 549.339 30.385c43.523 67.8 24.892 159.548 10.136 196.946l-128.493-95.28-36.628 177.599-251.567-140.953Z"
              />
              <defs>
                <linearGradient
                  id="49a52b64-16c6-4eb9-931b-8e24bf34e053"
                  x1="614.778"
                  x2="-42.453"
                  y1="26.617"
                  y2="96.115"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#9089FC" />
                  <stop offset="1" stop-color="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              viewBox="0 0 577 310"
              aria-hidden="true"
              className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
            >
              <use href="#1d77c128-3ec1-4660-a7f6-26c7006705ad" />
            </svg>

            <p className="text-sm leading-6 text-gray-900">
              <strong className="font-semibold">Available for you</strong>
              {/* <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg> */}
              {/* Join us in Denver from June 7 – 9 to see what’s coming next. */}
            </p>

            {/* <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div> */}
          </div>}
        <div className={`item-list div${divisor}`}>
          {sellingItems.length > 0 ? (
            <React.Fragment>
              {sellingItems.map(({ frontmatter: item }, index) => (
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

                  {item.price && item.sold !== false && (
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
          ) : (
            <div sx={{ padding: 3 }}>I don't sell anything right now.</div>
          )}
        </div>

        {sellingItems.length > 0 && (
          <div className="relative isolate  gap-x-6 overflow-hidden bg-gray-50 py-2.5 px-6 sm:px-3.5 text-center">
            <svg
              viewBox="0 0 577 310"
              aria-hidden="true"
              className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
            >
              <path
                id="1d77c128-3ec1-4660-a7f6-26c7006705ad"
                fill="url(#49a52b64-16c6-4eb9-931b-8e24bf34e053)"
                fill-opacity=".3"
                d="m142.787 168.697-75.331 62.132L.016 88.702l142.771 79.995 135.671-111.9c-16.495 64.083-23.088 173.257 82.496 97.291C492.935 59.13 494.936-54.366 549.339 30.385c43.523 67.8 24.892 159.548 10.136 196.946l-128.493-95.28-36.628 177.599-251.567-140.953Z"
              />
              <defs>
                <linearGradient
                  id="49a52b64-16c6-4eb9-931b-8e24bf34e053"
                  x1="614.778"
                  x2="-42.453"
                  y1="26.617"
                  y2="96.115"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#9089FC" />
                  <stop offset="1" stop-color="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              viewBox="0 0 577 310"
              aria-hidden="true"
              className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 w-[36.0625rem] -translate-y-1/2 transform-gpu blur-2xl"
            >
              <use href="#1d77c128-3ec1-4660-a7f6-26c7006705ad" />
            </svg>

            <p className="text-sm leading-6 text-gray-900">
              <strong className="font-semibold">My art</strong>
              {/* <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg> */}
              {/* Join us in Denver from June 7 – 9 to see what’s coming next. */}
            </p>

            {/* <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div> */}
          </div>
        )}

        <div className="item-list">
          {soldItems.length > 0 && (
            <React.Fragment>
              {soldItems.map(({ frontmatter: item }, index) => (
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
              ))}
            </React.Fragment>
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
          hidden
          date(formatString: "MMMM D, YYYY")
          title
          slug
          color
          price
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
