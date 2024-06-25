import { Badge } from "@serendie/ui";
import { Dd, Dl, Dt, HBox } from "src/components/LayoutUtils";

export function ColorSample() {
  return (
    <HBox>
      <Dl w="100%" gridTemplateColumns="80px 1fr 80px 1fr">
        <Dt>Gray</Dt>
        <Dd>
          <Badge>Label</Badge>
        </Dd>

        <Dt>Gray-subtle</Dt>
        <Dd>
          <Badge styleColor="gray-subtle">Label</Badge>
        </Dd>

        <Dt>Blue</Dt>
        <Dd>
          <Badge styleColor="blue">Label</Badge>
        </Dd>

        <Dt>Blue-subtle</Dt>
        <Dd>
          <Badge styleColor="blue-subtle">Label</Badge>
        </Dd>

        <Dt>Green</Dt>
        <Dd>
          <Badge styleColor="green">Label</Badge>
        </Dd>

        <Dt>Green-subtle</Dt>
        <Dd>
          <Badge styleColor="green-subtle">Label</Badge>
        </Dd>

        <Dt>Yellow</Dt>
        <Dd>
          <Badge styleColor="yellow">Label</Badge>
        </Dd>

        <Dt>Yellow-subtle</Dt>
        <Dd>
          <Badge styleColor="yellow-subtle">Label</Badge>
        </Dd>

        <Dt>Orange</Dt>
        <Dd>
          <Badge styleColor="orange">Label</Badge>
        </Dd>

        <Dt>Orange-subtle</Dt>
        <Dd>
          <Badge styleColor="orange-subtle">Label</Badge>
        </Dd>

        <Dt>Red</Dt>
        <Dd>
          <Badge styleColor="red">Label</Badge>
        </Dd>

        <Dt>Red-subtle</Dt>
        <Dd>
          <Badge styleColor="red-subtle">Label</Badge>
        </Dd>
      </Dl>
    </HBox>
  );
}
