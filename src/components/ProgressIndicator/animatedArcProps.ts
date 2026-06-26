import { describeArc } from "./util";

type AnimatedArcProps = {
  progress: number;
  radius: number;
  width: number;
};

export const normalizeProgress = (progress: number) => {
  return ((progress % 1) + 1) % 1;
};

export const getAnimatedArcProps = ({
  progress,
  radius,
  width,
}: AnimatedArcProps) => {
  const t = normalizeProgress(progress);
  const theta = t * Math.PI * 2;
  const end = 180 + 40 * Math.sin(-theta) + 40;
  const start = 90 * Math.sin(theta) + 90;
  const d = describeArc(
    radius + width,
    radius + width,
    radius,
    t * 360 + start,
    t * 360 + end
  );

  return { d, rotationDeg: t * 360 };
};
