import React from "react";
import { getAnimatedArcProps } from "./animatedArcProps";

const SECONDS_PER_LOOP = 2.5; // 1周あたりの秒数（30fps換算で75フレーム）

export const AnimatedArc: React.FC<{
  className?: string;
  radius: number;
  width: number; // strokeWidth
  progress?: number;
}> = ({ className, radius, width, progress }) => {
  const [uncontrolledProgress, setUncontrolledProgress] = React.useState(0);
  const previousFrameTimeRef = React.useRef<number | null>(null);
  const rafIdRef = React.useRef<number | null>(null);

  // アニメーションループ
  React.useEffect(() => {
    if (progress != null) {
      return;
    }

    const frame = (now: number) => {
      if (previousFrameTimeRef.current == null) {
        previousFrameTimeRef.current = now;
      }
      const deltaSeconds = (now - previousFrameTimeRef.current) / 1000;
      previousFrameTimeRef.current = now;
      const deltaT = deltaSeconds / SECONDS_PER_LOOP;
      setUncontrolledProgress((prev) => (prev + deltaT) % 1);
      rafIdRef.current = requestAnimationFrame(frame);
    };
    rafIdRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [progress]);

  // 弧の「開始角」「長さ」を計算
  const { d, rotationDeg } = React.useMemo(
    () =>
      getAnimatedArcProps({
        progress: progress ?? uncontrolledProgress,
        radius,
        width,
      }),
    [progress, uncontrolledProgress, radius, width]
  );

  return (
    <path
      d={d}
      transform={`rotate(${rotationDeg})`}
      strokeLinecap="butt"
      stroke="currentColor"
      strokeWidth={width}
      fill="none"
      className={className}
    />
  );
};
