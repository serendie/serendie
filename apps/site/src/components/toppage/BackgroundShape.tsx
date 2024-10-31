import { css } from "styled-system/css";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export const BackgroundShape: React.FC = () => {
  return (
    <>
      <div
        data-name="top-background-shape"
        className={css({
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "-1",
          mx: "auto",
          width: "calc(100%)",
          maxW: "calc(1440px)",
          display: "none",
          pointerEvents: "none",
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
        data-name="top-background-shape"
        className={css({
          position: "absolute",
          top: "0",
          zIndex: "-1",
          mx: "auto",
          width: "100%",
          maxW: "100%",
          display: "block",
          pointerEvents: "none",
          expanded: {
            display: "none",
          },
        })}
      >
        {[
          //Note: z-indexと命名が異なるので注意
          BackgroundShapeCompact1,
          BackgroundShapeCompact3,
          BackgroundShapeCompact2,
          BackgroundShapeCompact5,
          BackgroundShapeCompact4,
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
        top: "0",
        width: "100vw",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "-2",
        transformOrigin: "center center",
        pointerEvents: "none",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        viewBox="0 0 1440 1036"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.first",
        })}
      >
        <motion.g
          clipPath="url(#clip1_13561_18660)"
          initial={{
            opacity: 0,
            rotate: -145,
            scale: 1.2,
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
          style={{
            rotate: rotate,
            y: y,
          }}
        >
          <g clipPath="url(#clip2_13561_18660)">
            <circle
              cx="634.136"
              cy="149.05"
              r="696.421"
              transform="rotate(53.66 634.136 149.05)"
              strokeWidth="380"
            />
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13561_18660">
            <rect width="1440" height="1036" fill="white" />
          </clipPath>
          <clipPath id="clip1_13561_18660">
            <rect
              width="1772.84"
              height="1772.84"
              fill="white"
              transform="translate(822.889 -1090.25) rotate(53.66)"
            />
          </clipPath>
          <clipPath id="clip2_13561_18660">
            <rect
              width="886.421"
              height="1772.84"
              fill="white"
              transform="translate(1348.16 -376.223) rotate(53.66)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShape2: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -30], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );
  const y = useParallax(scrollYProgress, -35);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "103.556vh",
        width: "100%",
        zIndex: "-2",
        transformOrigin: "center center",
        pointerEvents: "none",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        viewBox="0 0 1440 1166"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.second",
        })}
      >
        <motion.g
          clipPath="url(#clip1_13561_18670)"
          style={{
            y,
            rotate,
          }}
        >
          <g clipPath="url(#clip2_13561_18670)">
            <circle
              cx="573.342"
              cy="776.691"
              r="750.603"
              transform="rotate(-60 573.342 776.691)"
              strokeWidth="50"
            />
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13561_18670">
            <rect width="1440" height="1166" fill="white" />
          </clipPath>
          <clipPath id="clip1_13561_18670">
            <rect
              width="1551.21"
              height="1551.21"
              fill="white"
              transform="translate(-486.152 1060.58) rotate(-60)"
            />
          </clipPath>
          <clipPath id="clip2_13561_18670">
            <rect
              width="775.603"
              height="1551.21"
              fill="white"
              transform="translate(-98.3516 388.891) rotate(-60)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShape3: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 60], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "238.556vh",
        width: "100%",
        zIndex: "-2",
        transformOrigin: "center center",
        pointerEvents: "none",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        viewBox="0 0 1440 729"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.third",
        })}
      >
        <motion.g
          clipPath="url(#clip1_13561_18676)"
          style={{
            y: y,
            rotate: rotate,
          }}
        >
          <g clipPath="url(#clip2_13561_18676)">
            <circle
              cx="1215.23"
              cy="469.384"
              r="380.529"
              transform="rotate(-123.54 1215.23 469.384)"
              strokeWidth="180"
            />
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13561_18676">
            <rect width="1440" height="729" fill="white" />
          </clipPath>
          <clipPath id="clip1_13561_18676">
            <rect
              width="941.058"
              height="941.058"
              fill="white"
              transform="translate(1083.02 1121.55) rotate(-123.54)"
            />
          </clipPath>
          <clipPath id="clip2_13561_18676">
            <rect
              width="470.529"
              height="941.058"
              fill="white"
              transform="translate(823.045 729.363) rotate(-123.54)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShape4: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -20], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, 300);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "319vh",
        width: "100%",
        zIndex: "-2",
        transformOrigin: "center center",
        pointerEvents: "none",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        viewBox="0 0 1440 1675"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.fourth",
        })}
      >
        <motion.g
          clipPath="url(#clip1_13561_18686)"
          style={{
            y: y,
            rotate: rotate,
          }}
        >
          <g clipPath="url(#clip2_13561_18686)">
            <circle
              cx="1041.19"
              cy="591.19"
              r="855.212"
              transform="rotate(124.12 1041.19 591.19)"
              strokeWidth="450"
            />
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13561_18686">
            <rect width="1440" height="1675" fill="white" />
          </clipPath>
          <clipPath id="clip1_13561_18686">
            <rect
              width="2160.42"
              height="2160.42"
              fill="white"
              transform="translate(2541.38 302.832) rotate(124.12)"
            />
          </clipPath>
          <clipPath id="clip2_13561_18686">
            <rect
              width="1080.21"
              height="2160.42"
              fill="white"
              transform="translate(1935.46 1197.11) rotate(124.12)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export const BackgroundShape5: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, 0], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, -300);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "520.222vh",
        width: "100%",
        zIndex: "-2",
        transformOrigin: "center center",
        pointerEvents: "none",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        viewBox="0 0 1440 1362"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.fifth",
        })}
      >
        <motion.g
          clipPath="url(#clip1_13561_18691)"
          style={{
            y: y,
            rotate: rotate,
          }}
        >
          <g clipPath="url(#clip2_13561_18691)">
            <circle
              cx="389.713"
              cy="980.712"
              r="829.743"
              transform="rotate(-67.1058 389.713 980.712)"
              strokeWidth="300"
            />
          </g>
        </motion.g>
        <defs>
          <clipPath id="clip0_13561_18691">
            <rect width="1440" height="1362" fill="white" />
          </clipPath>
          <clipPath id="clip1_13561_18691">
            <rect
              width="1959.49"
              height="1959.49"
              fill="white"
              transform="translate(-894 1502.12) rotate(-67.1058)"
            />
          </clipPath>
          <clipPath id="clip2_13561_18691">
            <rect
              width="979.743"
              height="1959.49"
              fill="white"
              transform="translate(-512.85 599.562) rotate(-67.1058)"
            />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
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
        scale: "1",
        top: "0",
        right: "0",
        width: "100%",
        aspectRatio: "1/1",
        mixBlendMode: "multiply",
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
              strokeWidth="240"
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
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -30], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "100vh",
        width: "100%",
        left: "0",
        mixBlendMode: "multiply",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
      })}
    >
      <svg
        viewBox="0 0 375 885"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          stroke: "web.system.color.mvShape.background.arc.second",
        })}
      >
        <motion.g
          clipPath="url(#clip0_13517_18730)"
          style={{
            y: y,
          }}
        >
          <motion.g
            clipPath="url(#clip1_13517_18730)"
            style={{ rotate: rotate }}
          >
            <g clipPath="url(#clip2_13517_18730)">
              <circle
                cx="83.4606"
                cy="454.461"
                r="421"
                transform="rotate(-15.0819 83.4606 454.461)"
                strokeWidth="48"
              />
            </g>
          </motion.g>
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
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 60], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "230.419vh",
        width: "100%",
        left: "0",
        mixBlendMode: "multiply",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
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
        })}
      >
        <motion.g clipPath="url(#clip0_13517_19200)">
          <motion.g
            clipPath="url(#clip1_13517_19200)"
            style={{ rotate: rotate }}
          >
            <g clipPath="url(#clip2_13517_19200)">
              <circle
                cx="430.848"
                cy="261.1"
                r="198"
                transform="rotate(-132.885 430.848 261.1)"
                strokeWidth="120"
              />
            </g>
          </motion.g>
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
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -20], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "263.547vh",
        width: "100%",
        left: "0",
        mixBlendMode: "multiply",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
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
        })}
      >
        <motion.g clipPath="url(#clip1_13517_19209)" style={{ rotate: rotate }}>
          <g clipPath="url(#clip2_13517_19209)">
            <circle
              cx="820.792"
              cy="521.972"
              r="755.553"
              transform="rotate(124.497 820.792 521.972)"
              strokeWidth="319.57"
            />
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
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, 0], {
      clamp: false,
    }),
    { stiffness: 20, damping: 10 }
  );

  const y = useParallax(scrollYProgress, -50);

  return (
    <motion.div
      className={css({
        position: "absolute",
        top: "384.236vh",
        width: "100%",
        left: "0",
        mixBlendMode: "multiply",
        "& svg": {
          overflow: "visible",
          width: "100%",
        },
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
        })}
      >
        <motion.g clipPath="url(#clip1_13517_19234)" style={{ rotate: rotate }}>
          <g clipPath="url(#clip2_13517_19234)">
            <motion.circle
              cx="-326.14"
              cy="911.86"
              r="817.667"
              transform="rotate(-50.6415 -326.14 911.86)"
              strokeWidth="300"
            />
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
