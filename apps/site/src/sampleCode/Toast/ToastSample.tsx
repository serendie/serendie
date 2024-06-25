import { Button, Toast, toaster } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function ToastSample() {
  return (
    <Dl>
      <Dt>Default</Dt>
      <Dd>
        <Button
          styleType="outlined"
          onClick={() =>
            toaster.create({
              title: "お知らせメッセージ",
              duration: 1500,
            })
          }
        >
          Show Toast
        </Button>
        <Toast toaster={toaster} />
      </Dd>
      <Dt>Success</Dt>
      <Dd>
        <Button
          styleType="outlined"
          onClick={() =>
            toaster.create({
              type: "success",
              title: "成功しました",
              duration: 1500,
            })
          }
        >
          Show Toast
        </Button>
        <Toast toaster={toaster} />
      </Dd>
      <Dt>Error</Dt>
      <Dd>
        <Button
          styleType="outlined"
          onClick={() =>
            toaster.create({
              type: "error",
              title: "エラーがあります",
              duration: 1500,
            })
          }
        >
          Show Toast
        </Button>
        <Toast toaster={toaster} />
      </Dd>
    </Dl>
  );
}
