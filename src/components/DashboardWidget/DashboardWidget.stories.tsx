import figma from "@figma/code-connect";
import { Meta, StoryObj } from "@storybook/react";
import { css } from "../../../styled-system/css";
import { DashboardWidget } from "./DashboardWidget";

const meta: Meta<typeof DashboardWidget> = {
  component: DashboardWidget,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3359-9200",
      props: {
        title: figma.string("Title"),
        label: figma.string("SubTitle"),
      },
      examples: [FigmaExample],
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof DashboardWidget>) {
  return (
    <DashboardWidget
      {...props}
      values={[{ label: "Label", value: 100, unit: "unit" }]}
    />
  );
}

export default meta;
type Story = StoryObj<typeof DashboardWidget>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
