import { motion } from "framer-motion";

export const NavbarWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 2.6,
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  );
};
