/** @jsx jsx */
import { Link } from "gatsby";
import { readableColor } from "polished";
import { jsx } from "theme-ui";
// import useJodieConfig from "../hooks/use-jodie-config"

const Navigation = ({ bg }: { bg: string }) => {
  // const { navigation, basePath } = useJodieConfig()

  return (
    <nav
      aria-label="Primary Navigation"
      sx={{
        a: {
          color: readableColor(bg),
          textDecoration: `none`,
          fontSize: [1, 2, 2, 3],
          marginLeft: [2, 3, 3, 0],
          "&:hover,&:focus": {
            color: readableColor(bg, `primary`, `primaryLight`, false),
          },
        },
        ul: {
          margin: 0,
          padding: 0,
          li: {
            listStyle: `none`,
            display: [`inline-block`, `inline-block`, `inline-block`, `block`],
          },
        },
        variant: `navigation`,
      }}
    >
      <ul>
        {/* {navigation.map((navItem) => (
          <li key={navItem.slug}>
            <Link sx={(t) => ({ ...t.styles?.a })} to={replaceSlashes(`/${basePath}/${navItem.slug}`)}>
              {navItem.name}
            </Link>
          </li>
        ))} */}

        {/* {[undefined, "blog", "about"].map((navItem) => ( */}
        {[undefined, "about"].map((navItem) => (
          <li key={navItem ?? ""}>
            <Link to={`/${navItem ?? ""}`}>
              {(navItem ?? "Home").toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
