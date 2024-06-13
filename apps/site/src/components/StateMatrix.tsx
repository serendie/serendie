import { css } from "@spread/ui/css";
import type { ReactNode } from "react";

type state = "enabled" | "hover" | "focus-visible" | "disabled";

interface StateMatrixProps<ComponentProps> {
  component: React.ElementType;
  // TODO: この辺の型が適当
  propsName: keyof ComponentProps;
  props: Array<ComponentProps[keyof ComponentProps]>;
  children?: ReactNode;
  states?: state[];
}

export const StateMatrix = <ComponentProps,>({
  component: Component,
  propsName,
  props,
  children,
  states = ["enabled", "hover", "focus-visible", "disabled"],
}: StateMatrixProps<ComponentProps>) => {
  const stateProps = {
    enabled: {
      label: "Enabled",
      dataProps: "",
    },
    hover: {
      label: "Hover",
      dataProps: "data-hover",
    },
    "focus-visible": {
      label: "Focus Visible",
      dataProps: "data-focus-visible",
    },
    disabled: {
      label: "Disabled",
      dataProps: "data-disabled",
    },
  };

  return (
    <table
      className={css({
        mr: "-dic.system.dimension.spacing.extraLarge",
        mb: "-dic.system.dimension.spacing.extraLarge",
      })}>
      <tr>
        <th
          className={css({
            textAlign: "left",
            pr: "dic.system.dimension.spacing.fourExtraLarge",
            pb: "dic.system.dimension.spacing.threeExtraLarge",
          })}>
          {propsName?.toString()}
        </th>
        {states.map((state) => (
          <th
            key={state}
            className={css({
              pr: "dic.system.dimension.spacing.extraLarge",
              pb: "dic.system.dimension.spacing.threeExtraLarge",
            })}>
            {stateProps[state].label}
          </th>
        ))}
      </tr>
      {props.map((prop, i) => (
        <tr key={i}>
          <th
            className={css({
              textAlign: "left",
              pr: "dic.system.dimension.spacing.fourExtraLarge",
              pb: "dic.system.dimension.spacing.extraLarge",
            })}>
            {prop?.toString()}
          </th>
          {states.map((state, i) => (
            <td
              key={i}
              className={css({
                //pointerEvents: "none",
                pr: "dic.system.dimension.spacing.extraLarge",
                pb: "dic.system.dimension.spacing.extraLarge",
              })}>
              <Component
                {...{ [propsName]: prop }}
                {...{ [stateProps[state].dataProps]: true }}>
                {children}
              </Component>
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};
