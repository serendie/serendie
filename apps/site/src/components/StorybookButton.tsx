import { Button, SvgIcon } from "@serendie/ui";

interface StorybookButtonProps {
  storyPath: string;
}

const URL = "https://storybook.serendie.design/";

export const StorybookButton: React.FC<StorybookButtonProps> = ({
  storyPath,
}) => {
  const href = `${URL}?path=${storyPath}`;
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
