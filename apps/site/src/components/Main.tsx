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
  },
});
