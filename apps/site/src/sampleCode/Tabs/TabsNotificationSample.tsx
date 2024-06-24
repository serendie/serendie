import { Dd, Dl, Dt } from "@/components/LayoutUtils";
import { TabItem, Tabs } from "@serendie/ui";

export function TabsNotificationSample() {
  return (
    <Dl>
      <Dt>Default</Dt>
      <Dd>
        <Tabs defaultValue="1">
          <TabItem title="連絡先" value="1" />
          <TabItem title="トーク" value="2" />
          <TabItem title="売上履歴" value="3" />
          <TabItem title="入出金" value="4" />
        </Tabs>
      </Dd>

      <Dt>With Badge</Dt>
      <Dd>
        <Tabs defaultValue="1">
          <TabItem title="連絡先" value="1" dot />
          <TabItem title="トーク" value="2" />
          <TabItem title="売上履歴" value="3" />
          <TabItem title="入出金" value="4" />
        </Tabs>
      </Dd>

      <Dt>With Badge (Number)</Dt>
      <Dd>
        <Tabs defaultValue="1">
          <TabItem title="連絡先" value="1" badge={3} />
          <TabItem title="トーク" value="2" />
          <TabItem title="売上履歴" value="3" />
          <TabItem title="入出金" value="4" />
        </Tabs>
      </Dd>
    </Dl>
  );
}
