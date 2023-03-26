import { graphql, useStaticQuery } from "gatsby";

type Props = {
  allSiteBuildMetadata: {
    nodes: Array<{
      buildTime: string;
    }>;
  };
};

export const useBuildTime = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      allSiteBuildMetadata {
        nodes {
          buildTime
        }
      }
    }
  `);

  return data.allSiteBuildMetadata.nodes?.[0]?.buildTime;
};
