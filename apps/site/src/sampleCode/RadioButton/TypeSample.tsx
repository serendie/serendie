import { RadioButton, RadioGroup } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <RadioGroup>
      <Dl>
        <Dt>Single Line</Dt>
        <Dd>
          <RadioButton label={"タイトルタイトル"} value="1" />
        </Dd>

        <Dt>Multiple Line</Dt>
        <Dd>
          <RadioButton
            value="2"
            label={"タイトルタイトル"}
            helperText="補足テキスト補足テキスト補足テキスト"
          />
        </Dd>
      </Dl>
    </RadioGroup>
  );
}
