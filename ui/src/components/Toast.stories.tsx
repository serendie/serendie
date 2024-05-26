import type { Meta, StoryObj } from "@storybook/react";

import { Toast, toaster } from "./Toast";
import { Button } from "./Button";
import { Stack } from "../../styled-system/jsx";

const meta: Meta<typeof Toast> = {
  component: Toast,
  decorators: [(Story) => <Story />],
};
type Story = StoryObj<typeof Toast>;

export default meta;

export const Default: Story = {
  render: () => (
    <div>
      <Button
        size="medium"
        onClick={() =>
          toaster.create({
            title: "テキストテキストテキスト",
            duration: 3000,
          })
        }
      >
        Show Toast
      </Button>
      <Toast />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div>
      <Stack direction="row">
        <Button
          size="medium"
          onClick={() =>
            toaster.create({
              title: "テキストテキストテキスト",
              duration: 3000,
              type: "success",
            })
          }
        >
          Success Toast
        </Button>
        <Button
          size="medium"
          onClick={() =>
            toaster.create({
              title: "テキストテキストテキスト",
              duration: 3000,
              type: "custom",
            })
          }
        >
          Check Toast
        </Button>
      </Stack>

      <Toast />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
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
      <Toast />
    </div>
  ),
};
