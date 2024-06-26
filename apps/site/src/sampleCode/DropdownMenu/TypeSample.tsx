import { DropdownMenu } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Default</Dt>
      <Dd>
        <DropdownMenu
          items={[
            {
              label: "React",
              value: "React",
              icon: "texture",
            },
            {
              label: "Vue",
              value: "Vue",
              icon: "texture",
            },
            {
              label: "Angular",
              value: "Angular",
              icon: "texture",
            },
          ]}
          title="メニュータイトル"
        />
      </Dd>

      <Dt>Icon</Dt>
      <Dd>
        <DropdownMenu
          items={[
            {
              label: "React",
              value: "React",
              icon: "texture",
            },
            {
              label: "Vue",
              value: "Vue",
              icon: "texture",
            },
            {
              label: "Angular",
              value: "Angular",
              icon: "texture",
            },
          ]}
          isIconMenu
          title="メニュータイトル"
        />
      </Dd>
    </Dl>
  );
}
