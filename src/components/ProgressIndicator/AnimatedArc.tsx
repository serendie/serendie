import React from "react";

const SECONDS_PER_LOOP = 2.5; // 1周あたりの秒数（30fps換算で75フレーム）

export const AnimatedArc: React.FC<{
  className?: string;
  radius: number;
  width: number; // strokeWidth
}> = ({ className, radius, width }) => {
  const [t, setT] = React.useState(0); // 0〜1 で 1 周
  const previousFrameTimeRef = React.useRef<number | null>(null);
  const rafIdRef = React.useRef<number | null>(null);

  // アニメーションループ
  React.useEffect(() => {
    const frame = (now: number) => {
      if (previousFrameTimeRef.current == null) {
        previousFrameTimeRef.current = now;
      }
      const deltaSeconds = (now - previousFrameTimeRef.current) / 1000;
      previousFrameTimeRef.current = now;
      const deltaT = deltaSeconds / SECONDS_PER_LOOP;
      setT((prev) => (prev + deltaT) % 1);
      rafIdRef.current = requestAnimationFrame(frame);
    };
    rafIdRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // 弧の「開始角」「長さ」を計算
  const { d, rotationDeg } = React.useMemo(() => {
    const theta = t * Math.PI * 2;
    const end = 180 + 40 * Math.sin(-theta) + 40;
    const start = 90 * Math.sin(theta) + 90;
    const dPath = describeArc(
      radius + width, // cx
      radius + width, // cy
      radius, // r
      t * 360 + start,
      t * 360 + end
    );
    return { d: dPath, rotationDeg: t * 360 };
  }, [t, radius, width]);

  return (
    <path
      d={d}
      transformOrigin="center"
      transform={`rotate(${rotationDeg})`}
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
  const sweepAngle = Math.abs((endAngle - startAngle) % 360);
  const largeArcFlag = sweepAngle <= 180 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
