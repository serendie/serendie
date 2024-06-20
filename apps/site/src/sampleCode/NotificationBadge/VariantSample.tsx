import { Button, NotificationBadge } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";
import { css } from "../../../../../ui/styled-system/css/css";

export function VariantSample() {
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
          <NotificationBadge count={1} variant={"primary"} />
        </div>
        <p>Primary</p>
      </VBox>

      <VBox>
        <div
          className={css({
            position: "relative",
            height: "24px",
            width: "24px",
          })}
        >
          <NotificationBadge count={1} variant={"secondary"} />
        </div>
        <p>Secondary</p>
      </VBox>
    </HBox>
  );
}
