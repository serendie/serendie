import { sva } from "../../styled-system/css";
import { SvgIcon } from "./SvgIcon";

const DashboardWidgetStyle = sva({
  slots: [
    "root",
    "labelContainer",
    "label",
    "labelTitle",
    "labelText",
    "area",
    "areaContainer",
    "areaValue",
    "areaValueLabel",
    "areaValueContainer",
    "areaValueNumber",
    "areaValueNumberUnit",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.medium",
      py: "sd.system.dimension.spacing.small",
      px: "sd.system.dimension.spacing.medium",

      width: "100%",
      bgColor: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.medium",
    },
    labelContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      cursor: "pointer",
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.medium",
      width: "100%",
    },
    labelTitle: {
      textStyle: "sd.system.typography.label.extraLarge_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.extraLarge_expanded",
      },
    },
    labelText: {
      textStyle: "sd.system.typography.label.small_compact",
      color: "sd.system.color.component.onSurfaceVariant",
      _expanded: {
        textStyle: "sd.system.typography.label.small_expanded",
      },
    },
    area: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "sd.system.dimension.spacing.medium",
    },
    areaContainer: {},
    areaValue: {
      display: "flex",
      flexDirection: "column",
      alignSelf: "flex-end",
    },
    areaValueLabel: {
      color: "sd.system.color.component.onSurfaceVariant",
      textStyle: "sd.system.typography.label.small_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.small_expanded",
      },
    },
    areaValueContainer: {
      display: "flex",
      alignItems: "baseline",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
    },
    areaValueNumber: {
      textStyle: "sd.system.typography.title.large_compact",
      _expanded: {
        textStyle: "sd.system.typography.title.large_expanded",
      },
    },
    areaValueNumberUnit: {
      color: "sd.system.color.component.onSurfaceVariant",
      textStyle: "sd.system.typography.label.small_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.small_expanded",
      },
    },
  },
  variants: {
    values: {
      noValue: {
        area: {
          gridTemplateColumns: "1fr",
        },
      },
      singleValue: {
        area: {
          gridTemplateColumns: "auto 1fr",
          gap: "sd.system.dimension.spacing.twoExtraLarge",
        },
      },
      doubleValue: {
        areaContainer: {
          gridColumn: "span 2",
          order: -1,
        },
        area: {
          gridTemplateColumns: "1fr 1fr",
        },
      },
    },
  },
  defaultVariants: {
    values: "singleValue",
  },
});

type AreaValueProps = {
  label: string;
  value: number;
  unit: string;
};

type DashboardWidgetProps = {
  values?: [AreaValueProps, AreaValueProps] | [AreaValueProps] | undefined;
  linkTo?: string;
  children?: React.ReactNode;
};

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  values,
  children,
  linkTo,
}) => {
  // Variantはコンポーネント内部でのみ使用
  const style = DashboardWidgetStyle({
    values:
      values === undefined
        ? "noValue"
        : values.length === 1
        ? "singleValue"
        : "doubleValue",
  });

  const AreaValue: React.FC<AreaValueProps> = ({ label, value, unit }) => {
    return (
      <div className={style.areaValue}>
        <h3 className={style.areaValueLabel}>{label}</h3>
        <div className={style.areaValueContainer}>
          <p className={style.areaValueNumber}>{value}</p>
          <p className={style.areaValueNumberUnit}>{unit}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={style.root}>
      <a href={linkTo} className={style.labelContainer}>
        <div className={style.label}>
          <h2 className={style.labelTitle}>title</h2>
          <p className={style.labelText}>icon</p>
        </div>
        <SvgIcon icon={"chevron_right"} size="24px" />
      </a>

      <div className={style.area}>
        {values?.map((value, index) => (
          <AreaValue key={index} {...value} />
        ))}
        <div className={style.areaContainer}>{children}</div>
      </div>
    </div>
  );
};
