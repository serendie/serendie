import { css } from "@serendie/ui/css";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export const BackgroundShape1: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [230, 190], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, 300);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "0",
          left: "0",
          width: "2251px",
          height: "2251px",
          scale: "1.2",
          zIndex: "-1",
          transformOrigin: "center center",
        })}
        style={{
          rotate: rotate,
          y: y,
        }}
      >
        <svg
          width="2251"
          height="2251"
          viewBox="0 0 2251 2251"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2025.83 1125.39C2025.83 1007.2 2002.55 890.168 1957.33 780.975C1912.1 671.782 1845.8 572.567 1762.23 488.994C1678.66 405.422 1579.44 339.128 1470.25 293.899C1361.06 248.67 1244.02 225.391 1125.83 225.391C1007.64 225.391 890.611 248.67 781.418 293.899C672.225 339.128 573.01 405.422 489.437 488.995C405.865 572.567 339.571 671.783 294.342 780.976C249.113 890.169 225.833 1007.2 225.833 1125.39"
            stroke="#001D93"
            strokeWidth="450"
          />
        </svg>
      </motion.div>
    </>
  );
};
