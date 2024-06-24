import { Search } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <Search items={["React", "Vue", "Angular", "Svelte", "Ember"]} />
      </Dd>

      <Dt>Filled</Dt>
      <Dd>
        <Search
          items={["React", "Vue", "Angular", "Svelte", "Ember"]}
          value={["React"]}
        />
      </Dd>

      <Dt>Disabled</Dt>
      <Dd>
        <Search
          items={["React", "Vue", "Angular", "Svelte", "Ember"]}
          disabled
        />
      </Dd>
    </Dl>
  );
}
