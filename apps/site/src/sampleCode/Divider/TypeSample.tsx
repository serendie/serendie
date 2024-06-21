import { Divider, RadioButton, RadioGroup } from "@serendie/ui";
import { Dd, Dl, Dt, HBox, VBox } from "src/components/LayoutUtils";
import { css } from "../../../../../ui/styled-system/css/css";

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
