import { figma } from "@figma/code-connect";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, waitFor, expect, fn } from "storybook/test";
import { useState } from "react";
import { FullscreenLayout } from "../../../.storybook/FullscreenLayout";
import { allModes } from "../../../.storybook/modes";
import { Button } from "../Button";
import { Drawer } from "../Drawer";
import { ModalDialog } from "../ModalDialog";
import { Select } from "./Select";

const items = [
  { label: "React", value: "React" },
  { label: "Vue", value: "Vue" },
  { label: "Angular", value: "Angular" },
  { label: "Svelte", value: "Svelte" },
  { label: "Ember", value: "Ember" },
];

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3154-26212",
      props: {
        label: figma.string("Label"),
        placeholder: figma.string("Placeholder"),
        disabled: figma.enum("State", { Disabled: true }),
        invalid: figma.enum("State", { Error: true }),
        invalidMessage: figma.string("InvalidMessage"),
        size: figma.enum("Size", { Small: "small", Medium: "medium" }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  args: {
    onValueChange: (v) => console.log(v),
    label: "ラベル",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "",
    placeholder: "選択してください",
    items,
  },
};

function FigmaExample(props: React.ComponentProps<typeof Select>) {
  return (
    <Select
      {...props}
      items={[{ label: "SelectItem", value: "select-item" }]}
    />
  );
}

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    onValueChange: (v) => console.log(v),
    invalid: true,
    invalidMessage: "エラーメッセージ",
  },
};

export const PlayClickedSelect: Story = {
  parameters: {
    layout: "fullscreen",

    chromatic: {
      modes: {
        small: allModes["small"],
      },
    },
  },

  render: (args) => {
    return (
      <FullscreenLayout>
        <Select {...args} />
      </FullscreenLayout>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    if (!parentElement) return;
    const root = within(parentElement);

    const select = canvas.getByRole("combobox");

    await userEvent.click(select);

    await waitFor(
      async () => {
        const option = await root.findByText("React");
        expect(option).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },

  globals: {
    viewport: {
      value: "large",
      isRotated: false,
    },
  },
};

const SelectInModalDialogTemplate = (
  args: React.ComponentProps<typeof Select>
) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <ModalDialog
        isOpen={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        title="Select in Dialog"
        submitButtonLabel="OK"
        onButtonClick={() => setIsOpen(false)}
      >
        <Select {...args} />
      </ModalDialog>
    </>
  );
};

export const InModalDialog: Story = {
  parameters: {
    layout: "fullscreen",

    chromatic: {
      modes: {
        small: allModes["small"],
        large: allModes["large"],
      },
    },
  },

  render: (args) => {
    return (
      <FullscreenLayout>
        <SelectInModalDialogTemplate {...args} />
      </FullscreenLayout>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    expect(parentElement).not.toBeNull();
    if (!parentElement) {
      throw new Error("Expected the canvas to have a parent element");
    }
    const root = within(parentElement);

    await userEvent.click(canvas.getByRole("button"));

    const dialog = await root.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const combobox = await within(dialog).findByRole("combobox");
    await userEvent.click(combobox);

    const option = await root.findByText("React");
    await waitFor(() => {
      expect(option).toBeVisible();
      // SelectのオプションがDialogコンテンツ内にポータルされること
      expect(
        document
          .querySelector('[data-scope="dialog"][data-part="content"]')!
          .contains(option)
      ).toBe(true);
    });

    await userEvent.click(option);

    await waitFor(() => {
      expect(combobox).toHaveTextContent("React");
      expect(dialog).toBeInTheDocument();
    });
  },
};

const SelectInDrawerTemplate = (args: React.ComponentProps<typeof Select>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        type="right"
      >
        <Select {...args} />
      </Drawer>
    </>
  );
};

export const InDrawer: Story = {
  parameters: {
    layout: "fullscreen",

    chromatic: {
      modes: {
        small: allModes["small"],
        large: allModes["large"],
      },
    },
  },

  render: (args) => {
    return (
      <FullscreenLayout>
        <SelectInDrawerTemplate {...args} />
      </FullscreenLayout>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    expect(parentElement).not.toBeNull();
    if (!parentElement) {
      throw new Error("Expected the canvas to have a parent element");
    }
    const root = within(parentElement);

    await userEvent.click(canvas.getByRole("button"));

    const drawer = await root.findByRole("dialog");
    expect(drawer).toBeInTheDocument();

    const combobox = await within(drawer).findByRole("combobox");
    await userEvent.click(combobox);

    const option = await root.findByText("React");
    await waitFor(() => {
      expect(option).toBeVisible();
      // SelectのオプションがDrawerコンテンツ内にポータルされること
      expect(drawer.contains(option)).toBe(true);
    });

    await userEvent.click(option);

    await waitFor(() => {
      expect(combobox).toHaveTextContent("React");
      expect(drawer).toBeInTheDocument();
    });
  },
};

export const NotPortalled: Story = {
  parameters: {
    layout: "fullscreen",

    chromatic: {
      modes: {
        small: allModes["small"],
      },
    },
  },

  args: {
    portalled: false,
  },

  render: (args) => {
    return (
      <FullscreenLayout>
        <Select {...args} portalled={false} />
      </FullscreenLayout>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    expect(parentElement).not.toBeNull();
    if (!parentElement) {
      throw new Error("Expected the canvas to have a parent element");
    }
    const root = within(parentElement);

    await userEvent.click(canvas.getByRole("combobox"));

    const option = await root.findByText("React");
    await waitFor(() => {
      expect(option).toBeVisible();
      // portalled=falseではポータルせずその場にレンダリングされること
      expect(canvasElement.contains(option)).toBe(true);
    });
  },
};

export const PlayReselectSelectedItem: Story = {
  parameters: {
    layout: "fullscreen",

    chromatic: {
      modes: {
        small: allModes["small"],
      },
    },
  },

  args: {
    onValueChange: fn(),
  },

  render: (args) => {
    return (
      <FullscreenLayout>
        <Select {...args} />
      </FullscreenLayout>
    );
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    expect(parentElement).not.toBeNull();
    if (!parentElement) {
      throw new Error("Expected the canvas to have a parent element");
    }
    const root = within(parentElement);

    const combobox = canvas.getByRole("combobox");

    // 1回目の選択
    await userEvent.click(combobox);
    const option = await root.findByRole("option", { name: "React" });
    await userEvent.click(option);

    await waitFor(() => {
      expect(combobox).toHaveTextContent("React");
    });

    // 選択済みの項目を再度クリックできること
    await userEvent.click(combobox);
    const optionAgain = await root.findByRole("option", { name: "React" });
    await userEvent.click(optionAgain);

    await waitFor(() => {
      expect(combobox).toHaveAttribute("aria-expanded", "false");
      // 再クリックしても選択が解除されないこと
      expect(combobox).toHaveTextContent("React");
    });

    // 同じ値の再選択ではonValueChangeは再発火しない（1回のみ）
    expect(args.onValueChange).toHaveBeenCalledTimes(1);
    expect(args.onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ["React"] })
    );
  },
};
