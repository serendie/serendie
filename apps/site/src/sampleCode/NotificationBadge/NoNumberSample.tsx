import { NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function NoNumberSample() {
  return (
    <HBox>
      <VBox>
        <VBox position="relative" h="24px" w="24px">
          <NotificationBadge count={99} />
        </VBox>
        <p>99以下</p>
      </VBox>

      <VBox>
        <VBox position="relative" h="24px" w="24px">
          <NotificationBadge count={100} />
        </VBox>
        <p>100以上</p>
      </VBox>

      <VBox>
        <VBox position="relative" h="8px" w="8px">
          <NotificationBadge noNumber />
        </VBox>
        <p>数字なし</p>
      </VBox>
    </HBox>
  );
}
