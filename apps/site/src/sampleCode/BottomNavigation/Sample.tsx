import { BottomNavigation, BottomNavigationItem, SvgIcon } from "@serendie/ui";

export function Sample() {
  return (
    <BottomNavigation>
      <BottomNavigationItem icon={<SvgIcon icon="texture" />} label="検索" />
      <BottomNavigationItem
        icon={<SvgIcon icon="texture" />}
        label="ホーム"
        isActive
      />
      <BottomNavigationItem
        icon={<SvgIcon icon="texture" />}
        label="トーク"
        dot
      />
      <BottomNavigationItem
        icon={<SvgIcon icon="texture" />}
        label="カレンダー"
        count={3}
      />
      <BottomNavigationItem
        icon={<SvgIcon icon="texture" />}
        label="アカウント"
        count={100}
      />
    </BottomNavigation>
  );
}
