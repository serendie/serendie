import { motion } from "framer-motion";

export const AnimationFadeIn: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        scale: "1.2",
        zIndex: "1",
        transformOrigin: "center center",
        pointerEvents: "none",
        backgroundColor: "black",
      }}
    ></motion.div>
  );
};
