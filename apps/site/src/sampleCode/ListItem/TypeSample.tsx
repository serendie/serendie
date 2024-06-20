import { StateMatrix } from "@/components/StateMatrix";
import { ListItem } from "@serendie/ui";
import type { ComponentProps } from "react";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Title</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="info" />
      </Dd>

      <Dt>Desctiption</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          leftIcon="info"
        />
      </Dd>

      <Dt>Large Left Icon</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="info" isLargeLeftIcon />
      </Dd>

      <Dt>Large Left Icon with Description</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          leftIcon="info"
          isLargeLeftIcon
        />
      </Dd>

      <Dt>Right Icon</Dt>
      <Dd>
        <ListItem title="リストタイトル" rightIcon="chevron_right" />
      </Dd>

      <Dt>Right Icon with Description</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          rightIcon="chevron_right"
        />
      </Dd>

      <Dt>Badge</Dt>
      <Dd>
        <ListItem
          title="リストタイトル"
          description="補足テキスト"
          leftIcon="face"
          isLargeLeftIcon
          badge={3}
        />
      </Dd>
    </Dl>
  );
}
