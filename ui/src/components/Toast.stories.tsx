import type { Meta } from "@storybook/react";

import { Toast, toaster } from "./Toast";
import { Button } from "./Button";

const Template = () => (
  <div>
    <Button
      size="medium"
      onClick={() =>
        toaster.create({
          title: "トーストトーストトースト",
          duration: 1000
        })
      }
    >
      Show Toast
    </Button>
    <Toast />
  </div>
);

export const Default = Template;

const meta: Meta<typeof Toast> = {
  component: Toast,
  decorators: [(Story) => <Story />],
};

export default meta;

