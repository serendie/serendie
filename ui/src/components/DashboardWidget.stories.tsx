import { Meta, StoryObj } from "@storybook/react";
import { DashboardWidget } from "./DashboardWidget";
import { cva } from "../../styled-system/css";

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

const DashboardPlaceholderStyle = cva({
  base: {
    width: "100%",
    height: "100%",
    minHeight: "160px",
    bgColor: "dic.reference.color.scale.gray.200",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "dic.system.dimension.radius.medium",
  },
});

const DashboardPlaceholder: React.FC = () => {
  const style = DashboardPlaceholderStyle();
  return <div className={style}>GraphArea</div>;
};
