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
    pt: "0px",
    sm: {
      maxW: "calc(1200px + 80px * 2)",
      py: "56px",
    },
    "& p": {
      my: "sd.system.dimension.spacing.extraLarge",
      textStyle: "sd.system.typography.body.small_compact",
    },
    "& h3": {
      my: "sd.system.dimension.spacing.extraLarge",
      textStyle: "sd.system.typography.title.large_compact",
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
