import React from "react";

export const Image: React.FC<
  React.PropsWithChildren<{ src: string; imgClassName?: string; alt?: string }>
> = ({ src, alt, imgClassName  }) => {
  if (!src) {
    throw new Error("[Image] src was not provided");
  }

  return (
    <img
      className={`${imgClassName} cursor-pointer object-contain hover:object-scale-down rounded-lg grayscale hover:grayscale-0`}
      src={src}
      alt={alt ?? ""}
    />
  );
};
