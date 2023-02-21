import * as React from "react";

export const PageTitle: React.FC<
  React.PropsWithChildren<{
    title: string;
    date?: string;
    modifiedTime?: string;
  }>
> = ({ title, date, modifiedTime, children }) => (
  <React.Fragment>
    <Time date={date} modifiedTime={modifiedTime}></Time>

    <header className="text-4xl mb-4">
      {title}
      {children}
    </header>
  </React.Fragment>
);

export const Time: React.FC<
  React.PropsWithChildren<{ date?: string; modifiedTime?: string }>
> = ({ date, modifiedTime }) => (
  <React.Fragment>
    {date && (
      <span className="font-extralight text-xs text-slate-400">
        {date}
        {modifiedTime && date !== modifiedTime && (
          <span>, Updated: {modifiedTime}</span>
        )}
      </span>
    )}
  </React.Fragment>
);