import type { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator, ProgressIndicatorIndeterminate } from ".";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Components/ProgressIndicator",
  component: ProgressIndicator,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "medium",
    type: "linear",
    value: 0.5,
    max: 1,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    type: {
      control: { type: "select" },
      options: ["linear", "circular"],
    },
    value: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    max: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  args: {
    type: "linear",
    size: "medium",
    value: 0.6,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const Circular: Story = {
  args: {
    type: "circular",
    size: "medium",
    value: 0.6,
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "8px" }}>Linear</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ProgressIndicator type="linear" size="small" value={0.6} />
          <ProgressIndicator type="linear" size="medium" value={0.6} />
          <ProgressIndicator type="linear" size="large" value={0.6} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px" }}>Circular</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <ProgressIndicator type="circular" size="small" value={0.6} />
          <ProgressIndicator type="circular" size="medium" value={0.6} />
          <ProgressIndicator type="circular" size="large" value={0.6} />
        </div>
      </div>
    </div>
  ),
};

export const Progress: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "8px" }}>Linear Progress</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ProgressIndicator type="linear" value={0} />
          <ProgressIndicator type="linear" value={0.2} />
          <ProgressIndicator type="linear" value={0.4} />
          <ProgressIndicator type="linear" value={0.6} />
          <ProgressIndicator type="linear" value={0.8} />
          <ProgressIndicator type="linear" value={1} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px" }}>Circular Progress</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <ProgressIndicator type="circular" value={0} />
          <ProgressIndicator type="circular" value={0.2} />
          <ProgressIndicator type="circular" value={0.4} />
          <ProgressIndicator type="circular" value={0.6} />
          <ProgressIndicator type="circular" value={0.8} />
          <ProgressIndicator type="circular" value={1} />
        </div>
      </div>
    </div>
  ),
};

export const IndeterminateExamples: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "8px" }}>Linear Indeterminate</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ProgressIndicatorIndeterminate type="linear" size="small" />
          <ProgressIndicatorIndeterminate type="linear" size="medium" />
          <ProgressIndicatorIndeterminate type="linear" size="large" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px" }}>Circular Indeterminate</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <ProgressIndicatorIndeterminate
            type="circular"
            size="small"
            color="primary"
          />
          <ProgressIndicatorIndeterminate
            type="circular"
            size="medium"
            color="primary"
          />
          <ProgressIndicatorIndeterminate
            type="circular"
            size="large"
            color="primary"
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "8px" }}>Circular Indeterminate (Subtle)</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <ProgressIndicatorIndeterminate
            type="circular"
            size="small"
            color="subtle"
          />
          <ProgressIndicatorIndeterminate
            type="circular"
            size="medium"
            color="subtle"
          />
          <ProgressIndicatorIndeterminate
            type="circular"
            size="large"
            color="subtle"
          />
        </div>
      </div>
    </div>
  ),
};
