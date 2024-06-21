import { Button } from "@serendie/ui";
import type { ComponentProps } from "react";
import { StateMatrix } from "src/components/StateMatrix";

export const StateSample: React.FC = () => {
  return (
    <StateMatrix<ComponentProps<typeof Button>>
      component={Button}
      children="Button"
      propsName="styleType"
      states={["enabled", "hover", "focus-visible", "disabled"]}
      props={["filled", "ghost", "outlined", "rectangle"]}
    />
  );
};
