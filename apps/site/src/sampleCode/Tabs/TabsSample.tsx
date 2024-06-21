import { TabItem } from "@serendie/ui";
import { Tabs } from "@serendie/ui";

export function TabsSample() {
  return (
    <Tabs defaultValue="2">
      <TabItem title="連絡先" value="1" />
      <TabItem title="トーク" value="2" />
      <TabItem title="売上履歴" value="3" dot />
      <TabItem title="入出金" value="4" badge={3} disabled />
    </Tabs>
  );
}
