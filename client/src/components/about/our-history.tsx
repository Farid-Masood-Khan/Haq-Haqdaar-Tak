import { motion } from "framer-motion";

export default function OurHistory() {
  const milestones = [
    {
      year: "2018",
      title: "Humble Beginnings",
      description: "Haq Haqdaar Tak started as a small group of volunteers providing food packages to families in Lahore during Ramadan."
    },
    {
      year: "2019",
      title: "Expanding Our Reach",
      description: "Extended operations to Sahiwal and established regular monthly food distribution programs."
    },
    {
      year: "2020",
      title: "COVID-19 Response",
      description: "Rapidly scaled our operations to meet the increased need during the pandemic, providing emergency food relief to thousands of families."
    },
    {
      year: "2021",
      title: "Community Partnerships",
      description: "Formed strategic partnerships with local businesses and organizations to increase our impact and reach more communities."
    },
    {
      year: "2022",
      title: "Sustainable Programs",
      description: "Launched sustainable food security initiatives and began focusing on long-term solutions to hunger in our communities."
    },
    {
      year: "2023",
      title: "Volunteer Network Growth",
      description: "Expanded our volunteer base and training programs to create a more effective and dedicated team."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-[rgba(60,60,185)] font-bold mb-4">Our History</h2>
            <p className="text-gray-600">
              The journey of Haq Haqdaar Tak has been one of growth, resilience, and unwavering commitment to our mission.
            </p>
          </div>
          
          <div className="relative border-l-2 border-[rgba(60,60,185)] pl-8 ml-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 relative"
              >
                <div className="absolute -left-12 w-7 h-7 bg-[rgba(60,60,185)] rounded-full border-4 border-white"></div>
                <div className="absolute -left-[5.7rem] text-[rgba(60,60,185)] font-bold">{milestone.year}</div>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: milestones.length * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-12 w-7 h-7 bg-[rgba(60,60,185)] rounded-full border-4 border-white"></div>
              <div className="absolute -left-[6.1rem] text-[rgba(60,60,185)] font-bold">Today</div>
              <h3 className="text-xl font-semibold mb-2">Continued Growth</h3>
              <p className="text-gray-600">
                Today, Haq Haqdaar Tak continues to grow and adapt to meet the changing needs of our communities. 
                We remain dedicated to our mission of ensuring food security and dignity for all.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}