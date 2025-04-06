import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormStepAnimationProps {
  children: ReactNode;
  isActive: boolean;
  direction?: "left" | "right" | "up" | "down";
}

export default function FormStepAnimation({
  children,
  isActive,
  direction = "right",
}: FormStepAnimationProps) {
  const variants = {
    enter: {
      x: direction === "right" ? 100 : direction === "left" ? -100 : 0,
      y: direction === "down" ? 100 : direction === "up" ? -100 : 0,
      opacity: 0,
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: {
      x: direction === "right" ? -100 : direction === "left" ? 100 : 0,
      y: direction === "down" ? -100 : direction === "up" ? 100 : 0,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}