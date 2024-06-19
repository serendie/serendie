import { Box, styled } from "@serendie/ui/jsx";

export const HBox = styled(Box, {
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: "sd.system.dimension.spacing.extraLarge",
  },
});

export const VBox = styled(Box, {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "sd.system.dimension.spacing.medium",
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
