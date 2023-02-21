import { graphql, HeadFC, Link } from "gatsby";
import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import * as styles from './blog.module.scss';

const BlogPage = ({ data }: { data: Props }) => {
  console.log(data, styles);

  const { nodes: blogPosts, totalCount } = data.allMdx;
  const {container, smaller, devider, article, article__link} = styles;

  return (
    <Layout>
      <h1>
        Anka Szymczyk
        <sub className={smaller}>{totalCount} posts</sub>
      </h1>

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
                <span className={smaller}>{date}</span>
                <h2>{title}</h2>

                <span> {excerpt.slice(0, 200)}...</span>

                {date !== modifiedTime && (
                  <p className={smaller}>Updated: {modifiedTime}</p>
                )}
              </article>
              </Link>

              {index !== totalCount - 1 && <hr className={devider} />}
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
