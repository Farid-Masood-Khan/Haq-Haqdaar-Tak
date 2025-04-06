import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface AnimatedGradientBackgroundProps {
  className?: string;
  colors?: string[];
  speed?: number;
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "diagonal";
  blur?: number;
  children?: React.ReactNode;
}

export default function AnimatedGradientBackground({
  className = "",
  colors = ["#2c2bad", "#4a47c9", "#6665d7", "#8784e5", "#a9a7f3"],
  speed = 20,
  direction = "left-to-right",
  blur = 60,
  children
}: AnimatedGradientBackgroundProps) {
  const [gradientSize, setGradientSize] = useState({ width: 0, height: 0 });
  
  // Determine gradient size based on direction to ensure full coverage during animation
  useEffect(() => {
    let width = 100;
    let height = 100;
    
    if (direction === "left-to-right" || direction === "right-to-left") {
      width = 200; // 200% width to account for full animation cycle
    } else if (direction === "top-to-bottom" || direction === "bottom-to-top") {
      height = 200; // 200% height to account for full animation cycle
    } else if (direction === "diagonal") {
      width = 200;
      height = 200;
    }
    
    setGradientSize({ width, height });
  }, [direction]);

  // Create gradient
  const createGradient = () => {
    const colorStops = colors.map((color, index) => {
      const percentage = (index / (colors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    }).join(", ");
    
    switch (direction) {
      case "left-to-right":
        return `linear-gradient(to right, ${colorStops})`;
      case "right-to-left":
        return `linear-gradient(to left, ${colorStops})`;
      case "top-to-bottom":
        return `linear-gradient(to bottom, ${colorStops})`;
      case "bottom-to-top":
        return `linear-gradient(to top, ${colorStops})`;
      case "diagonal":
        return `linear-gradient(to bottom right, ${colorStops})`;
      default:
        return `linear-gradient(to right, ${colorStops})`;
    }
  };

  // Set animation values
  const getAnimationProps = () => {
    switch (direction) {
      case "left-to-right":
        return {
          x: ["0%", "-100%"]
        };
      case "right-to-left":
        return {
          x: ["0%", "100%"]
        };
      case "top-to-bottom":
        return {
          y: ["0%", "-100%"]
        };
      case "bottom-to-top":
        return {
          y: ["0%", "100%"]
        };
      case "diagonal":
        return {
          x: ["0%", "-100%"],
          y: ["0%", "-100%"]
        };
      default:
        return {
          x: ["0%", "-100%"]
        };
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          width: `${gradientSize.width}%`,
          height: `${gradientSize.height}%`,
          background: createGradient(),
          filter: `blur(${blur}px)`,
        }}
        animate={getAnimationProps()}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}