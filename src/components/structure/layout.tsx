/** @jsx jsx */
import { jsx, get } from "theme-ui";
import * as React from "react";
import { Global } from "@emotion/react";
import Wrapper from "./layout-wrapper";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { SkipNavTarget, SkipNavTrigger } from "../accessabilities/skip-nav";
import CookieConsent from "react-cookie-consent";

type LayoutProps = { children: React.ReactNode; color?: string, slim?: boolean; };

const Layout = ({ children, color = `white`, slim }: LayoutProps) => (
  <React.Fragment>
    <Global
      styles={(t) => ({
        "*,*:after,*:before": {
          boxSizing: `border-box`,
        },
        html: {
          fontSize: `18px`,
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        "[hidden]": {
          display: `none`,
        },
        "::selection": {
          background: get(t, `colors.primary`),
          color: get(t, `colors.white`),
        },
        "ul > li > code, ol > li > code, p > code": {
          color: `#393A34`,
          background: `#f6f8fa`,
          padding: 2,
        },
        "@media(max-width: 600px)": {
          html: {
            fontSize: `16px`,
          },
        },
      })}
    />
    <SkipNavTrigger />
    <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    <Wrapper>
      <Sidebar bg={color} />
      <main className={`container mx-auto ${!slim && 'px-4 py-4'}`} sx={{ gridColumnStart: [1, 1, 1, 2] }}>
        <SkipNavTarget />
        {children}
      </main>
      <Footer bg={color} />
    </Wrapper>
  </React.Fragment>
);

export default Layout;
