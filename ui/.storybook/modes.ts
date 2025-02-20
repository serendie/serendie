import tokens from "@serendie/design-token";

const breakpoints = tokens.sd.reference.dimension.breakpoint;

type ViewportMode = {
  name: string;
  styles: {
    width: string;
    height: string;
  };
};

type AllModes = Record<string, ViewportMode>;

export const viewports = Object.entries(breakpoints).reduce<AllModes>(
  (acc, [key, value]) => {
    acc[key] = {
      name: key,
      styles: { width: value, height: "900px" },
    };
    return acc;
  },
  {}
);

export const allModes = viewports;
