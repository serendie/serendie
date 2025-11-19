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
      name: `breakpoint/${key}`,
      styles: { width: value, height: "900px" },
    };
    return acc;
  },
  {}
);

export const allModes = Object.entries(breakpoints).reduce<{
  [key: string]: {
    viewport: string;
  };
}>((acc, [key]) => {
  acc[key] = {
    viewport: key,
  };
  return acc;
}, {});
