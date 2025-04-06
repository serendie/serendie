import { Accordion } from "@ark-ui/react";
import { styled } from "../../styled-system/jsx";

export const AccordionGroup = styled(Accordion.Root, {
  base: {
    display: "flex",
    flexDirection: "column",
  },
});
