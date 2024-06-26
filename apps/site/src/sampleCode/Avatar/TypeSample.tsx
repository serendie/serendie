import { Avatar } from "@serendie/ui";
import { VBox, HBox } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <HBox>
      <VBox>
        <Avatar src="https://i.pravatar.cc/300" />
        <p>Image</p>
      </VBox>
      <VBox>
        <Avatar text="SD" />
        <p>Text</p>
      </VBox>
      <VBox>
        <Avatar />
        <p>Placeholder(filled)</p>
      </VBox>
      <VBox>
        <Avatar placeholder="outlined" />
        <p>Placeholder(outlined)</p>
      </VBox>
    </HBox>
  );
}
