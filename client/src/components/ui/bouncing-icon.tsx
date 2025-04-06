import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BouncingIconProps {
  icon: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
  animate?: "bounce" | "pulse" | "shake" | "spin" | "wiggle";
  delay?: number;
  duration?: number;
  hover?: boolean;
  onClick?: () => void;
}

export default function BouncingIcon({
  icon,
  size = "md",
  color = "#2c2bad",
  className = "",
  animate = "bounce",
  delay = 0,
  duration = 1,
  hover = false,
  onClick
}: BouncingIconProps) {
  const getSizeClass = (): string => {
    switch (size) {
      case "xs": return "w-4 h-4";
      case "sm": return "w-6 h-6";
      case "md": return "w-8 h-8";
      case "lg": return "w-12 h-12";
      case "xl": return "w-16 h-16";
      default: return "w-8 h-8";
    }
  };

  // Use switch statement to directly apply the animation
  let animationElement;
  switch (animate) {
    case "bounce":
      animationElement = (
        <motion.div
          className={`${getSizeClass()} ${className}`}
          style={{ color }}
          animate={hover ? undefined : { y: [0, -10, 0] }}
          whileHover={hover ? { y: [0, -10, 0] } : undefined}
          transition={{ 
            duration, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
            delay 
          }}
          onClick={onClick}
        >
          {icon}
        </motion.div>
      );
      break;
    
    case "pulse":
      animationElement = (
        <motion.div
          className={`${getSizeClass()} ${className}`}
          style={{ color }}
          animate={hover ? undefined : { scale: [1, 1.1, 1] }}
          whileHover={hover ? { scale: [1, 1.1, 1] } : undefined}
          transition={{ 
            duration, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
            delay 
          }}
          onClick={onClick}
        >
          {icon}
        </motion.div>
      );
      break;
    
    case "shake":
      animationElement = (
        <motion.div
          className={`${getSizeClass()} ${className}`}
          style={{ color }}
          animate={hover ? undefined : { x: [0, -5, 5, -5, 5, 0] }}
          whileHover={hover ? { x: [0, -5, 5, -5, 5, 0] } : undefined}
          transition={{ 
            duration: duration / 2, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
            delay 
          }}
          onClick={onClick}
        >
          {icon}
        </motion.div>
      );
      break;
    
    case "spin":
      animationElement = (
        <motion.div
          className={`${getSizeClass()} ${className}`}
          style={{ color }}
          animate={hover ? undefined : { rotate: 360 }}
          whileHover={hover ? { rotate: 360 } : undefined}
          transition={{ 
            duration: duration * 2, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "linear", 
            delay 
          }}
          onClick={onClick}
        >
          {icon}
        </motion.div>
      );
      break;
    
    case "wiggle":
      animationElement = (
        <motion.div
          className={`${getSizeClass()} ${className}`}
          style={{ color }}
          animate={hover ? undefined : { rotate: [0, 15, 0, -15, 0] }}
          whileHover={hover ? { rotate: [0, 15, 0, -15, 0] } : undefined}
          transition={{ 
            duration, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
            delay 
          }}
          onClick={onClick}
        >
          {icon}
        </motion.div>
      );
      break;
    
    default:
      animationElement = (
        <motion.div
          className={`${getSizeClass()} ${className}`}
          style={{ color }}
          whileHover={{ scale: 1.1 }}
          onClick={onClick}
        >
          {icon}
        </motion.div>
      );
  }

  return animationElement;
}