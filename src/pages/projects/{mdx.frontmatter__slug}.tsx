import { graphql, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react";
import Seo from "../../components/accessabilities/seo";
import { More } from "../../components/shared/more";
import { PageTitle } from "../../components/shared/page-title";
import { Time } from "../../components/shared/time";
import Layout from "../../components/structure/layout";

type Props = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      images: Array<{
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }>;
    };
    id: string;
    parent: {
      modifiedTime: string;
    };
  };
};

const Project: React.FC<PageProps<Props>> = (props) => {
  console.log(props);

  const {
    data: {
      mdx: {
        frontmatter: { title, date, cover, images },
        parent: { modifiedTime },
      },
    },
  } = props;
  const { children } = props;

  const allImages = [cover].concat(images);

  console.log(allImages);

  return (
    <Layout>
      <PageTitle title={title} time={  <Time date={date}></Time>}>
      </PageTitle>

      <article>{children}</article>

      <section className="mt-4 py-4 text-center bg-slate-100">
        {allImages
          .filter((image) => !!image?.childImageSharp?.gatsbyImageData)
          .map((image, index) => (
            <GatsbyImage
              key={index}
              className="mt-4 rounded"
              loading={index === 0 ? `eager` : `lazy`}
              image={image.childImageSharp.gatsbyImageData}
              alt=""
            />
          ))}
      </section>

      <More to="../../" />
    </Layout>
  );
};

export const Head = ({ data }: { data: Props }) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default Project;

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              quality: 90
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        images {
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
  }
`;
