import { Divider } from "@serendie/ui";
import { css } from "styled-system/css";
import { HBox, VBox } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "200px",
        alignItems: "center",
      })}
    >
      <HBox
        className={css({
          alignItems: "center",
        })}
      >
        Horizontal
        <Divider />
      </HBox>

      <VBox
        className={css({
          height: "100%",
        })}
      >
        <Divider type="vertical" />
        Vertical
      </VBox>
    </div>
  );
}
