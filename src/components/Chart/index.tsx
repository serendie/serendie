import React, { ReactNode } from "react";
import { VictoryChart, VictoryChartProps } from "victory-chart";
import { SerendieTheme } from "./VictoryTheme";
import { VictoryAxis } from "victory-axis";

/**
 * SerendieChart - SerendieThemeを適用したVictoryChartラッパーコンポーネント
 *
 * このコンポーネントは、VictoryChartをラップし、SerendieThemeをデフォルトで適用します。
 * これにより、各チャートコンポーネントでテーマを個別に指定する必要がなくなります。
 *
 * 注意点:
 * - プロジェクトから使う場合は、victoryをインストールしてください。
 *
 * 特徴:
 * - SerendieThemeをデフォルトで適用
 * - VictoryChartのすべてのプロパティをサポート
 * - テーマのオーバーライドが可能
 *
 * 使用例:
 * ```tsx
 * <SerendieChart width={500} height={300}>
 *   <VictoryBar data={data} />
 * </SerendieChart>
 * ```
 */
interface SerendieChartProps extends Omit<VictoryChartProps, "theme"> {
  children: ReactNode;
  theme?: typeof SerendieTheme;
}

export const Chart: React.FC<SerendieChartProps> = ({
  children,
  theme = SerendieTheme,
  ...props
}) => {
  return (
    <VictoryChart theme={theme} {...props}>
      <VictoryAxis style={{ axis: { stroke: "none" } }} tickFormat={() => ""} />
      <VictoryAxis
        dependentAxis
        style={{ axis: { stroke: "none" } }}
        tickFormat={() => ""}
      />
      {children}
    </VictoryChart>
  );
};
