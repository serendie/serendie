import { DashboardWidget } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";
import { cva } from "@serendie/ui/css";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Default</Dt>
      <Dd>
        <DashboardWidget>
          <DashboardPlaceholder />
        </DashboardWidget>
      </Dd>

      <Dt>Single value</Dt>
      <Dd>
        <DashboardWidget
          values={[
            {
              label: "Label",
              value: 100,
              unit: "unit",
            },
          ]}
        >
          <DashboardPlaceholder />
        </DashboardWidget>
      </Dd>

      <Dt>Double value</Dt>
      <Dd>
        <DashboardWidget
          values={[
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
          ]}
        >
          <DashboardPlaceholder />
        </DashboardWidget>
      </Dd>
    </Dl>
  );
}

const DashboardPlaceholderStyle = cva({
  base: {
    width: "100%",
    height: "100%",
    minHeight: "160px",
    bgColor: "sd.reference.color.scale.gray.200",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "sd.system.dimension.radius.medium",
  },
});

const DashboardPlaceholder: React.FC = () => {
  const style = DashboardPlaceholderStyle();
  return <div className={style}>Placeholder</div>;
};
