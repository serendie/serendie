import { List, ListItem } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" leftIcon="texture" />
        </List>
      </Dd>
      <Dt>Focused</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" leftIcon="texture" focusVisible />
        </List>
      </Dd>
      <Dt>Disabled</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" leftIcon="texture" disabled />
        </List>
      </Dd>
      <Dt>Selected</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" leftIcon="texture" selected />
        </List>
      </Dd>
    </Dl>
  );
}
