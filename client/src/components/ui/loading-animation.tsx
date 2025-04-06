import { motion } from "framer-motion";

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
  type?: "spinner" | "dots" | "pulse";
}

export default function LoadingAnimation({
  size = "md",
  color = "#2c2bad",
  className = "",
  type = "spinner"
}: LoadingAnimationProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "w-8 h-8";
      case "md": return "w-12 h-12";
      case "lg": return "w-16 h-16";
      case "xl": return "w-24 h-24";
      default: return "w-12 h-12";
    }
  };

  const sizeClass = getSizeClass();

  const renderLoadingAnimation = () => {
    switch (type) {
      case "spinner":
        return (
          <div className={`${sizeClass} ${className}`}>
            <motion.div
              className="w-full h-full rounded-full border-4 border-gray-200"
              style={{ borderTopColor: color }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        );
      
      case "dots":
        return (
          <div className={`flex space-x-2 ${className}`}>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`rounded-full bg-current`}
                style={{ 
                  backgroundColor: color,
                  width: size === "sm" ? "8px" : size === "md" ? "12px" : size === "lg" ? "16px" : "20px",
                  height: size === "sm" ? "8px" : size === "md" ? "12px" : size === "lg" ? "16px" : "20px",
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );
      
      case "pulse":
        return (
          <div className={`${sizeClass} ${className} relative`}>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.3, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            <div 
              className="absolute inset-3 rounded-full" 
              style={{ backgroundColor: color }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderLoadingAnimation()}
    </div>
  );
}