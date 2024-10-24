import { css } from "styled-system/css";
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
        top: "0",
        zIndex: "-1",
        mixBlendMode: "multiply",
        mx: "12.22%",
        width: "100%",
        maxW: "calc(1640px + 24.44%)",
      })}
    >
      {[
        BackgroundShape1,
        BackgroundShape2,
        BackgroundShape3,
        BackgroundShape4,
        BackgroundShape5,
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
          top: "67vh",
          left: "-70vw",
          width: "100vw",
          aspectRatio: "1/1",
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          expanded: {
            scale: "1",
            top: "calc(-20vh - 10vw)",
            right: "initial",
            left: "35%",
            width: "calc(100vw + 25%)",
            aspectRatio: "1/1",
          },
        })}
        initial={{ opacity: 0, rotate: 0, scale: 1.2, x: "-50%" }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 140,
          x: "-50%",
        }}
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
          className={css({
            stroke: "web.system.color.mvShape.background.arc.first",
          })}
        >
          <path
            d="M2025.83 1125.39C2025.83 1007.2 2002.55 890.168 1957.33 780.975C1912.1 671.782 1845.8 572.567 1762.23 488.994C1678.66 405.422 1579.44 339.128 1470.25 293.899C1361.06 248.67 1244.02 225.391 1125.83 225.391C1007.64 225.391 890.611 248.67 781.418 293.899C672.225 339.128 573.01 405.422 489.437 488.995C405.865 572.567 339.571 671.783 294.342 780.976C249.113 890.169 225.833 1007.2 225.833 1125.39"
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
          left: "0%",
          width: "100%",
          aspectRatio: "1/1",
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          "& svg": {
            overflow: "visible",
            width: "100%",
          },
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
          viewBox="0 0 1350 1166"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css({
            stroke: "web.system.color.mvShape.background.arc.second",
          })}
        >
          <g>
            <path
              d="M1223.47 1153.21C1272.84 1067.69 1304.89 973.284 1317.78 875.377C1330.67 777.47 1324.15 677.984 1298.59 582.597C1273.03 487.211 1228.94 397.792 1168.82 319.447C1108.7 241.103 1033.75 175.366 948.224 125.99C862.703 76.6143 768.294 44.5668 670.387 31.6771C572.481 18.7875 472.994 25.3082 377.607 50.867C282.221 76.4257 192.802 120.522 114.458 180.638C36.1127 240.754 -29.6242 315.713 -78.9999 401.234"
              stroke-width="50"
            />
          </g>
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
          lg: {
            top: "250vh",
          },
          "& svg": {
            overflow: "visible",
            width: "100%",
          },
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
          viewBox="0 0 695 731"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css({
            stroke: "web.system.color.mvShape.background.arc.third",
          })}
        >
          <g>
            <path
              d="M789.44 261.948C761.924 220.194 726.453 184.268 685.052 156.222C643.652 128.177 597.133 108.56 548.151 98.4921C499.169 88.4245 448.684 88.1031 399.578 97.5463C350.472 106.989 303.707 126.012 261.953 153.529C220.199 181.045 184.273 216.516 156.228 257.917C128.182 299.317 108.565 345.836 98.4974 394.818C88.4297 443.8 88.1083 494.285 97.5515 543.39C106.995 592.496 126.017 639.261 153.534 681.016"
              stroke-width="180"
            />
          </g>
        </svg>
      </motion.div>
    </>
  );
};

export const BackgroundShape4: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 50);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "calc(305vh + 50vw)",
          left: "-10%",
          width: "100%",
          height: "100%",
          zIndex: "-3",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          md: {
            top: "calc(305vh + 80vw)",
            width: "110%",
            height: "110%",
          },
          lg: {
            top: "295vh",
            width: "100%",
            height: "100%",
          },
          "& svg": {
            overflow: "visible",
            width: "100%",
          },
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
        {/* <svg
          viewBox="0 0 2096 1673"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css({
            stroke: "web.system.color.mvShape.background.arc.fourth",
          })}
        >
          <path
            d="M1755.56 1560.12C1813.27 1460.17 1850.23 1349.54 1864.33 1234.56C1878.44 1119.57 1869.4 1002.48 1837.75 889.974C1806.1 777.464 1752.45 671.738 1679.87 578.831C1607.28 485.924 1517.19 407.656 1414.72 348.496C1312.25 289.336 1199.42 250.443 1082.67 234.036C965.915 217.63 847.529 224.031 734.267 252.876C621.006 281.721 515.088 332.443 422.56 402.148C330.033 471.852 252.708 559.173 195 659.126"
            strokeWidth="450"
          />
        </svg> */}
        <svg
          viewBox="0 0 1440 1679"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css({
            stroke: "web.system.color.mvShape.background.arc.fourth",
          })}
        >
          <g>
            <path
              d="M319.767 126.996C258.076 218.108 215.387 320.785 194.137 429.164C172.887 537.543 173.492 649.501 195.918 758.647C218.343 867.793 262.151 971.988 324.838 1065.28C387.525 1158.58 467.865 1239.15 561.271 1302.39C654.676 1365.64 759.318 1410.32 869.221 1433.88C979.124 1457.44 1092.14 1459.42 1201.81 1439.72C1311.48 1420.01 1415.65 1379 1508.39 1319.03C1601.13 1259.05 1680.62 1181.29 1742.31 1090.18"
              stroke-width="450"
            />
          </g>
        </svg>
      </motion.div>
    </>
  );
};

export const BackgroundShape5: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 400);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "calc(455vh - 25vw)",
          left: "-12.22%",
          width: "100vw",
          aspectRatio: "1/1",
          zIndex: "-3",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          lg: {
            top: "calc(455vh - 30vw)",
          },
          md: {
            top: "calc(455vh - 60vw)",
          },
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
          className={css({
            stroke: "web.system.color.mvShape.background.arc.fifth",
          })}
        >
          <path
            d="M1755.56 1560.12C1813.27 1460.17 1850.23 1349.54 1864.33 1234.56C1878.44 1119.57 1869.4 1002.48 1837.75 889.974C1806.1 777.464 1752.45 671.738 1679.87 578.831C1607.28 485.924 1517.19 407.656 1414.72 348.496C1312.25 289.336 1199.42 250.443 1082.67 234.036C965.915 217.63 847.529 224.031 734.267 252.876C621.006 281.721 515.088 332.443 422.56 402.148C330.033 471.852 252.708 559.173 195 659.126"
            strokeWidth="450"
          />
        </svg>
      </motion.div>
    </>
  );
};
