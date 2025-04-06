import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

interface WhatsAppButtonProps {
  phone?: string; 
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WhatsAppButton({
  phone = "+923360665892",
  message = "Hello! I'm interested in making a donation to Haq Haqdaar Tak.",
  size = "md",
  className = "",
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClass = () => {
    switch (size) {
      case "sm": return "p-2 text-xl";
      case "md": return "p-3 text-2xl";
      case "lg": return "p-4 text-3xl";
      default: return "p-3 text-2xl";
    }
  };

  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-30 ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <div className="relative">
        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-white dark:bg-gray-800 text-sm font-medium rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="whitespace-nowrap text-gray-800 dark:text-white">Chat with us!</span>
          {/* Tooltip Arrow */}
          <div className="absolute bottom-0 right-4 -mb-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-white dark:border-gray-800"></div>
        </motion.div>
        
        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${getSizeClass()} bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <FaWhatsapp />

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ 
              boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.5)"
            }}
            animate={{ 
              boxShadow: ["0 0 0 0 rgba(37, 211, 102, 0.5)", "0 0 0 15px rgba(37, 211, 102, 0)"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
              times: [0, 1]
            }}
          />
        </motion.a>
      </div>
    </motion.div>
  );
}