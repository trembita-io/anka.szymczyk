import { graphql, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react";
import Seo from "../../components/accessabilities/seo";
import { Contact } from "../../components/shared/contact";
import { More } from "../../components/shared/more";
import { PageTitle } from "../../components/shared/page-title";
import { Time } from "../../components/shared/time";
import Layout from "../../components/structure/layout";

type Props = {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      sold?: boolean;
      price?: string;
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
  allFile: {
    nodes: Array<{
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    }>;
  }
};

const Project: React.FC<PageProps<Props>> = (props) => {
  console.log(props);

  const {
    data: {
      mdx: {
        frontmatter: { title, date, sold, price },
      },
      allFile: {
        nodes: allImages
      }
    },
  } = props;
  const { children } = props;

  // console.log(nodes)
  // const allImages = [cover].concat(images);

  return (
    <Layout>
      <PageTitle title={title} time={<Time date={date}></Time>}></PageTitle>

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

      {!sold && !!price && (
        <div className="mt-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Interested in acquiring?
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400">
              Contact me 
            </span>
          </h1>
          <Contact></Contact>
        </div>
      )}

      <More to="../../" />
    </Layout>
  );
};

export const Head = ({ data }: { data: Props }) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default Project;

export const query = graphql`
  query MyQuery($id: String, $frontmatter__slug: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        sold
        price
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
    allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, dir: {regex: $frontmatter__slug}}) {
      nodes {
        childImageSharp {
          gatsbyImageData(
            width: 1200
            quality: 90
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`;
