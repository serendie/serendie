import { NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function VariantSample() {
  return (
    <HBox>
      <VBox>
        <VBox position="relative" h="24px" w="24px">
          <NotificationBadge count={1} variant={"primary"} />
        </VBox>
        <p>Primary</p>
      </VBox>

      <VBox>
        <VBox position="relative" h="24px" w="24px">
          <NotificationBadge count={1} variant={"secondary"} />
        </VBox>
        <p>Secondary</p>
      </VBox>
    </HBox>
  );
}
