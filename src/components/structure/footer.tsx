/** @jsx jsx */
import { readableColor } from "polished";
import { get, jsx, Link } from "theme-ui";
import { useBuildTime } from "../../data/static/metadata/buildTime";
import useSiteMetadata from "../../data/static/metadata/use-site-metadata";

const Footer = ({ bg }: { bg: string }) => {
  const { siteTitle } = useSiteMetadata();
  const buildTime = useBuildTime();

  return (
    <footer
      sx={{
        position: [`relative`, `relative`, `relative`, `fixed`],
        width: (t) => [
          `100%`,
          `100%`,
          `100%`,
          get(t, `sidebar.normal`),
          get(t, `sidebar.wide`),
        ],
        bottom: 0,
        // color: text,
        fontSize: 0,
        p: [3, 3, 4],
        background: bg,
        a: {
          color: readableColor(bg),
          "&:hover,&:focus": {
            color: readableColor(bg, `primary`, `primaryLight`, false),
          },
        },
        variant: `footer`,
      }}
    >
      <p>
        &copy; {new Date().getFullYear()}, {" "}
        <a href="https://www.facebook.com/anka.szymczyk.1" target="_blank">
          {siteTitle}.
        </a>
      </p>
      <p>All rights reserved.</p> <br />
      <p>
          Site by {" "}
        <Link
          aria-label="Link to the theme author's website"
          target="_blank"
          href="https://github.com/trembita-io"
        >
          Trembita.io
        </Link>
      </p>
      <p>Updated at <time dateTime={buildTime}>{buildTime}</time></p>
    </footer>
  );
};

export default Footer;
