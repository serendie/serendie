import { IconButton } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <HBox>
      <VBox>
        <IconButton icon="add" />
        <p>Filled</p>
      </VBox>
      <VBox>
        <IconButton icon="add" styleType="outlined" />
        <p>Outlined</p>
      </VBox>
      <VBox>
        <IconButton icon="add" styleType="ghost" />
        <p>Ghost</p>
      </VBox>
    </HBox>
  );
}
