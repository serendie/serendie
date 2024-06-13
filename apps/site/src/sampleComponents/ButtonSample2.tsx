import { Button } from "@spread/ui";
import type { ComponentProps } from "react";
import { StateMatrix } from "src/components/StateMatrix";

export const ButtonSample2: React.FC = () => {
  return (
    <StateMatrix<ComponentProps<typeof Button>>
      component={Button}
      children="Button"
      propsName="styleType"
      states={["enabled", "hover", "focus-visible", "disabled"]}
      props={["filled", "ghost", "outline", "rounded"]}
    />
  );
};
