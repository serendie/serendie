import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button.tsx";
import { Tooltip } from "./Tooltip.tsx";
import { figma } from "@figma/code-connect";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Components/Tooltip",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => (
  <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
    <Tooltip content="ツールチップの内容">
      <Button>Hover me</Button>
    </Tooltip>
  </div>
);

figma.connect(
  Tooltip,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=20276-13553",
  {
    example: Default,
  }
);

export const Positions: Story = {
  render: () => (
    <div
      style={{
        padding: "150px",
        display: "grid",
        gap: "50px",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div />
      <Tooltip content="上部に表示" placement="top">
        <Button size="small">Top</Button>
      </Tooltip>
      <div />

      <Tooltip content="左側に表示" placement="left">
        <Button size="small">Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="右側に表示" placement="right">
        <Button size="small">Right</Button>
      </Tooltip>

      <div />
      <Tooltip content="下部に表示" placement="bottom">
        <Button size="small">Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const CornerPositions: Story = {
  render: () => (
    <div
      style={{
        padding: "150px",
        display: "grid",
        gap: "50px",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip content="左上に表示" placement="top-start">
        <Button size="small">Top Start</Button>
      </Tooltip>
      <div />
      <Tooltip content="右上に表示" placement="top-end">
        <Button size="small">Top End</Button>
      </Tooltip>

      <div />
      <div />
      <div />

      <Tooltip content="左下に表示" placement="bottom-start">
        <Button size="small">Bottom Start</Button>
      </Tooltip>
      <div />
      <Tooltip content="右下に表示" placement="bottom-end">
        <Button size="small">Bottom End</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div
      style={{
        padding: "100px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <Tooltip content="すぐに表示（100ms）" openDelay={100}>
        <Button>Fast</Button>
      </Tooltip>
      <Tooltip content="デフォルト（700ms）">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="ゆっくり表示（1500ms）" openDelay={1500}>
        <Button>Slow</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div
      style={{ padding: "100px", display: "flex", justifyContent: "center" }}
    >
      <Tooltip content="これは長いツールチップテキストです。最大幅が200pxに設定されているため、自動的に改行されます。">
        <Button>長いテキストの例</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div
      style={{
        padding: "100px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <Tooltip content="このツールチップは表示されます" disabled={false}>
        <Button>有効</Button>
      </Tooltip>
      <Tooltip content="このツールチップは表示されません" disabled={true}>
        <Button>無効</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDifferentTriggers: Story = {
  render: () => (
    <div
      style={{
        padding: "100px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip content="ボタンのツールチップ">
        <Button>Button</Button>
      </Tooltip>
      <Tooltip content="テキストのツールチップ">
        <span style={{ cursor: "pointer", textDecoration: "underline" }}>
          Hover me
        </span>
      </Tooltip>
      <Tooltip content="アイコンのツールチップ">
        <Button size="small">?</Button>
      </Tooltip>
    </div>
  ),
};
