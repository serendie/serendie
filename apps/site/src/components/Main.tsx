import { styled } from "@serendie/ui/jsx";

export const MainGrid = styled("div", {
  base: {
    h: "100%",
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
  },
});

export const Main = styled("main", {
  base: {
    maxW: "calc(1000px + 80px * 2)",
    py: "56px",
    px: "80px",
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
  },
});
