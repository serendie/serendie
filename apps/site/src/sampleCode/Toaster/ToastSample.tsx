import { Button, Toast, createToaster } from "@serendie/ui";

export function ToastSample() {
  const toaster = createToaster({ placement: "bottom" });
  return (
    <div>
      <Button
        size="medium"
        onClick={() =>
          toaster.create({
            title: "テキストテキストテキスト",
            duration: 3000,
            type: "error",
          })
        }
      >
        Show Toast
      </Button>
      <Toast toaster={toaster} />
    </div>
  );
}
