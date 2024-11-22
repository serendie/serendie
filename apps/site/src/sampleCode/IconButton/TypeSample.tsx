import { IconButton, SvgIcon } from "@serendie/ui";
import { HBox, VBox } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <HBox>
      <VBox>
        <IconButton icon={<SvgIcon icon={"add"} />} />
        <p>Filled</p>
      </VBox>
      <VBox>
        <IconButton icon={<SvgIcon icon={"add"} />} styleType="outlined" />
        <p>Outlined</p>
      </VBox>
      <VBox>
        <IconButton icon={<SvgIcon icon={"add"} />} styleType="ghost" />
        <p>Ghost</p>
      </VBox>
    </HBox>
  );
}
