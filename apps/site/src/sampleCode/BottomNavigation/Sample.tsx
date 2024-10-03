import { BottomNavigation, BottomNavigationItem } from "@serendie/ui";

export function Sample() {
  return (
    <BottomNavigation>
      <BottomNavigationItem icon="texture" label="検索" />
      <BottomNavigationItem icon="texture" label="ホーム" isActive />
      <BottomNavigationItem icon="texture" label="トーク" dot />
      <BottomNavigationItem icon="texture" label="カレンダー" count={3} />
      <BottomNavigationItem icon="texture" label="アカウント" count={100} />
    </BottomNavigation>
  );
}
