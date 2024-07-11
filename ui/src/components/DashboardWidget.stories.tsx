import { Meta, StoryObj } from "@storybook/react";
import { DashboardWidget } from "./DashboardWidget";
import { css } from "../../styled-system/css";

const meta: Meta<typeof DashboardWidget> = {
  component: DashboardWidget,
};

export default meta;
type Story = StoryObj<typeof DashboardWidget>;

const Template = (args: any) => (
  <DashboardWidget {...args}>
    <DashboardPlaceholder />
  </DashboardWidget>
);

export const NoValue: Story = {
  render: Template,
};

export const SingleValue: Story = {
  args: {
    values: [
      {
        label: "Label",
        value: 100,
        unit: "unit",
      },
    ],
  },
  render: Template,
};

export const DoubleValue: Story = {
  args: {
    values: [
      {
        label: "Label",
        value: 100,
        unit: "unit",
      },
      {
        label: "Label",
        value: 100,
        unit: "unit",
      },
    ],
  },
  render: Template,
};

const DashboardPlaceholder: React.FC = () => (
  <div
    className={css({
      width: "100%",
      height: "100%",
      minHeight: "160px",
      bgColor: "sd.reference.color.scale.gray.200",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "sd.system.dimension.radius.medium",
    })}
  >
    GraphArea
  </div>
);
