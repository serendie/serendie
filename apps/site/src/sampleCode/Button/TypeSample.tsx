import { Button } from "@serendie/ui";
import { HBox } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <HBox>
      <Button>Filled</Button>
      <Button styleType="outlined">Outlined</Button>
      <Button styleType="ghost">Ghost</Button>
      <Button styleType="rectangle">Rectangle</Button>
    </HBox>
  );
}
