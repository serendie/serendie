// 指定した中心・半径・開始角度・終了角度から SVG 弧パスを生成
export const describeArc = (
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    r: number,
    angleInDeg: number
  ) => {
    const angleInRad = ((angleInDeg - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRad),
      y: centerY + r * Math.sin(angleInRad),
    };
  };

  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const sweepAngle = Math.abs((endAngle - startAngle) % 360);
  const largeArcFlag = sweepAngle <= 180 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
