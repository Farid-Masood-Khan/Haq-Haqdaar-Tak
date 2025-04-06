import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CursorAnimation() {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Don't render the cursor on mobile devices
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  if (isMobile) return null;

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="cursor-dot-outline pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[rgba(60,60,185)] z-[9999]"
            variants={variants}
            animate={{
              ...variants.default,
              opacity: 1,
              scale: 1
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5
            }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
          />
          
          {/* Secondary cursor (smaller dot) */}
          <motion.div
            className="cursor-dot pointer-events-none fixed top-0 left-0 w-3 h-3 bg-[rgba(60,60,185)] rounded-full z-[9999]"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              opacity: 1,
              scale: 1
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 25
            }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}