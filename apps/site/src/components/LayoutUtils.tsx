import { Box, styled } from "styled-system/jsx";

export const HBox = styled(Box, {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: "sd.system.dimension.spacing.small",
    flexWrap: "wrap",
    sm: {
      gap: "sd.system.dimension.spacing.extraLarge",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
    },
  },
});

export const VBox = styled(Box, {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "sd.system.dimension.spacing.small",
    sm: {
      gap: "sd.system.dimension.spacing.extraLarge",
    },
    "& p": {
      my: 0,
    },
  },
});

export const Dl = styled("dl", {
  base: {
    display: "grid",
    gridTemplateColumns: "80px auto",
    alignItems: "center",
    rowGap: "sd.system.dimension.spacing.threeExtraLarge",
    columnGap: "sd.system.dimension.spacing.medium",
  },
  variants: {
    variant: {
      dim: {
        rowGap: 0,
        "& dd": {
          bg: "sd.reference.color.scale.gray.100",
          p: "24px",
        },
      },
    },
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
