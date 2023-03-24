import * as React from "react";

export const PageTitle: React.FC<
  React.PropsWithChildren<{
    title: string;
    time?: React.ReactElement;
  }>
> = ({ title, time, children }) => (
  <React.Fragment>
    <header className="text-4xl mb-4">
      {title}
      {children}
      {
        time && <span> <br />{time}</span>
      }
    </header>
  </React.Fragment>
);
