import { HBox, VBox } from "@/components/LayoutUtils";
import { BottomNavigationItem } from "@serendie/ui";

export function ItemSample() {
  return (
    <HBox>
      <VBox w="25%">
        <BottomNavigationItem label="ホーム" icon="search" />
        <p>Default</p>
      </VBox>
      <VBox w="25%">
        <BottomNavigationItem label="ホーム" icon="search" isActive />
        <p>Active</p>
      </VBox>
      <VBox w="25%">
        <BottomNavigationItem label="ホーム" icon="search" dot />
        <p>With Badge (dot)</p>
      </VBox>
      <VBox w="25%">
        <BottomNavigationItem label="ホーム" icon="search" count={3} />
        <p>With Badge (number)</p>
      </VBox>
    </HBox>
  );
}
