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

export const BackgroundShape: React.FC = () => {
  return (
    <div
      className={css({
        position: "absolute",
        maxWidth: "100vw",
        // overflow: "hidden",
        width: "100%",
        top: "0",
        zIndex: "-1",
      })}
    >
      {[
        BackgroundShape1,
        BackgroundShape2,
        BackgroundShape3,
        BackgroundShape4,
      ].map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};

export const BackgroundShape1: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [140, 140], {
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
          top: "115vh",
          left: "-70vw",
          width: "100vw",
          height: "100vw",
          scale: "3",
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          expanded: {
            scale: "1.2",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vw",
          },
        })}
        initial={{ opacity: 0, rotate: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1, rotate: 140 }}
        transition={{
          duration: 1.5,
          delay: 2.6,
          rotate: {
            duration: 0.6,
            delay: 2.2,
            ease: "easeInOut",
          },
        }}
        style={{
          rotate: rotate,
          y: y,
        }}
      >
        <svg
          viewBox="0 0 2251 2251"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2025.83 1125.39C2025.83 1007.2 2002.55 890.168 1957.33 780.975C1912.1 671.782 1845.8 572.567 1762.23 488.994C1678.66 405.422 1579.44 339.128 1470.25 293.899C1361.06 248.67 1244.02 225.391 1125.83 225.391C1007.64 225.391 890.611 248.67 781.418 293.899C672.225 339.128 573.01 405.422 489.437 488.995C405.865 572.567 339.571 671.783 294.342 780.976C249.113 890.169 225.833 1007.2 225.833 1125.39"
            stroke="#8FAEFE"
            strokeWidth="450"
          />
        </svg>
      </motion.div>
    </>
  );
};

export const BackgroundShape2: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 600);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "200vh",
          right: "0",
          width: "100vw",
          height: "100vw",
          scale: "1.2",
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 2.6,
          rotate: {
            duration: 0.6,
            delay: 2.2,
            ease: "easeInOut",
          },
        }}
        style={{
          y: y,
        }}
      >
        <svg
          width="1319"
          height="1234"
          viewBox="0 0 1319 1234"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1153.27 1219.35C1210.9 1138.64 1252.07 1047.36 1274.43 950.735C1296.78 854.11 1299.89 754.027 1283.57 656.201C1267.25 558.375 1231.82 464.721 1179.3 380.588C1126.78 296.455 1058.21 223.489 977.495 165.857C896.78 108.225 805.504 67.0552 708.879 44.6984C612.253 22.3416 512.17 19.2356 414.344 35.5577C316.518 51.8797 222.865 87.3102 138.731 139.826C54.5981 192.342 -18.3676 260.915 -75.9996 341.63"
            stroke="#FF9B9B"
            strokeWidth="50"
          />
        </svg>
      </motion.div>
    </>
  );
};

export const BackgroundShape3: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 300);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "300vh",
          right: "0",
          width: "50vw",
          height: "50vw",
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 2.6,
          rotate: {
            duration: 0.6,
            delay: 2.2,
            ease: "easeInOut",
          },
        }}
        style={{
          y: y,
        }}
      >
        <svg
          viewBox="0 0 978 1216"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M924.915 178.284C862.755 142.396 794.134 119.102 722.971 109.734C651.809 100.365 579.498 105.104 510.167 123.682C440.836 142.259 375.843 174.31 318.898 218.005C261.954 261.7 214.174 316.183 178.285 378.343C142.397 440.504 119.104 509.124 109.735 580.287C100.366 651.45 105.106 723.761 123.683 793.092C142.26 862.423 174.311 927.416 218.006 984.36C261.701 1041.3 316.184 1089.08 378.344 1124.97"
            stroke="#9EADDB"
            strokeWidth="210"
          />
        </svg>
      </motion.div>
    </>
  );
};

export const BackgroundShape4: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 500);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "365vh",
          left: "-20%",
          width: "100vw",
          height: "100vw",
          zIndex: "-3",
          scale: "1.5",
          transformOrigin: "center center",
          pointerEvents: "none",
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 2.6,
          rotate: {
            duration: 0.6,
            delay: 2.2,
            ease: "easeInOut",
          },
        }}
        style={{
          y: y,
        }}
      >
        <svg
          viewBox="0 0 2096 1673"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1755.56 1560.12C1813.27 1460.17 1850.23 1349.54 1864.33 1234.56C1878.44 1119.57 1869.4 1002.48 1837.75 889.974C1806.1 777.464 1752.45 671.738 1679.87 578.831C1607.28 485.924 1517.19 407.656 1414.72 348.496C1312.25 289.336 1199.42 250.443 1082.67 234.036C965.915 217.63 847.529 224.031 734.267 252.876C621.006 281.721 515.088 332.443 422.56 402.148C330.033 471.852 252.708 559.173 195 659.126"
            stroke="#D7DEFB"
            strokeWidth="450"
          />
        </svg>
      </motion.div>
    </>
  );
};
