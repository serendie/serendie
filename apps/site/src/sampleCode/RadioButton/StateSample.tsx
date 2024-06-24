import { RadioButton, RadioGroup } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <RadioGroup>
          <RadioButton label={"タイトルタイトル"} value="1" />
        </RadioGroup>
      </Dd>

      <Dt>Selected</Dt>
      <Dd>
        <RadioGroup defaultValue={"2"}>
          <RadioButton label={"タイトルタイトル"} value="2" />
        </RadioGroup>
      </Dd>

      <Dt>Disabled - Enabled</Dt>
      <Dd>
        <RadioGroup>
          <RadioButton label={"タイトルタイトル"} value="3" disabled />
        </RadioGroup>
      </Dd>

      <Dt>Disabled - Selected</Dt>
      <Dd>
        <RadioGroup defaultValue={"4"}>
          <RadioButton label={"タイトルタイトル"} value="4" disabled />
        </RadioGroup>
      </Dd>
    </Dl>
  );
}
