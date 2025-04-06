import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  animation?: "pulse" | "bounce" | "shine" | "ripple" | "scale" | "shake";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  animation = "scale",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const baseClasses = getBaseClasses(variant, size);
  
  const getAnimationProps = () => {
    switch (animation) {
      case "pulse":
        return {
          whileHover: { 
            scale: 1.05,
            boxShadow: "0 0 8px rgba(44, 43, 173, 0.5)"
          },
          whileTap: { scale: 0.95 },
          transition: { duration: 0.2 }
        };
      
      case "bounce":
        return {
          whileHover: { y: -5 },
          whileTap: { y: 0, scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 10 }
        };
      
      case "shine":
        return {
          initial: { backgroundPosition: "-100% 100%" },
          whileHover: { backgroundPosition: "200% 100%" },
          transition: { duration: 1.5 },
          style: {
            backgroundSize: "200% 100%",
            backgroundImage: variant === "gradient" 
              ? "linear-gradient(90deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 75%)"
              : undefined,
          }
        };
      
      case "ripple":
        // Ripple effect would need a more complex implementation with pseudo-elements
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.2 }
        };
      
      case "scale":
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.97 },
          transition: { duration: 0.2 }
        };
      
      case "shake":
        return {
          whileHover: { x: [0, -2, 4, -6, 6, -4, 2, 0] },
          transition: { duration: 0.7 }
        };
      
      default:
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
        };
    }
  };

  return (
    <motion.button
      type={type}
      className={cn(baseClasses, className)}
      onClick={onClick}
      disabled={disabled}
      {...getAnimationProps()}
    >
      {children}
    </motion.button>
  );
}

function getBaseClasses(variant: string, size: string): string {
  let baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  
  // Size styles
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10",
  };
  
  // Variant styles
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    link: "text-primary underline-offset-4 hover:underline",
    gradient: "bg-gradient-to-r from-primary to-[#4a47c9] text-white border-0 hover:from-[#4a47c9] hover:to-primary",
  };
  
  // Disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed";
  
  return cn(
    baseStyles,
    sizeStyles[size as keyof typeof sizeStyles],
    variantStyles[variant as keyof typeof variantStyles]
  );
}