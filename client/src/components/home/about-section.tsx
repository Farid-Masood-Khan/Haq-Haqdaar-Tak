import { motion } from "framer-motion";

export default function AboutSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Haq Haqdaar Tak is dedicated to ensuring that essential food and supplies reach those who need them most in our communities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 
              className="font-heading text-2xl font-bold text-[rgba(60,60,185)] mb-6"
              variants={fadeIn}
            >
              Who We Are
            </motion.h3>
            
            <motion.p 
              className="text-gray-700 mb-4"
              variants={fadeIn}
            >
              Founded with the belief that every person deserves access to nutritious food, Haq Haqdaar Tak has been serving communities in Lahore and Sahiwal since 2018.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-4"
              variants={fadeIn}
            >
              Our name, meaning "Rights to the Rightful," reflects our commitment to social justice and equitable distribution of resources.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-6"
              variants={fadeIn}
            >
              We operate through a network of dedicated volunteers who collect, package, and distribute food and essential supplies to families in need.
            </motion.p>
            
            <motion.div 
              className="border-l-4 border-red-600 pl-4 italic text-gray-600 mb-6"
              variants={fadeIn}
            >
              "We believe that nobody should go to bed hungry. Food is not just sustenance; it's a fundamental human right."
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeIn}
            >
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Sahiwal, Pakistan</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="/images/about/volunteers-packing.svg" 
                alt="Volunteers packing food supplies" 
                className="w-full h-64 object-cover" 
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="/images/about/distribution-drive.svg" 
                alt="Food distribution drive" 
                className="w-full h-64 object-cover" 
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md col-span-2">
              <img 
                src="/images/about/community-volunteers.svg" 
                alt="Community volunteers" 
                className="w-full h-72 object-cover" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
