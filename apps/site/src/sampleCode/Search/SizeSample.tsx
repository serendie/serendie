import { Search } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function SizeSample() {
  return (
    <Dl>
      <Dt>Small</Dt>
      <Dd>
        <Search
          items={["React", "Vue", "Angular", "Svelte", "Ember"]}
          size="small"
        />
      </Dd>

      <Dt>Medium</Dt>
      <Dd>
        <Search
          items={["React", "Vue", "Angular", "Svelte", "Ember"]}
          size="medium"
        />
      </Dd>
    </Dl>
  );
}
