import { Dd, Dl, Dt } from "@/components/LayoutUtils";
import { BottomNavigation, BottomNavigationItem } from "@serendie/ui";

export function ItemSample() {
  return (
    <Dl>
      <Dt>Default</Dt>
      <Dd>
        <BottomNavigationItem label="ホーム" icon="search" />
      </Dd>

      <Dt>Active</Dt>
      <Dd>
        <BottomNavigationItem label="ホーム" icon="search" isActive />
      </Dd>

      <Dt>With Notification Badge(non-number)</Dt>
      <Dd>
        <BottomNavigationItem label="ホーム" icon="search" dot />
      </Dd>

      <Dt>With Notification Badge(number)</Dt>
      <Dd>
        <BottomNavigationItem label="ホーム" icon="search" count={3} />
      </Dd>
    </Dl>
  );
}
