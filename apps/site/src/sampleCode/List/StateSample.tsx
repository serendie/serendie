import { List, ListItem, SvgIcon } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            leftIcon={<SvgIcon icon={"texture"} />}
          />
        </List>
      </Dd>
      <Dt>Focused</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            leftIcon={<SvgIcon icon={"texture"} />}
            focusVisible
          />
        </List>
      </Dd>
      <Dt>Disabled</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            leftIcon={<SvgIcon icon={"texture"} />}
            disabled
          />
        </List>
      </Dd>
      <Dt>Selected</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            leftIcon={<SvgIcon icon={"texture"} />}
            selected
          />
        </List>
      </Dd>
    </Dl>
  );
}
