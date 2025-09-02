import React from "react";

export const AnimatedArc: React.FC<{
  className?: string;
  radius: number;
  width: number; // strokeWidth
}> = ({ className, radius, width }) => {
  const [t, setT] = React.useState(0); // 0〜1 で 1 周
  const prevTimeRef = React.useRef<number | null>(null);

  // アニメーションループ
  React.useEffect(() => {
    let id: number;
    const secondsPerLoop = 75 / 30; // 30fps換算で75フレーム = 2.5秒/周
    const loop = (time: number) => {
      if (prevTimeRef.current == null) {
        prevTimeRef.current = time;
      }
      const deltaMs = time - prevTimeRef.current;
      prevTimeRef.current = time;
      const deltaT = deltaMs / 1000 / secondsPerLoop;
      setT((prev) => (prev + deltaT) % 1);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // ここで弧の「開始角」「長さ」を計算
  const T = t * Math.PI * 2;
  const end = 180 + 40 * Math.sin(-T) + 40;
  const start = 90 * Math.sin(T) + 90;

  const d = describeArc(
    radius + width, // cx
    radius + width, // cy
    radius, // r
    t * 360 + start,
    t * 360 + end
  );

  return (
    <path
      d={d}
      transformOrigin="center"
      transform={`rotate(${t * 360})`}
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
