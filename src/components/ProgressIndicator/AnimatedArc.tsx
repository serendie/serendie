import React from "react";
import { describeArc } from "./util";

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
