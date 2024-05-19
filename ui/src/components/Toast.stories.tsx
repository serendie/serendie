import type { Meta, StoryObj } from "@storybook/react";

import { Toast, toaster } from "./Toast";
import { Button } from "./Button";

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
            title: "トーストトーストトースト",
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
      <Button
        size="medium"
        onClick={() =>
          toaster.create({
            title: "トーストトーストトースト",
            duration: 3000,
            type: "success",
          })
        }
      >
        Show Toast
      </Button>
      <Toast />
    </div>
  ),
};
