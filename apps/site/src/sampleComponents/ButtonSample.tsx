import { Button } from "@serendie/ui";
import { Horizontal } from "src/components/Horizontal";

export function ButtonSample() {
  return (
    <Horizontal.Container>
      <Horizontal.Item>
        <Button size="small">Click me</Button>
        <p>Small</p>
      </Horizontal.Item>
      <Horizontal.Item>
        <Button size="medium">Click me</Button>
        <p>Medium</p>
      </Horizontal.Item>
    </Horizontal.Container>
  );
}
