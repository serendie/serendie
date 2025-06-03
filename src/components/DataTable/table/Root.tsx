import { ReactNode } from "react";
import { css } from "../../../../styled-system/css";

export function Root({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        border: "1px solid",
        borderColor: "sd.system.color.component.outline",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "sm",
        background: "sd.system.color.component.surface",
      })}
    >
      <table
        className={css({
          w: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
        })}
      >
        {children}
      </table>
    </div>
  );
}
