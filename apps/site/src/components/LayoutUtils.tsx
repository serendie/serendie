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
