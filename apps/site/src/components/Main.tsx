import { styled } from "styled-system/jsx";

export const MainGrid = styled("div", {
  base: {
    h: "100%",
    display: "grid",
    gridTemplateColumns: "max-content minmax(auto, 1120px)",
    gap: "80px",
    pr: "40px",
    justifyContent: "center",
    expandedDown: {
      gridTemplateColumns: "minmax(auto, 1120px)",
    },
    mdDown: {
      gap: "24px",
      pr: "0px",
    },
  },
});

export const Main = styled("main", {
  base: {
    maxW: "100vw",
    py: "56px",
    color: "web.system.color.component.onSurface",
    pt: "0px",
    sm: {
      maxW: "calc(1200px + 80px * 2)",
      py: "56px",
    },
    "& p": {
      my: "sd.system.dimension.spacing.extraLarge",
      textStyle: "sd.system.typography.body.small_compact",
    },
    "& h2": {
      fontWeight: "sd.reference.typography.fontWeight.bold",
      my: "sd.system.dimension.spacing.extraLarge",
      fontSize: "20px",
      sm: {
        my: "sd.system.dimension.spacing.extraLarge",
        fontSize: "24px",
      },
    },
    "& h3": {
      my: "sd.system.dimension.spacing.medium",
      fontWeight: "sd.reference.typography.fontWeight.bold",
      fontSize: "sd.reference.typography.scale.expanded.medium",
      sm: {
        my: "sd.system.dimension.spacing.extraLarge",
        fontSize: "sd.reference.typography.scale.compact.extraLarge",
      },
    },
    "& ol": {
      pl: "sd.system.dimension.spacing.large",
      textStyle: "sd.system.typography.body.small_compact",
      "& li": {
        listStyle: "decimal",
      },
    },
    "& svg": {
      maxWidth: "100%",
      height: "auto",
    },
    "& strong": {
      fontWeight: "sd.reference.typography.fontWeight.regular",
      color: "web.system.color.component.onSurface",
      px: "2px",
      py: "1px",
      backgroundColor: "web.system.color.impression.tertiary",
    },
  },
});

export const MainTitle = styled("h1", {
  base: {
    textStyle: "sd.system.typography.headline.large_expanded",
    mb: "sd.system.dimension.spacing.medium",
    mdDown: {
      px: "24px",
    },
  },
});
