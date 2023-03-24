import { graphql, useStaticQuery } from "gatsby"

type Props = {
    allFile: {
        nodes: Array<{
            name: string;
        }>
    }
}

export const getAllStaticFiles = () => {
    const data = useStaticQuery<Props>(graphql`
        query {
            allFile {
                nodes {
                    name
                }
            }
        }
    `);

    return data.allFile.nodes;
}