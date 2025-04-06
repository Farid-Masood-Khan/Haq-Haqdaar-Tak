import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HoverCardAnimationProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: "float" | "glow" | "scale" | "tilt" | "shine";
  bgColor?: string;
}

export default function HoverCardAnimation({
  children,
  className = "",
  hoverEffect = "float",
  bgColor = "rgba(255, 255, 255, 0.1)",
}: HoverCardAnimationProps) {
  const getAnimationProps = () => {
    switch (hoverEffect) {
      case "float":
        return {
          whileHover: { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
          transition: { type: "spring", stiffness: 300, damping: 20 },
        };
      
      case "glow":
        return {
          whileHover: { 
            boxShadow: "0 0 20px 5px rgba(44, 43, 173, 0.5)" 
          },
          transition: { duration: 0.3 },
        };
      
      case "scale":
        return {
          whileHover: { scale: 1.05 },
          transition: { type: "spring", stiffness: 400, damping: 20 },
        };
      
      case "tilt":
        return {
          whileHover: { rotateX: 10, rotateY: 10, scale: 1.02 },
          transition: { type: "spring", stiffness: 400, damping: 20 },
        };
      
      case "shine":
        return {
          initial: { backgroundPosition: "200% center" },
          whileHover: { backgroundPosition: "-200% center" },
          transition: { duration: 1.5 },
          style: {
            backgroundSize: "200% auto",
            backgroundImage: `linear-gradient(90deg, ${bgColor} 0%, rgba(44, 43, 173, 0.2) 30%, ${bgColor} 60%)`,
          },
        };
      
      default:
        return {
          whileHover: { y: -10 },
          transition: { type: "spring", stiffness: 300, damping: 20 },
        };
    }
  };

  return (
    <motion.div
      className={`transition-all duration-300 ${className}`}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
}