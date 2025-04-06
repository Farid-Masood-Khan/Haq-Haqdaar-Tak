import { useState } from "react";
import { motion } from "framer-motion";

interface ImageHoverAnimationProps {
  src: string;
  alt: string;
  className?: string;
  hoverEffect?: "zoom" | "reveal" | "overlay" | "rotate" | "tilt" | "filter";
  overlayContent?: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

export default function ImageHoverAnimation({
  src,
  alt,
  className = "",
  hoverEffect = "zoom",
  overlayContent,
  width = "100%",
  height = "auto",
}: ImageHoverAnimationProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getHoverEffectStyles = () => {
    switch (hoverEffect) {
      case "zoom":
        return {
          container: "overflow-hidden",
          image: {
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.3 },
          },
          overlay: {},
        };
      
      case "reveal":
        return {
          container: "overflow-hidden",
          image: {},
          overlay: {
            y: isHovered ? 0 : "100%",
            transition: { duration: 0.3 },
          },
        };
      
      case "overlay":
        return {
          container: "overflow-hidden",
          image: {
            scale: isHovered ? 1.05 : 1,
            transition: { duration: 0.3 },
          },
          overlay: {
            opacity: isHovered ? 1 : 0,
            transition: { duration: 0.3 },
          },
        };
      
      case "rotate":
        return {
          container: "overflow-hidden",
          image: {
            rotate: isHovered ? 5 : 0,
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.3 },
          },
          overlay: {
            opacity: isHovered ? 1 : 0,
            transition: { duration: 0.3 },
          },
        };
      
      case "tilt":
        return {
          container: "overflow-hidden transform-gpu",
          image: {
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? -5 : 0,
            scale: isHovered ? 1.05 : 1,
            transition: { duration: 0.3 },
          },
          overlay: {
            opacity: isHovered ? 1 : 0,
            transition: { duration: 0.3 },
          },
        };
      
      case "filter":
        return {
          container: "overflow-hidden",
          image: {
            filter: isHovered ? "brightness(0.7) contrast(1.2)" : "brightness(1) contrast(1)",
            scale: isHovered ? 1.05 : 1,
            transition: { duration: 0.3 },
          },
          overlay: {
            opacity: isHovered ? 1 : 0,
            transition: { duration: 0.3 },
          },
        };
      
      default:
        return {
          container: "overflow-hidden",
          image: {},
          overlay: {},
        };
    }
  };

  const { container, image, overlay } = getHoverEffectStyles();

  return (
    <motion.div
      className={`relative ${container} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ width, height }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={image}
      />
      
      {overlayContent && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-4 text-white"
          animate={overlay}
        >
          {overlayContent}
        </motion.div>
      )}
    </motion.div>
  );
}