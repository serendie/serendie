import { Badge, BadgeCloseButton } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function CloseButtonSample() {
  return (
    <HBox>
      <VBox>
        <Badge size="small" closeButton={<BadgeCloseButton />}>
          Label
        </Badge>
        <p>Small</p>
      </VBox>
      <VBox>
        <Badge closeButton={<BadgeCloseButton />}>Label</Badge>
        <p>Medium</p>
      </VBox>
      <VBox>
        <Badge size="large" closeButton={<BadgeCloseButton />}>
          Label
        </Badge>
        <p>Large</p>
      </VBox>
    </HBox>
  );
}
