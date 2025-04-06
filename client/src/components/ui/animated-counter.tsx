import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  decimalPlaces?: number;
  className?: string;
  onComplete?: () => void;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  decimalPlaces = 0,
  className = "",
  onComplete
}: AnimatedCounterProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, amount: 0.1 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    duration: duration * 1000, 
    bounce: 0.1,
  });
  const [displayValue, setDisplayValue] = useState(0);

  // Force animation to start when component mounts
  useEffect(() => {
    // Set a timeout to trigger animation
    const timeoutId = setTimeout(() => {
      setIsAnimating(true);
      motionValue.set(value);
    }, delay * 1000);
    
    return () => clearTimeout(timeoutId);
  }, [value, motionValue, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      // Calculate the display value based on decimal places
      const factor = Math.pow(10, decimalPlaces);
      const rounded = Math.round(latest * factor) / factor;
      setDisplayValue(rounded);
      
      // Call onComplete when animation is done
      if (Math.abs(latest - value) < 0.1 && onComplete) {
        onComplete();
      }
    });
    
    return unsubscribe;
  }, [springValue, value, decimalPlaces, onComplete]);

  // Format the number with commas and decimal places
  const formattedValue = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });

  return (
    <motion.div
      ref={countRef}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {prefix}{formattedValue}{suffix}
    </motion.div>
  );
}