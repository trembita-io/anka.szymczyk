import { graphql, PageProps } from 'gatsby';
import * as React from 'react'
import { More } from '../../components/more';
import Layout from '../../components/layout'
import { PageTitle } from '../../components/page-title';
import Seo from '../../components/seo'

import * as styles from './blog.module.scss';

type Props = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
    };
    id: string;
    parent: {
      modifiedTime: string;
    };
  };
};

const BlogPost:React.FC<PageProps<Props>> = (props) => {
  const {
    data: {
      mdx: {
        frontmatter: { title, date },
        parent: { modifiedTime },
      },
    },
  } = props;
  const { children } = props;

  const {smaller, article,} = styles;

  return (
    <Layout>
      <PageTitle
        title={title}
        date={date}
        modifiedTime={modifiedTime}
      ></PageTitle>
      <article className={article}>{children}</article>
      <More />
    </Layout>
  );
}

export const Head = ({data}: {data: Props}) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
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