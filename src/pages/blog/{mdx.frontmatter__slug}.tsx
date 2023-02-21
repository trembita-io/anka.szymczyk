import { graphql, PageProps } from 'gatsby';
import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

import * as styles from './blog.module.scss';
import * as articleStyles from './article.module.scss';

type Props = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
    };
    excerpt: string;
    id: string;
    parent: {
      modifiedTime: string;
    };
  };
};

const BlogPost:React.FC<PageProps<Props>> = (props) => {
  const { data: { mdx: { id, frontmatter: { title, date }, excerpt, parent: {modifiedTime} }} } = props;
  const { children } = props;

  const {container, smaller, devider, article, article__link} = styles;

  return (
    <Layout>
      <article className={article}>
        <span className={smaller}>
          {date}
        {date !== modifiedTime && (
          <span className={smaller}>, Updated: {modifiedTime}</span>
        )}
        </span>

        <h2>{title}</h2>
        <article className={`${articleStyles.article} text-center sm:text-left`}>{children}</article>
      </article>
    </Layout>
  );
}

export const Head = ({data}: {data: Props}) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      parent {
        ... on File {
          modifiedTime(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`