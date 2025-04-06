import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type TextAnimationType = "wave" | "typing" | "highlight" | "gradient" | "reveal";

interface TextAnimationProps {
  text: string;
  type?: TextAnimationType;
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
}

export default function TextAnimation({
  text,
  type = "wave",
  className = "",
  color = "#2c2bad",
  delay = 0,
  duration = 0.05,
  triggerOnce = true,
}: TextAnimationProps) {
  const controls = useAnimation();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerOnce || !played) {
        controls.start("visible");
        if (triggerOnce) {
          setPlayed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, played, triggerOnce]);

  const renderWaveAnimation = () => {
    return (
      <motion.span className={`inline-block ${className}`} initial="hidden" animate={controls}>
        {text.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: delay + index * duration,
                  duration: 0.4,
                },
              },
            }}
            className="inline-block"
            style={{ color: typeof color === "string" ? color : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  const renderTypingAnimation = () => {
    return (
      <motion.span 
        className={`inline-block relative ${className}`}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
      >
        <motion.span
          variants={{
            hidden: { width: "0%" },
            visible: {
              width: "100%",
              transition: {
                duration: text.length * 0.1,
                ease: "easeInOut",
                delay: delay,
              },
            },
          }}
          className="whitespace-nowrap overflow-hidden inline-block"
          style={{ color: typeof color === "string" ? color : undefined }}
        >
          {text}
        </motion.span>
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [0, 1, 0],
              transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 0.8,
                repeatDelay: 0.2,
                delay: delay + text.length * 0.1,
              },
            },
          }}
          className="inline-block w-[2px] h-[1.2em] bg-current ml-[2px] align-middle"
        />
      </motion.span>
    );
  };

  const renderHighlightAnimation = () => {
    return (
      <motion.span
        className={`inline-block relative ${className}`}
        initial="hidden"
        animate={controls}
      >
        <span className="relative z-10" style={{ color: typeof color === "string" ? color : undefined }}>{text}</span>
        <motion.span
          className="absolute bottom-0 left-0 h-[30%] w-full -z-10 block"
          style={{ backgroundColor: typeof color === "string" ? color : "#2c2bad", opacity: 0.3 }}
          variants={{
            hidden: { width: "0%" },
            visible: {
              width: "100%",
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: delay,
              },
            },
          }}
        />
      </motion.span>
    );
  };

  const renderGradientAnimation = () => {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              delay: delay,
              duration: 1
            }
          }
        }}
      >
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-primary to-red-600 bg-[length:200%_auto]"
          animate={{
            backgroundPosition: ["0% center", "100% center", "0% center"],
          }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {text}
        </motion.span>
      </motion.span>
    );
  };

  const renderRevealAnimation = () => {
    return (
      <motion.span
        className={`inline-block relative overflow-hidden ${className}`}
        initial="hidden"
        animate={controls}
      >
        <motion.span
          variants={{
            hidden: { y: "100%" },
            visible: {
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: delay,
              },
            },
          }}
          className="inline-block"
          style={{ color: typeof color === "string" ? color : undefined }}
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute inset-0 bg-primary"
          variants={{
            hidden: { y: 0 },
            visible: {
              y: "-100%",
              transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: delay,
              },
            },
          }}
        />
      </motion.span>
    );
  };

  switch (type) {
    case "wave":
      return renderWaveAnimation();
    case "typing":
      return renderTypingAnimation();
    case "highlight":
      return renderHighlightAnimation();
    case "gradient":
      return renderGradientAnimation();
    case "reveal":
      return renderRevealAnimation();
    default:
      return renderWaveAnimation();
  }
}