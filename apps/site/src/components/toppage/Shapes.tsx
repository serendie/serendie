import { motion } from "framer-motion";
import { cubicBezier } from "framer-motion/dom";
import { useEffect, useState } from "react";

const transition = () => ({
  duration: 1,
  delay: Math.floor(Math.random() * 6) / 10 + -0.3,
  ease: cubicBezier(0.84, 0, 0.16, 1),
});

const shapeMotionPropsRepeatDelay = () => {
  // 3.0-5.9秒のランダムな値
  return Math.floor(Math.random() * 3) + 5;
};

const shapeMotionPropsRotate = () => {
  // 5-10度のランダムな値
  return Math.floor(Math.random() * 5) + 1;
};

const shapeMotionProps = () => ({
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, shapeMotionPropsRotate(), -shapeMotionPropsRotate(), 0],
  },
  transition: {
    repeat: Infinity,
    repeatDelay: shapeMotionPropsRepeatDelay(),
    ease: cubicBezier(0.84, 0, 0.16, 1),
    duration: 1,
  },
});

export const Shapes = () => {
  const [state, setState] = useState<"in" | "animate">("in");

  useEffect(() => {
    // 2s後にアニメーションを開始
    const timeoutId = setTimeout(() => {
      setState("animate");
    }, 2300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      {[Shapes1, Shapes2, Shapes3, Shapes4, Shapes5, Shapes6].map(
        (Shape, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.7 + 0.15 * index,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              y: {
                duration: 0.8,
                delay: 0.7 + 0.15 * index,
              },
            }}
          >
            <Shape state={state} />
          </motion.div>
        )
      )}
    </div>
  );
};

export const Shapes1: React.FC<{ state: "in" | "animate" }> = ({ state }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        scale: "1.2",
        zIndex: "-1",
        transformOrigin: "center center",
      }}
      initial={{
        top: "0",
        left: "50%",
        rotate: 100,
      }}
      animate={state}
      variants={{
        in: {
          x: ["-20px", "20px", "20px", "-20px"],
          y: ["-20px", "20px", "20px", "-20px"],
          rotate: [0, 360],
          transition: {
            x: {
              duration: 5,
              delay: shapeMotionPropsRepeatDelay(),
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            y: {
              duration: 5,
              delay: shapeMotionPropsRepeatDelay(),
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            rotate: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          },
        },
        animate: {
          top: "calc(50vh - 67.5px)",
          left: "70%",
          rotate: 0,
        },
      }}
      transition={transition()}
    >
      <motion.svg
        width="123"
        height="135"
        viewBox="0 0 123 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transformOrigin: "center center",
        }}
        {...shapeMotionProps()}
      >
        <path
          d="M113.923 103.434C108.463 112.847 101.058 120.314 91.7378 125.818C82.4019 131.322 72.1957 134.066 61.1191 134.066C50.0426 134.066 39.8364 131.306 30.5005 125.818C21.1645 120.314 13.7591 112.847 8.29995 103.434C2.8408 94.0212 0.119141 83.7307 0.119141 72.5627H14.8351C14.8351 81.0184 16.9238 88.836 21.1329 96.0155C25.3261 103.195 30.9752 108.859 38.0958 113.007C45.2164 117.155 52.8909 119.229 61.1191 119.229C69.3474 119.229 77.2592 117.107 84.3799 112.879C91.5005 108.651 97.1179 102.987 101.232 95.8878C105.346 88.7882 107.403 81.0184 107.403 72.5627H122.119C122.119 83.7307 119.397 94.0212 113.938 103.434H113.923ZM43.6815 64.075C41.3871 58.5708 40.232 52.6358 40.232 46.2541C40.232 37.7983 42.2891 30.0605 46.4032 23.0406C50.5173 16.0207 56.0556 10.4367 63.018 6.28858C69.9804 2.14046 77.6548 0.0664062 86.0413 0.0664062C92.3708 0.0664062 98.273 1.23107 103.716 3.52849C109.175 5.84186 114.049 9.16035 118.321 13.468L107.878 23.9978C104.871 20.9665 101.596 18.701 98.0356 17.1854C94.4753 15.6697 90.5669 14.9039 86.2945 14.9039C80.598 14.9039 75.3287 16.3079 70.5025 19.0839C65.6763 21.8759 61.8787 25.7049 59.1095 30.571C56.3404 35.437 54.9638 40.6701 54.9638 46.2541C54.9638 54.7098 57.9703 62.0488 63.9832 68.271L53.5396 78.8008C49.2673 74.4931 45.976 69.5952 43.6974 64.0909L43.6815 64.075Z"
          fill="#EB3D1C"
        />
      </motion.svg>
    </motion.div>
  );
};

export const Shapes2: React.FC<{ state: "in" | "animate" }> = ({ state }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: "123px",
        height: "135px",
        scale: "1.2",
        zIndex: "-1",
        transformOrigin: "center center",
      }}
      initial={{
        top: "80vh",
        left: "90%",
        rotate: 100,
      }}
      animate={state}
      variants={{
        in: {
          rotate: [0, 30, 0],
          x: ["-12px", "12px", "12px", "-12px"],
          y: ["-12px", "12px", "12px", "-12px"],
          transition: {
            x: {
              duration: 7,
              delay: 0.5,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            y: {
              duration: 7,
              delay: 0.5,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            rotate: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          },
        },
        animate: {
          top: "calc(35vh - 67.5px)",
          left: "65%",
          rotate: 0,
        },
      }}
      transition={transition()}
    >
      <motion.svg
        width="139"
        height="81"
        viewBox="0 0 139 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...shapeMotionProps()}
      >
        <path
          d="M25.0733 18.1831C26.0046 23.9613 28.0648 29.4995 31.1365 34.4815C34.2081 39.4635 38.2309 43.7916 42.9752 47.2189C47.7196 50.6462 53.0925 53.1054 58.7872 54.4563C64.482 55.8071 70.387 56.023 76.1652 55.0917C81.9434 54.1604 87.4816 52.1001 92.4636 49.0285C97.4456 45.9569 101.774 41.9341 105.201 37.1897C108.628 32.4454 111.088 27.0725 112.438 21.3777C113.789 15.683 114.005 9.77791 113.074 3.99971"
          stroke="#0E5651"
          strokeWidth="50"
        />
      </motion.svg>
    </motion.div>
  );
};

export const Shapes3: React.FC<{ state: "in" | "animate" }> = ({ state }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: "123px",
        height: "144px",
        zIndex: "-1",
        transformOrigin: "center center",
      }}
      initial={{
        top: "10%",
        left: "95%",
        rotate: 100,
      }}
      animate={state}
      variants={{
        in: {
          rotate: [0, 30, 0],
          x: ["-12px", "12px", "12px", "-12px"],
          y: ["-12px", "12px", "12px", "-12px"],
          transition: {
            x: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.1,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            y: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.1,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            rotate: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          },
        },
        animate: {
          top: "55vh",
          left: "80%",
          rotate: -34.6,
        },
      }}
      transition={transition()}
    >
      <motion.svg
        width="123"
        height="144"
        viewBox="0 0 123 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...shapeMotionProps()}
      >
        <rect opacity="0.5" y="44.2969" width="78" height="120" fill="white" />
      </motion.svg>
    </motion.div>
  );
};

export const Shapes4: React.FC<{ state: "in" | "animate" }> = ({ state }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: "-1",
        transformOrigin: "center center",
      }}
      initial={{
        top: "80vh",
        left: "30%",
        rotate: 100,
      }}
      animate={state}
      variants={{
        in: {
          rotate: [0, 60, 0],
          y: ["-12px", "12px", "12px", "-12px"],
          transition: {
            rotate: {
              duration: 10,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            y: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.1,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
          },
        },
        animate: {
          top: "50vh",
          left: "70%",
          rotate: 0,
        },
      }}
      transition={transition()}
    >
      <motion.svg
        width="319"
        height="319"
        viewBox="0 0 319 319"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...shapeMotionProps()}
      >
        <path
          d="M17.9995 246.651C32.9721 261.623 50.7471 273.5 70.3097 281.603C89.8722 289.706 110.839 293.877 132.014 293.877C153.188 293.877 174.155 289.706 193.718 281.603C213.28 273.5 231.055 261.623 246.028 246.651C261 231.678 272.877 213.903 280.98 194.341C289.083 174.778 293.254 153.811 293.254 132.637C293.254 111.462 289.083 90.4953 280.98 70.9327C272.877 51.3701 261 33.5951 246.028 18.6226"
          stroke="#ECB100"
          strokeWidth="50"
        />
      </motion.svg>
    </motion.div>
  );
};

export const Shapes5: React.FC<{ state: "in" | "animate" }> = ({ state }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: "-1",
        transformOrigin: "center center",
      }}
      initial={{
        top: "30vh",
        left: "90%",
        rotate: 23.2,
      }}
      animate={state}
      variants={{
        in: {
          x: ["-12px", "12px", "12px", "-12px"],
          y: ["12px", "-12px", "-12px", "12px"],
          rotate: [0, 20, 0],
          transition: {
            x: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.5,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            y: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.5,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            rotate: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          },
        },
        animate: {
          top: "55vh",
          left: "80%",
          rotate: 0,
        },
      }}
      transition={transition()}
    >
      <motion.svg
        width="213"
        height="213"
        viewBox="0 0 213 213"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...shapeMotionProps()}
      >
        <path
          d="M211.007 37.9885C188.109 15.0909 157.054 2.22712 124.671 2.22712C92.2892 2.22712 61.2333 15.0909 38.3357 37.9885C15.438 60.8862 2.57428 91.942 2.57427 124.324C2.57427 156.706 15.438 187.762 38.3357 210.66"
          stroke="white"
          strokeWidth="4"
        />
      </motion.svg>
    </motion.div>
  );
};

export const Shapes6: React.FC<{ state: "in" | "animate" }> = ({ state }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: "-1",
        transformOrigin: "center center",
      }}
      initial={{
        top: "70vh",
        left: "5%",
        rotate: 23.2,
      }}
      animate={state}
      variants={{
        in: {
          x: ["-12px", "12px", "12px", "-12px"],
          y: ["12px", "-12px", "-12px", "12px"],
          rotate: [0, 20, 0],
          transition: {
            x: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.5,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            y: {
              duration: 7,
              delay: shapeMotionPropsRotate() * 0.5,
              ease: cubicBezier(0.84, 0, 0.16, 1),
              repeat: Infinity,
            },
            rotate: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            },
          },
        },
        animate: {
          top: "75vh",
          left: "60%",
          rotate: 0,
        },
      }}
      transition={transition()}
    >
      <motion.svg
        width="70"
        height="71"
        viewBox="0 0 70 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...shapeMotionProps()}
      >
        <rect
          opacity="0.4"
          x="29.209"
          y="0.652344"
          width="50"
          height="50"
          transform="rotate(35.7448 29.209 0.652344)"
          fill="#D1EDDE"
        />
      </motion.svg>
    </motion.div>
  );
};
