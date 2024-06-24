import { NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function NoNumberSample() {
  return (
    <HBox>
      <VBox>
        <VBox position="relative" h="24px" w="24px">
          <NotificationBadge count={1} />
        </VBox>
        <p>False</p>
      </VBox>

      <VBox>
        <VBox position="relative" h="8px" w="8px">
          <NotificationBadge noNumber />
        </VBox>
        <p>True</p>
      </VBox>
    </HBox>
  );
}
