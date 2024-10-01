import { css } from "styled-system/css";
import type { ReactNode } from "react";

type state = "enabled" | "hover" | "focus-visible" | "disabled" | "loading";

interface StateMatrixProps<ComponentProps> {
  component: React.ElementType;
  defaultProps?: ComponentProps;
  // TODO: この辺の型が適当
  propsName: keyof ComponentProps;
  props: Array<ComponentProps[keyof ComponentProps]>;
  children?: ReactNode;
  states?: state[];
}

export const StateMatrix = <ComponentProps,>({
  component: Component,
  defaultProps,
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
    loading: {
      label: "Loading",
      dataProps: "isLoading",
    },
  };

  return (
    <table
      className={css({
        tableLayout: "fixed",
        mr: "-sd.system.dimension.spacing.extraLarge",
        mb: "-sd.system.dimension.spacing.extraLarge",
      })}
    >
      <tbody>
        <tr>
          <th
            className={css({
              textAlign: "left",
              pr: "sd.system.dimension.spacing.fourExtraLarge",
              pb: "sd.system.dimension.spacing.threeExtraLarge",
            })}
          />
          {states.map((state) => (
            <th
              key={state}
              className={css({
                pr: "sd.system.dimension.spacing.extraLarge",
                pb: "sd.system.dimension.spacing.threeExtraLarge",
              })}
            >
              {stateProps[state].label}
            </th>
          ))}
        </tr>
        {props.map((prop, i) => (
          <tr key={i}>
            <th
              className={css({
                textAlign: "left",
                pr: "sd.system.dimension.spacing.fourExtraLarge",
                pb: "sd.system.dimension.spacing.extraLarge",
              })}
            >
              {prop?.toString()}
            </th>
            {states.map((state, i) => (
              <td
                key={i}
                className={css({
                  //pointerEvents: "none",
                  pr: "sd.system.dimension.spacing.extraLarge",
                  pb: "sd.system.dimension.spacing.extraLarge",
                })}
              >
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  })}
                >
                  <Component
                    {...defaultProps}
                    {...{ [propsName]: prop }}
                    {...(stateProps[state].dataProps && {
                      [stateProps[state].dataProps]: "true",
                    })}
                  >
                    {children}
                  </Component>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
