import { ListItem } from "@serendie/ui";
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
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          leftIcon="texture"
        >
          <p>タイムスタンプなど</p>
        </ListItem>
      </Dd>

      <Dt>Large Heading Icon</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="texture" isLargeLeftIcon />
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          leftIcon="texture"
          isLargeLeftIcon
        >
          <p>タイムスタンプなど</p>
        </ListItem>
      </Dd>

      <Dt>Trailing Icon</Dt>
      <Dd>
        <ListItem title="リストタイトル" rightIcon="chevron_right" />
      </Dd>

      <Dt>Multiple Lines</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          rightIcon="chevron_right"
        />
      </Dd>

      <Dt>With Badge</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          leftIcon="texture"
          isLargeLeftIcon
          badge={3}
        />
      </Dd>
    </Dl>
  );
}
