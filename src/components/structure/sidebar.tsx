/** @jsx jsx */
import { Link } from "gatsby";
import { readableColor } from "polished";
import { get, jsx } from "theme-ui";
import useSiteMetadata from "../../data/static/metadata/use-site-metadata";
import Logo from "../shared/logo";
// import useJodieConfig from "../hooks/use-jodie-config"
import { Contact } from "../shared/contact";
import Navigation from "./navigation";

type SidebarProps = { bg: string };

const Sidebar = ({ bg }: SidebarProps) => {
  const { siteTitle } = useSiteMetadata();
  // const { basePath } = useJodieConfig()
  const basePath = "/";

  return (
    <header
      sx={{
        p: [3, 3, 4],
        width: (t) => [
          `100%`,
          `100%`,
          `100%`,
          get(t, `sidebar.normal`),
          get(t, `sidebar.wide`),
        ],
        backgroundColor: bg,
        position: [`relative`, `relative`, `relative`, `fixed`],
        height: `100%`,
        display: `flex`,
        flexDirection: [`row`, `row`, `row`, `column`],
        alignItems: [`center`, `center`, `center`, `flex-start`],
        justifyContent: [
          `space-between`,
          `space-between`,
          `space-between`,
          `flex-start`,
        ],
        svg: {
          fill: readableColor(bg),
        },
        variant: `sidebar`,
      }}
      data-testid="sidebar"
    >
      <Link
        to={basePath}
        aria-label={`${siteTitle}, Back to Home`}
        sx={{ width: [`3rem`, `4rem`, `4.5rem`, `5rem`] }}
      >
        <Logo />
      </Link>
      <div sx={{ py: 4, display: [`none`, `none`, `none`, `block`] }} />
      <Navigation bg={bg} />

      <div className="hidden lg:block mt-auto mb-28">
        <Contact />
      </div>
    </header>
  );
};

export default Sidebar;
