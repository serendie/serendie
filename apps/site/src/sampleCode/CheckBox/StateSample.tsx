import { Checkbox } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <Checkbox label={"タイトルタイトル"} />
      </Dd>

      <Dt>Selected</Dt>
      <Dd>
        <Checkbox label={"タイトルタイトル"} checked />
      </Dd>

      <Dt>Disabled - Enabled</Dt>
      <Dd>
        <Checkbox label={"タイトルタイトル"} disabled />
      </Dd>

      <Dt>Disabled - Selected</Dt>
      <Dd>
        <Checkbox label={"タイトルタイトル"} disabled checked />
      </Dd>
    </Dl>
  );
}
