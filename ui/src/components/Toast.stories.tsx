import type { Meta, StoryObj } from "@storybook/react";
import { Toast, toaster } from "./Toast";
import { Button } from "./Button";
import { Stack } from "../../styled-system/jsx";
import figma from "@figma/code-connect";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof Toast> = {
  component: Toast,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3256-16094",
      props: {
        title: figma.string("Title"),
        type: figma.enum("Type", {
          Default: "default",
          Success: "success",
          Error: "error",
        }),
      },
      examples: [FigmaExample],
      import: "import { Toast, toaster } from 'path/to/Toast';",
    },
  },
  decorators: [(Story) => <Story />],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FigmaExample(props: any) {
  return (
    <>
      <Button
        onClick={() =>
          toaster.create({
            duration: 3000,
            type: props.type,
            title: props.title,
          })
        }
      >
        Show Toast
      </Button>
      <Toast toaster={toaster} />
    </>
  );
}

type Story = StoryObj<typeof Toast>;
export default meta;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <Button
          size="medium"
          onClick={() =>
            toaster.create({
              title: "通知メッセージ",
              duration: 3000,
            })
          }
        >
          Show Toast
        </Button>
        <Toast toaster={toaster} />
      </div>
    );
  },
};

export const Success: Story = {
  render: () => {
    return (
      <div>
        <Stack direction="row">
          <Button
            size="medium"
            onClick={() =>
              toaster.create({
                title: "成功メッセージ",
                duration: 3000,
                type: "success",
              })
            }
          >
            Show Toast
          </Button>
        </Stack>

        <Toast toaster={toaster} />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    return (
      <div>
        <Button
          size="medium"
          onClick={() =>
            toaster.create({
              title: "エラーメッセージ",
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
  },
};

export const PlayClickedSelect: Story = {
  render: () => {
    return (
      <div>
        <Button
          size="medium"
          onClick={() =>
            toaster.create({
              title: "通知メッセージ",
              duration: 3000,
            })
          }
        >
          Show Toast
        </Button>
        <Toast toaster={toaster} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("button");

    await userEvent.click(select);
  },
};
