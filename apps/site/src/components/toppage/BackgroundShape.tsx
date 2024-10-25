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
    <>
      <div
        className={css({
          position: "absolute",
          top: "0",
          zIndex: "-1",
          mixBlendMode: "multiply",
          mx: "12.22%",
          width: "calc(100% - 24.44%)",
          maxW: "calc(1640px + 24.44%)",
          display: "none",
          expanded: {
            display: "block",
          },
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
      <div
        className={css({
          position: "absolute",
          top: "0",
          zIndex: "-1",
          mixBlendMode: "multiply",
          mx: "auto",
          width: "100%",
          maxW: "100%",
          display: "block",
          expanded: {
            display: "none",
          },
        })}
      >
        {[
          BackgroundShapeCompact1,
          BackgroundShapeCompact2,
          BackgroundShapeCompact3,
          BackgroundShapeCompact4,
          BackgroundShapeCompact5,
        ].map((Component, index) => (
          <Component key={index} />
        ))}
      </div>
    </>
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
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          scale: "1",
          top: "calc(-20vh - 10vw)",
          right: "-20%",
          width: "calc(100vw + 25%)",
          aspectRatio: "1/1",
        })}
        initial={{
          opacity: 0,
          rotate: 0,
          scale: 1.2,
          // x: "-50%"
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 145,
          // x: "-50%",
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

  const y = useParallax(scrollYProgress, 0);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "calc(100vh + 60px)",
          left: "-79px",
          width: "124%",
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
              d="M1223.47 1153.21C1272.84 1067.69 1304.89 973.282 1317.78 875.375C1330.67 777.469 1324.15 677.982 1298.59 582.596C1273.03 487.209 1228.94 397.791 1168.82 319.446C1108.7 241.101 1033.75 175.364 948.224 125.988C862.703 76.6127 768.294 44.5651 670.387 31.6755C572.48 18.7859 472.994 25.3066 377.607 50.8654C282.221 76.4241 192.802 120.52 114.457 180.636C36.1126 240.753 -29.6243 315.711 -79 401.232"
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
  const y = useParallax(scrollYProgress, 350);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "250vh",
          right: "-183px",
          width: "50vw",
          height: "50vw",
          zIndex: "-2",
          transformOrigin: "center center",
          pointerEvents: "none",
          mixBlendMode: "multiply",
          lg: {
            top: "270vh",
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
          top: "350vh",
          left: "-13.889%",
          width: "136%",
          height: "100%",
          zIndex: "-3",
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

  const y = useParallax(scrollYProgress, 0);

  return (
    <>
      <motion.div
        className={css({
          position: "absolute",
          top: "510vh",
          left: "-150px",
          width: "calc(100% + 300px)",
          zIndex: "-3",
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
          viewBox="0 0 1375 1352"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={css({
            stroke: "web.system.color.mvShape.background.arc.fifth",
          })}
        >
          <g>
            <path
              d="M-366 636.933C-324.067 539.172 -262.805 450.836 -185.712 376.968C-108.618 303.1 -17.2026 245.147 83.3151 206.417C183.833 167.687 291.484 148.94 400.123 151.244C508.762 153.549 616.261 176.86 716.482 219.848C816.703 262.837 907.683 324.659 984.228 401.786C1060.77 478.913 1121.38 569.834 1162.6 669.359C1203.82 768.883 1224.83 875.061 1224.44 981.831C1224.05 1088.6 1202.27 1193.87 1160.34 1291.63"
              stroke-width="300"
            />
          </g>
        </svg>
      </motion.div>
    </>
  );
};

export const BackgroundShapeCompact1: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 120], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, -50);

  return (
    <motion.div
      className={css({
        position: "absolute",
        zIndex: "-2",
        transformOrigin: "center center",
        pointerEvents: "none",
        mixBlendMode: "multiply",
        scale: "1",
        top: "0",
        right: "0",
        width: "100%",
        aspectRatio: "1/1",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        width="375"
        height="812"
        viewBox="0 0 375 812"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.fifth",
        })}
      >
        <motion.g
          clipPath="url(#clip1_13512_18714)"
          style={{
            rotate: rotate,
            y: y,
          }}
          initial={{
            opacity: 0,
            scale: 1.2,
            rotate: 140,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
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
        >
          <g clipPath="url(#clip2_13512_18714)">
            <motion.circle
              cx="-83.9727"
              cy="279.026"
              r="515"
              transform="rotate(45 -83.9727 279.026)"
              stroke="#8FAEFE"
              stroke-width="240"
            />
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13512_18714">
            <rect width="375" height="812" fill="white" />
          </clipPath>
          <clipPath id="clip1_13512_18714">
            <rect
              width="1270"
              height="1270"
              fill="white"
              transform="translate(-83.9727 -619) rotate(45)"
            />
          </clipPath>
          <clipPath id="clip2_13512_18714">
            <rect
              width="635"
              height="1270"
              fill="white"
              transform="translate(365.039 -169.988) rotate(45)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShapeCompact2: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "100vh",
        width: "100%",
        left: "0",
      })}
    >
      <svg
        viewBox="0 0 375 885"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.second",
          mixBlendMode: "multiply",
        })}
      >
        <motion.g
          clipPath="url(#clip0_13517_18730)"
          style={{
            y: y,
          }}
        >
          <g clipPath="url(#clip1_13517_18730)">
            <g clipPath="url(#clip2_13517_18730)">
              <circle
                cx="83.4606"
                cy="454.461"
                r="421"
                transform="rotate(-15.0819 83.4606 454.461)"
                stroke="#9CE6EC"
                stroke-width="48"
              />
            </g>
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13517_18730">
            <rect width="375" height="885" fill="white" />
          </clipPath>
          <clipPath id="clip1_13517_18730">
            <rect
              width="890"
              height="890"
              fill="white"
              transform="translate(-462 140.578) rotate(-15.0819)"
            />
          </clipPath>
          <clipPath id="clip2_13517_18730">
            <rect
              width="445"
              height="890"
              fill="white"
              transform="translate(-32.3281 24.7891) rotate(-15.0819)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShapeCompact3: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "230.419vh",
        width: "100%",
        left: "0",
      })}
      style={{
        y: y,
      }}
    >
      <svg
        viewBox="0 0 376 439"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.third",
          mixBlendMode: "multiply",
        })}
      >
        <motion.g clipPath="url(#clip0_13517_19200)">
          <g clipPath="url(#clip1_13517_19200)">
            <g clipPath="url(#clip2_13517_19200)">
              <circle
                cx="430.848"
                cy="261.1"
                r="198"
                transform="rotate(-132.885 430.848 261.1)"
                stroke-width="120"
              />
            </g>
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13517_19200">
            <rect
              width="375"
              height="439"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
          <clipPath id="clip1_13517_19200">
            <rect
              width="516"
              height="516"
              fill="white"
              transform="translate(417.383 625.719) rotate(-132.885)"
            />
          </clipPath>
          <clipPath id="clip2_13517_19200">
            <rect
              width="258"
              height="516"
              fill="white"
              transform="translate(241.805 436.676) rotate(-132.885)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShapeCompact4: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "263.547vh",
        width: "100%",
        left: "0",
      })}
      style={{
        y: y,
      }}
    >
      <svg
        viewBox="0 0 376 1313"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.fourth",
          mixBlendMode: "multiply",
        })}
      >
        <motion.g clipPath="url(#clip0_13517_19209)">
          <g clipPath="url(#clip1_13517_19209)">
            <g clipPath="url(#clip2_13517_19209)">
              <circle
                cx="820.792"
                cy="521.972"
                r="755.553"
                transform="rotate(124.497 820.792 521.972)"
                stroke-width="319.57"
              />
            </g>
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13517_19209">
            <rect
              width="375"
              height="1313"
              fill="white"
              transform="translate(0.496094)"
            />
          </clipPath>
          <clipPath id="clip1_13517_19209">
            <rect
              width="1830.68"
              height="1830.68"
              fill="white"
              transform="translate(2093.59 286) rotate(124.497)"
            />
          </clipPath>
          <clipPath id="clip2_13517_19209">
            <rect
              width="915.338"
              height="1830.68"
              fill="white"
              transform="translate(1575.18 1040.38) rotate(124.497)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShapeCompact5: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "384.236vh",
        width: "100%",
        left: "0",
      })}
      style={{
        y: y,
      }}
    >
      <svg
        viewBox="0 0 375 1489"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.fifth",
          mixBlendMode: "multiply",
        })}
      >
        <motion.g clip-path="url(#clip0_13517_19234)">
          <g clip-path="url(#clip1_13517_19234)">
            <g clip-path="url(#clip2_13517_19234)">
              <circle
                cx="-326.14"
                cy="911.86"
                r="817.667"
                transform="rotate(-50.6415 -326.14 911.86)"
                stroke="#8FAEFE"
                stroke-width="300"
              />
            </g>
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13517_19234">
            <rect width="375" height="1489" fill="white" />
          </clipPath>
          <clipPath id="clip1_13517_19234">
            <rect
              width="1935.33"
              height="1935.33"
              fill="white"
              transform="translate(-1688 1046.39) rotate(-50.6415)"
            />
          </clipPath>
          <clipPath id="clip2_13517_19234">
            <rect
              width="967.667"
              height="1935.33"
              fill="white"
              transform="translate(-1074.33 298.191) rotate(-50.6415)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};
