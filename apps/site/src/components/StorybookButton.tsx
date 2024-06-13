import { Button, SvgIcon } from "@serendie/ui";

interface StorybookButtonProps {
  href?: string;
}

export const StorybookButton: React.FC<StorybookButtonProps> = ({
  href = "#",
}) => {
  return (
    <Button
      // TODO: ButtonLinkとかにして、<a>でリンクするようにしたい
      onClick={() => window.open(href, "_blank")}
      size={"small"}
      // TODO: styleType=rectangle の実装待ち
      styleType={"rounded"}
      rightIcon={<SvgIcon icon={"arrow_blank"} />}>
      Storybook
    </Button>
  );
};
