import { HStack, VStack } from "@spread/ui/jsx";
import type React from "react";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <HStack
      justifyContent="flex-start"
      alignItems="flex-end"
      gap="dic.system.dimension.spacing.extraLarge">
      {children}
    </HStack>
  );
};

const Item: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  return (
    <VStack
      flexDirection="column"
      alignItems="center"
      gap="dic.system.dimension.spacing.medium"
      {...props}>
      {children}
    </VStack>
  );
};

const Horizontal = {
  Container,
  Item,
};

export { Horizontal };
