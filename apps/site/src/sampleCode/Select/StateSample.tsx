import { Select } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <Select
          label="ラベル"
          placeholder="選択してください"
          required
          items={[
            { label: "React", value: "React" },
            { label: "Vue", value: "Vue" },
            { label: "Angular", value: "Angular" },
            { label: "Svelte", value: "Svelte" },
            { label: "Ember", value: "Ember" },
          ]}
        />
      </Dd>

      <Dt>Error</Dt>
      <Dd>
        <Select
          label="ラベル"
          placeholder="選択してください"
          required
          invalid
          invalidMessage="エラーメッセージ"
          items={[
            { label: "React", value: "React" },
            { label: "Vue", value: "Vue" },
            { label: "Angular", value: "Angular" },
            { label: "Svelte", value: "Svelte" },
            { label: "Ember", value: "Ember" },
          ]}
        />
      </Dd>

      <Dt>Disabled</Dt>
      <Dd>
        <Select
          label="ラベル"
          placeholder="選択してください"
          required
          disabled
          items={[
            { label: "React", value: "React" },
            { label: "Vue", value: "Vue" },
            { label: "Angular", value: "Angular" },
            { label: "Svelte", value: "Svelte" },
            { label: "Ember", value: "Ember" },
          ]}
        />
      </Dd>
    </Dl>
  );
}
