import { css, cx, sva } from "styled-system/css";
import { cubicBezier, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const shapePositions: {
  size: {
    width: string;
    height: string;
  };
  initial: { top: string; left: string; rotate: string };
  initial_compact: { top: string; left: string; rotate: string };
  animate: { top: string; left: string; rotate: string };
  transition: {
    delay: number;
  };
}[] = [
  {
    size: {
      width: "26.045%",
      height: "26.045%",
    },
    initial: {
      top: "30%",
      left: "90%",
      rotate: "120deg",
    },
    initial_compact: {
      top: "100%",
      left: "0%",
      rotate: "120deg",
    },
    animate: {
      top: "-13.662%",
      left: "19.131%",
      rotate: "0deg",
    },
    transition: {
      delay: 0.29,
    },
  },
  {
    size: {
      width: "22.743%",
      height: "24.979%",
    },
    initial: {
      top: "-25%",
      left: "-25%",
      rotate: "-140deg",
    },
    initial_compact: {
      top: "-100%",
      left: "70%",
      rotate: "-140deg",
    },
    animate: {
      top: "22.188%",
      left: "31.849%",
      rotate: "0deg",
    },
    transition: {
      delay: 0.25,
    },
  },
  {
    size: {
      width: "69.44%",
      height: "69.44%",
    },
    initial: {
      top: "70%",
      left: "-80%",
      rotate: "30deg",
    },
    initial_compact: {
      top: "50%",
      left: "40%",
      rotate: "30deg",
    },
    animate: {
      top: "13.433%",
      left: "11.94%",
      rotate: "0deg",
    },
    transition: {
      delay: 0.12,
    },
  },
  {
    size: {
      width: "45.52%",
      height: "45.52%",
    },
    initial: {
      top: "0%",
      left: "85%",
      rotate: "60deg",
    },
    initial_compact: {
      top: "0%",
      left: "10%",
      rotate: "60deg",
    },
    animate: {
      top: "44.035%",
      left: "62.369%",
      rotate: "0deg",
    },
    transition: {
      delay: 0.15,
    },
  },
  {
    size: {
      width: "13.06%",
      height: "13.06%",
    },
    initial: {
      top: "100%",
      left: "-130%",
      rotate: "-90deg",
    },
    initial_compact: {
      top: "60%",
      left: "0%",
      rotate: "-90deg",
    },
    animate: {
      top: "86.94%",
      left: "0",
      rotate: "0deg",
    },
    transition: {
      delay: 0.1,
    },
  },
  {
    size: {
      width: "24.81%",
      height: "26.87%",
    },
    initial: {
      top: "90%",
      left: "90%",
      rotate: "-80deg",
    },
    initial_compact: {
      top: "0%",
      left: "80%",
      rotate: "-80deg",
    },
    animate: {
      top: "50.776%",
      left: "76.597%",
      rotate: "0deg",
    },
    transition: {
      delay: 0.4,
    },
  },
];

export const Shapes = () => {
  const isExpanded = useMediaQuery({ query: "(min-width: 48rem)" });

  return (
    <div
      className={css({
        position: "relative",
        height: "64vw",
        width: "64vw",
        expanded: {
          height: "37.222vw",
          width: "37.222vw",
          maxH: "543px",
          maxW: "543px",
        },
      })}
    >
      {[Shape1, Shape2, Shape3, Shape4, Shape5, Shape6].map(
        (Component, index) => {
          const styles = shapeDefaultStyles();
          return (
            <motion.div
              key={index}
              className={cx("shape-" + index, styles.shape)}
              style={{
                width: shapePositions[index].size.width,
                height: shapePositions[index].size.height,
              }}
              initial={
                isExpanded
                  ? {
                      top: shapePositions[index].initial.top,
                      left: shapePositions[index].initial.left,
                      rotate: shapePositions[index].initial.rotate,
                    }
                  : {
                      top: shapePositions[index].initial_compact.top,
                      left: shapePositions[index].initial_compact.left,
                      rotate: shapePositions[index].initial_compact.rotate,
                    }
              }
              animate={{
                top: shapePositions[index].animate.top,
                left: shapePositions[index].animate.left,
                rotate: shapePositions[index].animate.rotate,
              }}
              transition={transition({
                delay: shapePositions[index].transition.delay,
              })}
            >
              <Component />
            </motion.div>
          );
        }
      )}
    </div>
  );
};

const shapeIntroAnimationProperties = ({ delay = 0 }) => ({
  initial: {
    opacity: 0,
    y: 20,
    rotate: 70,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotate: 0,
  },
  transition: {
    duration: 0.6,
    delay: 1 + delay * 2,
    rotate: {
      duration: 1 + delay * 2 + 0.6 + 1.6,
    },
  },
});

const shapeDefaultStyles = sva({
  slots: ["shape"],
  base: {
    shape: {
      position: "absolute",
      zIndex: "1",
      transformOrigin: "center center",
      pointerEvents: "none",
      mixBlendMode: "normal",
      width: "100%",
      height: "100%",
    },
  },
});

const transition = ({ delay = 0 }) => {
  return {
    duration: 0.8,
    delay: 2.6 + delay,
    // delay: 99999999,
    ease: cubicBezier(0.84, 0, 0.16, 1),
  };
};

const Shape1 = () => {
  const styles = shapeDefaultStyles();
  return (
    <motion.svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        css({
          fill: "web.system.color.mvShape.foreground.arc.extraBold",
        }),
        styles.shape
      )}
      {...shapeIntroAnimationProperties({
        delay: shapePositions[0].transition.delay,
      })}
    >
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.8694 147.941C72.7484 150.072 81.96 150.432 90.9784 149.003C99.9968 147.574 108.645 144.382 116.43 139.61C124.215 134.839 130.984 128.58 136.35 121.193C141.717 113.805 145.575 105.433 147.706 96.5536C149.836 87.6747 150.197 78.4631 148.768 69.4447L99.3845 77.2716C99.786 79.8049 99.6846 82.3924 99.0861 84.8865C98.4876 87.3806 97.4037 89.7324 95.8964 91.8076C94.389 93.8828 92.4876 95.6407 90.3008 96.9811C88.1141 98.3215 85.6847 99.218 83.1514 99.6195C80.6182 100.021 78.0306 99.9196 75.5365 99.3211C73.0425 98.7227 70.6907 97.6388 68.6155 96.1314C66.5403 94.624 64.7823 92.7227 63.442 90.5359C62.1016 88.3491 61.205 85.9197 60.8035 83.3865L11.42 91.2134C12.8493 100.232 16.041 108.88 20.8127 116.665C25.5845 124.45 31.8429 131.219 39.2305 136.585C46.6182 141.952 54.9905 145.81 63.8694 147.941Z"
      />
    </motion.svg>
  );
};

const Shape2 = () => {
  const styles = shapeDefaultStyles();
  return (
    <motion.svg
      viewBox="0 0 123 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        css({
          fill: "web.system.color.mvShape.foreground.arc.normal",
        }),
        styles.shape
      )}
      {...shapeIntroAnimationProperties({
        delay: shapePositions[1].transition.delay,
      })}
    >
      <path d="M114.421 104.216C108.966 113.621 101.567 121.081 92.2547 126.581C82.9265 132.081 72.7287 134.823 61.6614 134.823C50.594 134.823 40.3962 132.065 31.068 126.581C21.7398 121.081 14.3405 113.621 8.88586 104.216C3.43123 94.8105 0.711823 84.5285 0.711823 73.3697H15.4156C15.4156 81.8185 17.5026 89.6296 21.7082 96.8031C25.898 103.977 31.5423 109.636 38.6571 113.78C45.7718 117.925 53.4399 119.997 61.6614 119.997C69.8828 119.997 77.7881 117.877 84.9028 113.653C92.0176 109.428 97.6303 103.769 101.741 96.6756C105.852 89.5818 107.907 81.8185 107.907 73.3697H122.611C122.611 84.5285 119.892 94.8105 114.437 104.216H114.421ZM44.2382 64.8891C41.9457 59.3894 40.7915 53.4593 40.7915 47.0829C40.7915 38.6341 42.8469 30.9027 46.9576 23.8886C51.0683 16.8745 56.602 11.2951 63.5586 7.15045C70.5153 3.00577 78.1834 0.933426 86.5629 0.933426C92.8872 0.933426 98.7845 2.09713 104.223 4.39264C109.678 6.7041 114.548 10.0198 118.816 14.3239L108.381 24.8451C105.377 21.8162 102.105 19.5526 98.5473 18.0382C94.99 16.5238 91.0848 15.7586 86.8159 15.7586C81.1241 15.7586 75.8592 17.1614 71.037 19.9352C66.2148 22.7249 62.4203 26.5507 59.6534 31.4128C56.8866 36.2748 55.5111 41.5035 55.5111 47.0829C55.5111 55.5316 58.5151 62.8645 64.5231 69.0816L54.0881 79.6027C49.8193 75.2986 46.5307 70.4047 44.254 64.905L44.2382 64.8891Z" />
    </motion.svg>
  );
};

const Shape3 = () => {
  const styles = shapeDefaultStyles();
  return (
    <motion.svg
      viewBox="0 0 373 373"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        css({
          fill: "web.system.color.mvShape.foreground.arc.bold",
        }),
        styles.shape
      )}
      {...shapeIntroAnimationProperties({
        delay: shapePositions[2].transition.delay,
      })}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M257.327 358.136C279.907 348.783 300.423 335.074 317.705 317.793C334.986 300.511 348.695 279.995 358.047 257.415C367.4 234.836 372.214 210.635 372.214 186.195C372.214 161.755 367.4 137.555 358.048 114.975C348.695 92.3955 334.986 71.8792 317.705 54.5976L282.349 89.9529C294.988 102.592 305.014 117.596 311.854 134.109C318.694 150.622 322.214 168.321 322.214 186.195C322.214 204.069 318.694 221.768 311.854 238.281C305.013 254.794 294.988 269.799 282.349 282.437C269.711 295.076 254.706 305.102 238.193 311.942C221.68 318.782 203.981 322.302 186.107 322.302C168.233 322.302 150.534 318.782 134.021 311.942C117.508 305.102 102.504 295.076 89.8648 282.437L54.5095 317.793C71.7911 335.074 92.3074 348.783 114.887 358.136C137.466 367.488 161.667 372.302 186.107 372.302C210.547 372.302 234.748 367.488 257.327 358.136Z"
      />
    </motion.svg>
  );
};

const Shape4 = () => {
  const styles = shapeDefaultStyles();
  return (
    <motion.svg
      viewBox="0 0 248 248"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        css({
          stroke: "web.system.color.mvShape.foreground.arc.thin",
        }),
        styles.shape
      )}
      {...shapeIntroAnimationProperties({
        delay: shapePositions[3].transition.delay,
      })}
    >
      <path
        d="M211.558 38.7592C188.679 15.8804 157.649 3.02731 125.293 3.02731C92.9381 3.0273 61.9079 15.8804 39.0292 38.7591C16.1505 61.6379 3.29734 92.668 3.29733 125.023C3.29733 157.379 16.1505 188.409 39.0292 211.288"
        strokeWidth="5"
      />
    </motion.svg>
  );
};

const Shape5 = () => {
  const styles = shapeDefaultStyles();
  return (
    <motion.svg
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        css({
          fill: "web.system.color.mvShape.foreground.rectangle.square",
        }),
        styles.shape
      )}
      {...shapeIntroAnimationProperties({
        delay: shapePositions[4].transition.delay,
      })}
    >
      <path
        opacity="0.6"
        d="M69.7323 29.4484L29.1845 0.263702L-0.00012076 40.8115L40.5477 69.9961L69.7323 29.4484Z"
      />
    </motion.svg>
  );
};

const Shape6 = () => {
  const styles = shapeDefaultStyles();
  return (
    <motion.svg
      viewBox="0 0 134 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        css({
          fill: "web.system.color.mvShape.foreground.rectangle.oblong",
        }),
        styles.shape
      )}
      {...shapeIntroAnimationProperties({
        delay: shapePositions[5].transition.delay,
      })}
    >
      <path
        opacity="0.6"
        d="M65.3658 0.584552L1.2179 44.845L69.311 143.534L133.459 99.2738L65.3658 0.584552Z"
        fill="#FCEBEA"
      />
    </motion.svg>
  );
};
