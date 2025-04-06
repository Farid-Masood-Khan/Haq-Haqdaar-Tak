import { motion } from "framer-motion";

export default function OurMission() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl text-[rgba(60,60,185)] font-bold mb-8">Our Mission & Vision</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To provide sustainable food security solutions to underprivileged communities in Lahore and Sahiwal, 
              ensuring no one goes hungry regardless of their socioeconomic status, while empowering individuals 
              to become self-sufficient.
            </p>
            <p className="text-gray-600">
              We are committed to addressing the immediate need for food in our communities while also 
              developing long-term solutions that tackle the root causes of food insecurity. Through our 
              ration distribution drives, community kitchens, and skill development programs, we aim to 
              make a lasting impact on the lives of those we serve.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 mb-6">
              We envision communities where every individual has reliable access to nutritious food, 
              where hunger and food insecurity are eliminated, and where people are empowered to 
              live with dignity and hope.
            </p>
            <p className="text-gray-600">
              Our long-term vision is to expand our reach to more regions across Pakistan, developing 
              a comprehensive support network that addresses not just food insecurity but also its 
              underlying causes, such as poverty, unemployment, and lack of education.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}