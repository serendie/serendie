import { TextArea } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <TextArea
          description="入力方法などに関するヘルプテキスト"
          invalidMessage="入力の誤りに関するテキスト"
          label="ラベル"
          placeholder="プレースホルダー"
          required
        />
      </Dd>
      <Dt>Filled</Dt>
      <Dd>
        <TextArea
          description="入力方法などに関するヘルプテキスト"
          invalidMessage="入力の誤りに関するテキスト"
          label="ラベル"
          placeholder="プレースホルダー"
          required
          value="入力中"
        />
      </Dd>
      <Dt>Error</Dt>
      <Dd>
        <TextArea
          description="入力方法などに関するヘルプテキスト"
          invalidMessage="入力の誤りに関するテキスト"
          label="ラベル"
          placeholder="プレースホルダー"
          required
          invalid
          value="入力中"
        />
      </Dd>
      <Dt>Disabled</Dt>
      <Dd>
        <TextArea
          description="入力方法などに関するヘルプテキスト"
          invalidMessage="入力の誤りに関するテキスト"
          label="ラベル"
          placeholder="プレースホルダー"
          disabled
        />
      </Dd>
    </Dl>
  );
}
