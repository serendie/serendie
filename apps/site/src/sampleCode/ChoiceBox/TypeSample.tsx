import { ChoiceBox, RadioGroup } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Checkbox</Dt>
      <Dd>
        <ChoiceBox type="checkbox" value="itemA" />
      </Dd>
      <Dt>Radio</Dt>
      <Dd>
        <RadioGroup>
          <ChoiceBox type="radio" value="itemA" />
        </RadioGroup>
      </Dd>
    </Dl>
  );
}
