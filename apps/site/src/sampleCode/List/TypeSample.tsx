import { List, ListItem } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl variant="dim">
      <Dt>Title Only</Dt>
      <Dd>
        <ListItem title="リストタイトル" />
      </Dd>

      <Dt>Heading Icon</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="texture" />
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            leftIcon="texture"
          >
            <p>タイムスタンプなど</p>
          </ListItem>
        </List>
      </Dd>

      <Dt>Large Heading Icon</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" leftIcon="texture" isLargeLeftIcon />
        </List>
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            leftIcon="texture"
            isLargeLeftIcon
          >
            <p>タイムスタンプなど</p>
          </ListItem>
        </List>
      </Dd>

      <Dt>Trailing Icon</Dt>
      <Dd>
        <List>
          <ListItem title="リストタイトル" rightIcon="chevron_right" />
        </List>
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            rightIcon="chevron_right"
          />
        </List>
      </Dd>

      <Dt>With Badge</Dt>
      <Dd>
        <List>
          <ListItem
            title="リストタイトル"
            description="補足テキスト"
            leftIcon="texture"
            isLargeLeftIcon
            badge={3}
          />
        </List>
      </Dd>
    </Dl>
  );
}
