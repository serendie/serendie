import { List, ListItem, SvgIcon } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl variant="dim">
      <Dt>Title Only</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" />
        </List>
      </Dd>

      <Dt>Left Icon</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            leftIcon={<SvgIcon icon={"texture"} />}
          />
        </List>
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            leftIcon={<SvgIcon icon={"texture"} />}
          >
            <p>タイムスタンプなど</p>
          </ListItem>
        </List>
      </Dd>

      <Dt>Large Left Icon</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            leftIcon={<SvgIcon icon={"texture"} />}
            isLargeLeftIcon
          />
        </List>
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            leftIcon={<SvgIcon icon={"texture"} />}
            isLargeLeftIcon
          >
            <p>タイムスタンプなど</p>
          </ListItem>
        </List>
      </Dd>

      <Dt>Right Icon</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            rightIcon={<SvgIcon icon={"chevron_right"} />}
          />
        </List>
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            rightIcon={<SvgIcon icon={"chevron_right"} />}
          />
        </List>
      </Dd>

      <Dt>With Badge</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            leftIcon={<SvgIcon icon={"texture"} />}
            isLargeLeftIcon
            badge={3}
          />
        </List>
      </Dd>
    </Dl>
  );
}
