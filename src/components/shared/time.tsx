import React from "react";

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