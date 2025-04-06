import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function HeroSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const statsContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
  };

  const statsItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero/hero-bg.svg" 
          alt="Food donation volunteers" 
          className="w-full h-full object-cover" 
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(43,42,169,0.95), rgba(42, 42, 169, 0.6))'
          }}
        ></div>

      </div>
      
      <div className="container mx-auto px-4 md:px-8 z-10 pt-20">
        <motion.div 
          className="max-w-2xl text-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Empowering Communities Through Nourishment
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Providing food and essentials to those in need across Lahore and Sahiwal, Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#donate">
              <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
              onClick={() => {
                const donateSection = document.getElementById('donate');
                if (donateSection) {
                  donateSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              >
                Donate Now
              </Button>
            </Link>
            <Link href="/#about">
            <Button 
              variant="ghost" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn More
            </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={statsContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-lg" variants={statsItem}>
            <div className="flex items-center space-x-4">
              <AnimatedCounter 
                value={200} 
                className="text-red-600 text-4xl font-bold"
                duration={2.5}
                delay={0.2}
              />
              <div>
                <h3 className="font-heading font-semibold">Families Saved</h3>
                <p className="text-gray-600 text-sm">In the last year</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-lg" variants={statsItem}>
            <div className="flex items-center space-x-4">
              <AnimatedCounter 
                value={24} 
                className="text-green-600 text-4xl font-bold"
                duration={1.5}
                delay={0.4}
              />
              <div>
                <h3 className="font-heading font-semibold">Donation Drives</h3>
                <p className="text-gray-600 text-sm">Organized yearly</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-lg" variants={statsItem}>
            <div className="flex items-center space-x-4">
              <AnimatedCounter 
                value={120} 
                suffix="+" 
                className="text-blue-600 text-4xl font-bold"
                duration={2}
                delay={0.6}
              />
              <div>
                <h3 className="font-heading font-semibold">Volunteers</h3>
                <p className="text-gray-600 text-sm">Active community members</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
