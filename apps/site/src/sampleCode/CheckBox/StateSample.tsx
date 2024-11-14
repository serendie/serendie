import { CheckBox } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <CheckBox label={"タイトルタイトル"} />
      </Dd>

      <Dt>Selected</Dt>
      <Dd>
        <CheckBox label={"タイトルタイトル"} checked />
      </Dd>

      <Dt>Disabled - Enabled</Dt>
      <Dd>
        <CheckBox label={"タイトルタイトル"} disabled />
      </Dd>

      <Dt>Disabled - Selected</Dt>
      <Dd>
        <CheckBox label={"タイトルタイトル"} disabled checked />
      </Dd>
    </Dl>
  );
}
