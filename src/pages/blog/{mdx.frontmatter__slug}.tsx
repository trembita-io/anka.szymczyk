import { graphql, PageProps } from "gatsby";
import * as React from "react";
import Seo from "../../components/accessabilities/seo";
import { More } from "../../components/shared/more";
import { PageTitle } from "../../components/shared/page-title";
import Layout from "../../components/structure/layout";

import { Time } from "../../components/shared/time";
import * as styles from "./blog.module.scss";

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

const BlogPost: React.FC<PageProps<Props>> = (props) => {
  const {
    data: {
      mdx: {
        frontmatter: { title, date },
        parent: { modifiedTime },
      },
    },
  } = props;
  const { children } = props;

  const { smaller, article } = styles;

  return (
    <Layout>
      <PageTitle title={title} time={<Time date={date} modifiedTime={modifiedTime}></Time>}>
      </PageTitle>
      <article className={article}>{children}</article>
      <More />
    </Layout>
  );
};

export const Head = ({ data }: { data: Props }) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default BlogPost;

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
`;
