import { Divider } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function ColorSample() {
  return (
    <Dl>
      <Dt>Light</Dt>
      <Dd>
        <Divider color="light" />
      </Dd>

      <Dt>Normal</Dt>
      <Dd>
        <Divider color="normal" />
      </Dd>

      <Dt>Dark</Dt>
      <Dd>
        <Divider color="dark" />
      </Dd>
    </Dl>
  );
}
