import { IconButton } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function ShapeSample() {
  return (
    <HBox>
      <VBox>
        <IconButton shape="circle" icon="add" />
        <p>Circle</p>
      </VBox>
      <VBox>
        <IconButton shape="rectangle" styleType="outlined" icon="add" />
        <p>Rectangle</p>
      </VBox>
    </HBox>
  );
}
