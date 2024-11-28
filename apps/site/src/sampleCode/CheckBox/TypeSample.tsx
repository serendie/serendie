import { CheckBox } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Single Line</Dt>
      <Dd>
        <CheckBox label={"タイトル"} />
      </Dd>

      <Dt>Multiple Line</Dt>
      <Dd>
        <CheckBox
          label={"タイトル"}
          helperText="補足テキスト補足テキスト補足テキスト"
        />
      </Dd>
    </Dl>
  );
}
