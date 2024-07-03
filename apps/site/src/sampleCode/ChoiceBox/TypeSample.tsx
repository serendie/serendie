import { Choicebox, RadioGroup } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Checkbox</Dt>
      <Dd>
        <Choicebox type="checkbox" value="itemA" />
      </Dd>
      <Dt>Radio</Dt>
      <Dd>
        <RadioGroup>
          <Choicebox type="radio" value="itemA" />
        </RadioGroup>
      </Dd>
    </Dl>
  );
}
