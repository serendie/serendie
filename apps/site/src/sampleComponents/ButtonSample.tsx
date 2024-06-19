import { Button } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";
import type { ComponentProps } from "react";
import { StateMatrix } from "src/components/StateMatrix";

export function SizeSample() {
  return (
    <HBox>
      <VBox>
        <Button size="small">Click me</Button>
        <p>Small</p>
      </VBox>
      <VBox>
        <Button size="medium">Click me</Button>
        <p>Medium</p>
      </VBox>
    </HBox>
  );
}

export const StateSample: React.FC = () => {
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
