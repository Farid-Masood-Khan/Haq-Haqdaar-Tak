import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Food Package Distribution",
      description: "We distribute monthly ration packages containing essential food items including flour, rice, lentils, oil, and more to families in need.",
      image: "/images/services/food-distribution.svg"
    },
    {
      title: "Rashan Packages",
      description: "Our Rashan package provides essential food to families in need, including flour, rice, lentils, and oil, ensuring nutrition and well-being each month.",
      image: "/images/services/community-kitchen.svg"
    },
    {
      title: "Emergency Relief",
      description: "During natural disasters and emergencies, we quickly mobilize to provide food, clean water, and essential supplies to affected communities.",
      image: "/images/services/emergency-relief.svg"
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerCards = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">Our Services</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            We provide multiple services to support our community's nutritional and essential needs.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerCards}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              variants={fadeIn}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-[rgba(60,60,185)] mb-2">{service.title}</h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
