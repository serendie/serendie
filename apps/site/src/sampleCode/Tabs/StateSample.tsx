import { Dd, Dl, Dt } from "@/components/LayoutUtils";
import { Tabs, TabItem } from "@serendie/ui";

export function StateSample() {
  return (
    <Dl
      style={{
        gridTemplateColumns: "80px auto auto",
      }}
    >
      <Dt></Dt>
      <Dt
        style={{
          textAlign: "center",
        }}
      >
        Default
      </Dt>
      <Dt
        style={{
          textAlign: "center",
        }}
      >
        Selected
      </Dt>

      <Dt>Default</Dt>
      <Dd>
        <Tabs>
          <TabItem title="連絡先" value="1" />
        </Tabs>
      </Dd>
      <Dd>
        <Tabs defaultValue="1">
          <TabItem title="連絡先" value="1" />
        </Tabs>
      </Dd>

      <Dt>Focused</Dt>
      <Dd>
        <Tabs>
          <TabItem title="連絡先" value="1" data-focus-visible={true} />
        </Tabs>
      </Dd>
      <Dd>
        <Tabs defaultValue="1">
          <TabItem title="連絡先" value="1" data-focus-visible={true} />
        </Tabs>
      </Dd>

      <Dt>Disabled</Dt>
      <Dd>
        <Tabs>
          <TabItem title="連絡先" value="1" disabled />
        </Tabs>
      </Dd>
      <Dd>
        <Tabs defaultValue="1">
          <TabItem title="連絡先" value="1" disabled />
        </Tabs>
      </Dd>
    </Dl>
  );
}
