/** @jsx jsx */
import { jsx, Link, useThemeUI, get } from "theme-ui";
import { readableColor } from "polished";
import useSiteMetadata from "../hooks/use-site-metadata";

const Footer = ({ bg }: { bg: string }) => {
  const { siteTitle } = useSiteMetadata();
  // const {
  //   theme: { rawColors },
  // } = useThemeUI();

  // const text = readableColor(
  //   bg,
  //   rawColors!.textMuted as string | undefined,
  //   rawColors!.textMutedLight as string | undefined
  // );

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
      <div>
        &copy; {new Date().getFullYear()} by{" "}
        <a href="https://www.facebook.com/anka.szymczyk.1" target="_blank">
          {siteTitle}
        </a>.
      </div>
      <div>
        <Link aria-label="Link to the theme's GitHub repository" href="/">
          Site
        </Link>
        {` `}
        by
        {` `}
        <Link
          aria-label="Link to the theme author's website"
          target="_blank"
          href="https://github.com/trembita-io"
        >
          Trembita.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
