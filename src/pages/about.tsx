import * as React from "react";
import Layout from "../components/layout";
import { PageTitle } from "../components/page-title";

const AboutPage = () => {
  return (
    <Layout>
      <PageTitle title="Anka Szymczyk"></PageTitle>
      <p>Hi there! My name is Anka Szymczyk.</p>
    </Layout>
  );
};

export const Head = () => <title>About</title>;

export default AboutPage;
