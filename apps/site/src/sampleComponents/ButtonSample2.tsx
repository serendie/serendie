import { Button } from "@spread/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function ButtonSample2() {
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
