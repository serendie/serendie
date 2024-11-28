import { DropdownMenu, SvgIcon } from "@serendie/ui";
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
              icon: <SvgIcon icon="texture" />,
            },
            {
              label: "Vue",
              value: "Vue",
              icon: <SvgIcon icon="texture" />,
            },
            {
              label: "Angular",
              value: "Angular",
              icon: <SvgIcon icon="texture" />,
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
              icon: <SvgIcon icon="texture" />,
            },
            {
              label: "Vue",
              value: "Vue",
              icon: <SvgIcon icon="texture" />,
            },
            {
              label: "Angular",
              value: "Angular",
              icon: <SvgIcon icon="texture" />,
            },
          ]}
          isIconMenu
          title="メニュータイトル"
        />
      </Dd>
    </Dl>
  );
}
