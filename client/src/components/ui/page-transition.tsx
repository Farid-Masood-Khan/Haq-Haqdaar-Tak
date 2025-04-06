import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  mode?: "fade" | "slide" | "scale" | "clip" | "flip" | "none";
  duration?: number;
}

export default function PageTransition({
  children,
  className = "",
  mode = "fade",
  duration = 0.5,
}: PageTransitionProps) {
  const [location] = useLocation();

  const getTransitionVariants = () => {
    switch (mode) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration },
        };
      
      case "slide":
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 },
          transition: { type: "spring", stiffness: 260, damping: 20 },
        };
      
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
          transition: { duration },
        };
      
      case "clip":
        return {
          initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          exit: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          transition: { duration },
        };
      
      case "flip":
        return {
          initial: { opacity: 0, rotateX: 90 },
          animate: { opacity: 1, rotateX: 0 },
          exit: { opacity: 0, rotateX: -90 },
          transition: { duration },
        };
      
      case "none":
        return {
          initial: {},
          animate: {},
          exit: {},
        };
      
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration },
        };
    }
  };

  const variants = getTransitionVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
        className={`min-h-screen ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}