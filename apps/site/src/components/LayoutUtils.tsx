import { Box, styled } from "@spread/ui/jsx";

export const HBox = styled(Box, {
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: "dic.system.dimension.spacing.extraLarge",
  },
});

export const VBox = styled(Box, {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "dic.system.dimension.spacing.medium",
  },
});

export const Dl = styled("dl", {
  base: {
    display: "grid",
    gridTemplateColumns: "80px auto",
    alignItems: "center",
    rowGap: "dic.system.dimension.spacing.threeExtraLarge",
    columnGap: "dic.system.dimension.spacing.medium",
  },
});

export const Dt = styled("dt", {
  base: {
    fontWeight: "bold",
  },
});

export const Dd = styled("dd", {
  base: {
    margin: 0,
  },
});
