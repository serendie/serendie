import { StateMatrix } from "@/components/StateMatrix";
import { ListItem } from "@serendie/ui";
import type { ComponentProps } from "react";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="info" />
      </Dd>

      <Dt>Disabled</Dt>
      <Dd>
        <ListItem title="リストタイトル" leftIcon="info" disabled />
      </Dd>
    </Dl>
  );
}
