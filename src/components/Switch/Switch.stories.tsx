import type { Meta, StoryObj } from "@storybook/react";
import { Switch, SwitchProps } from "./Switch";
import figma from "@figma/code-connect";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3311-28493",
      props: {
        label: figma.string("Label"),
        helperText: figma.enum("Line", {
          Multiple: figma.string("HelperText"),
        }),
        disabled: figma.enum("State", {
          Disabled: true,
          "Disabled-Selected": true,
        }),
        checked: figma.enum("State", {
          Selected: true,
          "Disabled-Selected": true,
        }),
      },
      examples: [FigmaExample],
    },
  },
  decorators: [(Story) => <Story />],
  argTypes: {
    helperText: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Switch>) {
  return <Switch {...props} />;
}

export default meta;
type Story = StoryObj<typeof Switch>;

const Template = (args: SwitchProps) => (
  <Switch {...args} label="タイトルタイトル1" helperText={args.helperText} />
);

export const Default: Story = {
  render: Template,
};

export const WithHelperText: Story = {
  render: Template,
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};

export const Disabled: Story = {
  render: (args: SwitchProps) => (
    <>
      <Switch
        {...args}
        label="タイトルタイトル1"
        helperText={args.helperText}
        checked
        disabled
      />
      <Switch
        {...args}
        label="タイトルタイトル1"
        helperText={args.helperText}
        disabled
      />
    </>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};

/**
 * Issue #110 再現テスト
 * スクロール可能なコンテナ内に多数のSwitchを配置した場合、
 * 親コンテナの高さが意図せず増加しないことを確認するストーリー。
 *
 * 修正前: ビューポート外のSwitchの隠しinputが親コンテナの高さを増加させていた
 * 修正後: position: relative により隠しinputがコンポーネント境界内に収まる
 */
export const ScrollableContainer: Story = {
  render: () => {
    const items = Array.from({ length: 50 }, (_, i) => String(i + 1));
    return (
      <div
        style={{
          maxHeight: "300px",
          border: "2px solid #ccc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "8px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
          }}
        >
          スクロール可能なコンテナ（max-height: 300px）
        </div>
        <div style={{ overflowY: "auto" }}>
          {items.map((i) => (
            <Switch key={i} label={`Switch ${i}`} />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Issue #110: スクロール可能なコンテナ内でSwitchコンポーネントが親要素の高さに影響を与えないことを確認するテスト。コンテナの高さが300pxを超えないことを確認してください。",
      },
    },
  },
};
