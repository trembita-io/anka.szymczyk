import { withPrefix } from "gatsby";
import * as React from "react";
import { Divider, Heading } from "theme-ui";
import { Contact } from "../../components/shared/contact";
import { Image } from "../../components/shared/image";
import { PageTitle } from "../../components/shared/page-title";
import Layout from "../../components/structure/layout";
import * as styles from "./about.module.scss";

const AboutPage = () => {
  return (
    <Layout>
      <PageTitle title="Anka Szymczyk"></PageTitle>
      <article className={styles.informationGeneral}>
        <Image
          imgClassName="h-80 w-auto mx-auto sm:float-left sm:mr-4 mb-4 md:mb-1"
          src={withPrefix("/about.jpeg")}
        ></Image>
        <Heading>
          {" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Anna Szymczyk
          </span>{" "}
          was born in 1968 in Mrągowo and studied at the European Academy of
          Arts.
        </Heading>
        <section>
          A wide range of her art activities, such as, among others - drawing,
          painting, sculpting, furniture design - have become a natural part of
          her daily life. Her paintings express the desire to make the world
          warmer and friendlier whereas her sculptures convey the message of
          immaterial values and go far beyond just decorative or symbolic
          function. They deal with the relationship between people and the world
          around them.
        </section>

        <Heading className="mt-2">
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400">
            Meaning
          </span>
        </Heading>
        <section>
          Her artworks depict a critical view of the world, provide a dialogue
          with history, represent artist’s pacifist attitude, and her sense of
          humor. Animals play a key role in her works, they also appear in
          architecture, urban planning and interior design. The depictions of
          plants and animals may seem strange or exaggerated. However, they show
          the artist’s interests, passions and her system of values. Szymczak
          willingly supports charity with her works and is devoted to animal
          rights activism . Her works have been presented at several individual
          and several collective exhibitions.
        </section>
      </article>

      <article>
        <Heading className="mt-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Exhibitions, Wystawy indywidualne:
          </span>
        </Heading>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside">
          <li className="flex items-center">
            <DoneCheck />
            <span>
              <time dateTime="2021">2021</time> - Wystawa pasteli w Galerii
              Stara Prochownia w Warszawie
            </span>
          </li>
          <li className="flex items-center">
            <DoneCheck></DoneCheck>
            <span>
              <time dateTime="2021">2021</time> - Wystawa pasteli w galerii w
              Wojewódzkiej Bibliotece w Krakowie
            </span>
          </li>
          <li className="flex items-center">
            <DoneCheck></DoneCheck>
            <span>
              <time dateTime="2020">2020</time> - Wystawa pasteli w Galerii w
              Pałacu Vauxhall w Krzeszowicach
            </span>
          </li>
          <li className="flex items-center">
            <DoneCheck></DoneCheck>
            <span>
              <time dateTime="2019">2019</time> - Biennale pasteli, Nowy Sącz
            </span>
          </li>
          <li className="flex items-center">
            <DoneCheck></DoneCheck>
            <span>
              <time dateTime="2015">2015</time> - Międzynarodowa wystawa w
              Warszawie ZPAP
            </span>
          </li>
          <li className="flex items-center">
            <DoneCheck></DoneCheck>
            <span>
              <time dateTime="2014">2014</time> - "Flower power", Ostrów
              Mazowiecka, Polska Wystawy zbiorowe
            </span>
          </li>
          <li className="flex items-center">
            <DoneCheck></DoneCheck>
            <span>
              <time dateTime="2011">2011</time> - " Stół, który włożył buty"
              Biała Podlaska, Polska
            </span>
          </li>
        </ul>

        <Divider className="mt-4" />
        <div className="float-right mr-10">
          <Contact />
        </div>
      </article>
    </Layout>
  );
};

export const Head = () => <title>About</title>;

export default AboutPage;

const DoneCheck = () => (
  <svg
    className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
