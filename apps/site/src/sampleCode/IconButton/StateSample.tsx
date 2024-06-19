import { IconButton } from "@serendie/ui";
import type { ComponentProps } from "react";
import { StateMatrix } from "src/components/StateMatrix";

export const StateSample: React.FC = () => {
  return (
    <StateMatrix<ComponentProps<typeof IconButton>>
      component={IconButton}
      propsName="styleType"
      states={["enabled", "hover", "focus-visible", "disabled"]}
      props={["filled", "ghost", "outlined"]}
    />
  );
};
