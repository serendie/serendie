import { Select } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <Dl>
      <Dt>Small</Dt>
      <Dd>
        <Select
          size="small"
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

      <Dt>Medium</Dt>
      <Dd>
        <Select
          size="medium"
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
    </Dl>
  );
}
