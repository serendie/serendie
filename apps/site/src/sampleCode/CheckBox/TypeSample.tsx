import { Checkbox } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Single Line</Dt>
      <Dd>
        <Checkbox label={"タイトルタイトル"} />
      </Dd>

      <Dt>Multiple Line</Dt>
      <Dd>
        <Checkbox
          label={"タイトルタイトル"}
          helperText="補足テキスト補足テキスト補足テキスト"
        />
      </Dd>
    </Dl>
  );
}
