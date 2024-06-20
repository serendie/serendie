import { Badge, IconButton, Select } from "@serendie/ui";
import { Dd, Dl, Dt, HBox, VBox } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <HBox>
      <VBox>
        <Badge size="small">Label</Badge>
        <p>Small</p>
      </VBox>
      <VBox>
        <Badge>Label</Badge>
        <p>Medium</p>
      </VBox>
      <VBox>
        <Badge size="large">Label</Badge>
        <p>Large</p>
      </VBox>
    </HBox>
  );
}
