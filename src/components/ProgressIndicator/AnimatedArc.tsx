import React from "react";

export const AnimatedArc: React.FC<{
  className?: string;
  radius: number;
  width: number; // strokeWidth
}> = ({ className, radius, width }) => {
  const [t, setT] = React.useState(0); // 0〜1 で 1 周

  // アニメーションループ
  React.useEffect(() => {
    let id: number;
    const loop = () => {
      setT((prev) => (prev + 0.005) % 1); // 0.01 は速度
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // ここで弧の「開始角」「長さ」を計算
  const start = 0;
  const phase = (t * 4) % 2; // 0–2 の範囲
  const end = start + (phase < 1 ? phase : 2 - phase) * 270;

  const d = describeArc(
    radius + width, // cx
    radius + width, // cy
    radius, // r
    start,
    end
  );

  return (
    <path
      d={d}
      transformOrigin="center"
      transform={`rotate(${t * 360 * 3})`}
      strokeLinecap="butt"
      stroke="currentColor"
      strokeWidth={width}
      fill="none"
      className={className}
    />
  );
};

// 指定した中心・半径・開始角度・終了角度から SVG 弧パスを生成
const describeArc = (
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
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
