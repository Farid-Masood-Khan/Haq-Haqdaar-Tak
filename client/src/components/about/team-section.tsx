import { motion } from "framer-motion";

// Sample team data (this would typically come from an API)
const teamMembers = [
  {
    id: 1,
    name: "Aamir Khan",
    role: "Founder & Director",
    bio: "Aamir founded Haq Haqdaar Tak with a vision to ensure food security for all. He has over 10 years of experience in non-profit management and community development.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Fatima Ahmed",
    role: "Operations Manager",
    bio: "Fatima oversees all food distribution operations and volunteer coordination. She brings 8 years of logistics and supply chain management experience to the team.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Zain Malik",
    role: "Community Outreach",
    bio: "Zain leads our community engagement initiatives, building relationships with local partners and identifying communities in need of support.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Ayesha Bashir",
    role: "Volunteer Coordinator",
    bio: "Ayesha manages our growing network of volunteers, organizing training sessions and ensuring smooth operations during distribution events.",
    image: "https://randomuser.me/api/portraits/women/29.jpg"
  }
];

export default function TeamSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[rgba(60,60,185)] font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated individuals who work tirelessly to fulfill our mission of providing food security to those in need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-[rgba(60,60,185)] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl text-[rgba(60,60,185)] font-bold mb-4">Join Our Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to join our cause. Whether you're interested in volunteering, 
            interning, or applying for a full-time position, we'd love to hear from you.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="inline-block px-6 py-3 bg-[rgba(60,60,185)] text-white font-medium rounded-md hover:bg-[rgba(60,60,185)]/90 transition-colors"
          >
            Get Involved
          </motion.a>
        </div>
      </div>
    </section>
  );
}