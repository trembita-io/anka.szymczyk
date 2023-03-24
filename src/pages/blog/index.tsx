import { graphql, HeadFC, Link } from "gatsby";
import React from "react";
import Seo from "../../components/accessabilities/seo";
import Layout from "../../components/structure/layout";
import { PageTitle } from "../../components/shared/page-title";
import { Time } from "../../components/shared/time";
import * as styles from './blog.module.scss';

const BlogPage = ({ data }: { data: Props }) => {
  const { nodes: blogPosts, totalCount } = data.allMdx;
  const {container, smaller, devider, article, article__link} = styles;

  return (
    <Layout>
      <PageTitle title="Anka Szymczyk">
        <sub className={smaller}>{totalCount} posts</sub>
      </PageTitle>

      <main className={container}>
        {blogPosts.map(
          (
            {
              id,
              excerpt,
              frontmatter: { title, date, slug },
              parent: { modifiedTime },
            },
            index
          ) => (
            <React.Fragment key={id}>
              <Link className={article__link} to={slug?.toLowerCase()}>
                <article className={article}>
                  <Time date={date} modifiedTime={modifiedTime}></Time>

                  <h2 className="text-2xl">{title}</h2>

                  <span> {excerpt.slice(0, 200)}...</span>
                </article>
              </Link>

              {index !== totalCount - 1 && <hr className={`${devider} my-4`} />}
            </React.Fragment>
          )
        )}
      </main>
    </Layout>
  );
};

type Props = {
  allMdx: {
    nodes: Array<{
      frontmatter: {
        title: string;
        date: string;
        slug: string;
      };
      excerpt: string;
      id: string;
      parent: {
        modifiedTime: string;
      }
    }>;
    totalCount: number;
  };
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }, filter: {internal: {contentFilePath: {regex: "/content/blog/"}}}) {
      nodes {
        id
        excerpt
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
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

export default BlogPage;

export const Head: HeadFC = () => <Seo title="Blog" />;
