import { ListItem } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="texture" />
      </Dd>
      <Dt>Disabled</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="texture" disabled />
      </Dd>
    </Dl>
  );
}
