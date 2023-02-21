import * as React from "react";
import Layout from "../components/layout";

const AboutPage = () => {
  return (
    <Layout>
      <h1>Anka Szymczyk</h1>
      <p>
        Hi there! My name is Anka Szymczyk.
      </p>
    </Layout>
  );
};

export const Head = () => <title>About</title>;

export default AboutPage;
