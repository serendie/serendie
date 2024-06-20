import { Button, NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";
import { css } from "../../../../../ui/styled-system/css/css";

export function SizeSample() {
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
        <p>Medium</p>
      </VBox>

      <VBox>
        <div
          className={css({
            position: "relative",
            height: "16px",
            width: "16px",
          })}
        >
          <NotificationBadge size="small" count={1} />
        </div>
        <p>Small</p>
      </VBox>
    </HBox>
  );
}
