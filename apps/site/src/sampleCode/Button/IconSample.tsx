import { Button } from "@serendie/ui";
import { SvgIcon } from "@serendie/ui";
import { HBox } from "src/components/LayoutUtils";

export function IconSample() {
  return (
    <HBox>
      <Button leftIcon={<SvgIcon icon="chevron_left" />}>LeftIcon</Button>
      <Button rightIcon={<SvgIcon icon="chevron_right" />} styleType="ghost">
        RightIcon
      </Button>
    </HBox>
  );
}
