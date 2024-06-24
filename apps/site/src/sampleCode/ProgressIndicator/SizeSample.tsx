import { ProgressIndicator } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <HBox>
      <VBox>
        <ProgressIndicator size="small" />
        <p>Small</p>
      </VBox>
      <VBox>
        <ProgressIndicator size="medium" />
        <p>Medium</p>
      </VBox>
      <VBox>
        <ProgressIndicator size="large" />
        <p>Large</p>
      </VBox>
    </HBox>
  );
}
