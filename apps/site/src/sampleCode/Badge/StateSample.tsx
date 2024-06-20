import { Badge, IconButton, Select } from "@serendie/ui";
import { Dd, Dl, Dt, HBox, VBox } from "src/components/LayoutUtils";
import { css } from "../../../../../ui/styled-system/css/css";

export function StateSample() {
  return (
    <HBox>
      <Dl
        className={css({
          width: "100%",
          gridTemplateColumns: "80px 1fr 80px 1fr",
        })}
      >
        <Dt>Gray</Dt>
        <Dd>
          <Badge>Label</Badge>
        </Dd>

        <Dt>Gray-subtle</Dt>
        <Dd>
          <Badge color="gray-subtle">Label</Badge>
        </Dd>

        <Dt>Blue</Dt>
        <Dd>
          <Badge color="blue">Label</Badge>
        </Dd>

        <Dt>Blue-subtle</Dt>
        <Dd>
          <Badge color="blue-subtle">Label</Badge>
        </Dd>

        <Dt>Green</Dt>
        <Dd>
          <Badge color="green">Label</Badge>
        </Dd>

        <Dt>Green-subtle</Dt>
        <Dd>
          <Badge color="green-subtle">Label</Badge>
        </Dd>

        <Dt>Yellow</Dt>
        <Dd>
          <Badge color="yellow">Label</Badge>
        </Dd>

        <Dt>Yellow-subtle</Dt>
        <Dd>
          <Badge color="yellow-subtle">Label</Badge>
        </Dd>

        <Dt>Orange</Dt>
        <Dd>
          <Badge color="orange">Label</Badge>
        </Dd>

        <Dt>Orange-subtle</Dt>
        <Dd>
          <Badge color="orange-subtle">Label</Badge>
        </Dd>

        <Dt>Red</Dt>
        <Dd>
          <Badge color="red">Label</Badge>
        </Dd>

        <Dt>Red-subtle</Dt>
        <Dd>
          <Badge color="red-subtle">Label</Badge>
        </Dd>
      </Dl>
    </HBox>
  );
}
