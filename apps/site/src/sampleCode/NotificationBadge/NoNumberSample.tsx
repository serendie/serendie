import { Button, NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";
import { css } from "../../../../../ui/styled-system/css/css";

export function NoNumberSample() {
  return (
    <HBox>
      <VBox>
        <div
          className={css({
            position: "relative",
            height: "24px",
            width: "24px",
          })}
        >
          <NotificationBadge count={1} />
        </div>
        <p>false</p>
      </VBox>

      <VBox>
        <div
          className={css({
            position: "relative",
            height: "8px",
            width: "8px",
          })}
        >
          <NotificationBadge noNumber />
        </div>
        <p>true</p>
      </VBox>
    </HBox>
  );
}
