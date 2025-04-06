import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function AnimatedStat({ value, label, suffix = "", duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = Math.ceil(end / (duration / 16)); // 16ms is roughly 60fps
      
      const timer = setInterval(() => {
        start = Math.min(end, start + increment);
        setCount(start);
        
        if (start >= end) {
          clearInterval(timer);
        }
      }, 16);
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref}>
      <div className="text-4xl md:text-5xl font-bold mb-2">{count.toLocaleString()}{suffix}</div>
      <p className="opacity-90">{label}</p>
    </div>
  );
}

export default function ImpactStatistics() {
  const stats = [
    { value: 12000, label: "Meals Distributed", suffix: "+" },
    { value: 850, label: "Volunteer Hours", suffix: "+" },
    { value: 2, label: "Cities Served" },
    { value: 1500, label: "Donations Received", suffix: "+" }
  ];

  return (
    <section className="py-16 text-white"
    style={{
      background: 'linear-gradient(to right, rgba(43,42,169,0.95), rgba(42, 42, 169, 0.6))'
    }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedStat 
                value={stat.value} 
                label={stat.label} 
                suffix={stat.suffix} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
