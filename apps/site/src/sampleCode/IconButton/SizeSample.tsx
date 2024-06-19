import { IconButton } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <HBox>
      <VBox>
        <IconButton icon="add" size="small" />
        <p>Small</p>
      </VBox>
      <VBox>
        <IconButton icon="add" />
        <p>Medium</p>
      </VBox>
      <VBox>
        <IconButton icon="add" size="large" />
        <p>Large</p>
      </VBox>
    </HBox>
  );
}
