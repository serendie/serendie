import { BottomNavigation, BottomNavigationItem } from "@serendie/ui";

export function Sample() {
  return (
    <BottomNavigation>
      <BottomNavigationItem icon="search" label="検索" />
      <BottomNavigationItem label="ホーム" icon="search" isActive />
      <BottomNavigationItem icon="search" label="トーク" dot />
      <BottomNavigationItem icon="search" label="カレンダー" count={3} />
      <BottomNavigationItem icon="search" label="アカウント" count={100} />
    </BottomNavigation>
  );
}
