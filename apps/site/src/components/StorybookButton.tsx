import { Button, SvgIcon } from "@serendie/ui";

interface StorybookButtonProps {
  storyPath: string;
}

export const StorybookButton: React.FC<StorybookButtonProps> = ({
  storyPath,
}) => {
  const href = `/storybook?path=${storyPath}`;
  return (
    <Button
      // TODO: ButtonLinkとかにして、<a>でリンクするようにしたい
      onClick={() => window.open(href, "_blank")}
      size={"small"}
      styleType={"outlined"}
      rightIcon={<SvgIcon icon={"arrow_blank"} />}
    >
      Storybook
    </Button>
  );
};
