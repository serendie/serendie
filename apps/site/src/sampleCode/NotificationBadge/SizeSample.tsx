import { NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <HBox>
      <VBox>
        <VBox position="relative" h="24px" w="24px">
          <NotificationBadge count={1} />
        </VBox>
        <p>Medium</p>
      </VBox>

      <VBox>
        <VBox position="relative" h="16px" w="16px">
          <NotificationBadge size="small" count={1} />
        </VBox>
        <p>Small</p>
      </VBox>
    </HBox>
  );
}
