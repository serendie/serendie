import { Avatar } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <HBox>
      <VBox>
        <Avatar size="small" text="SD" />
        <p>Small</p>
      </VBox>
      <VBox>
        <Avatar size="medium" text="SD" />
        <p>Medium</p>
      </VBox>
      <VBox>
        <Avatar size="large" text="SD" />
        <p>Large</p>
      </VBox>
    </HBox>
  );
}
