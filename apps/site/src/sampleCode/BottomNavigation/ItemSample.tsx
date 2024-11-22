import { HBox, VBox } from "@/components/LayoutUtils";
import { BottomNavigationItem, SvgIcon } from "@serendie/ui";

export function ItemSample() {
  return (
    <HBox>
      <VBox w="25%">
        <BottomNavigationItem
          label="ホーム"
          icon={<SvgIcon icon={"texture"} />}
        />
        <p>Default (Enable)</p>
      </VBox>
      <VBox w="25%">
        <BottomNavigationItem
          label="ホーム"
          icon={<SvgIcon icon={"texture"} />}
          isActive
        />
        <p>Active</p>
      </VBox>
      <VBox w="25%">
        <BottomNavigationItem
          label="ホーム"
          icon={<SvgIcon icon={"texture"} />}
          dot
        />
        <p>With Badge (dot)</p>
      </VBox>
      <VBox w="25%">
        <BottomNavigationItem
          label="ホーム"
          icon={<SvgIcon icon={"texture"} />}
          count={3}
        />
        <p>With Badge (number)</p>
      </VBox>
    </HBox>
  );
}
