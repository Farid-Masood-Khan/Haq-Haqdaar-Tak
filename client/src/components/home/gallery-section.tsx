
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type FilterType = "all" | "food" | "volunteer" | "community";

type GalleryItem = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  category: FilterType | FilterType[];
};

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      image: "/images/unsplash/food-donation-1.svg",
      title: "Food Distribution Drive",
      location: "Lahore",
      date: "March 2023",
      category: "food"
    },
    {
      id: 2,
      image: "/images/unsplash/volunteer-group-1.svg",
      title: "Volunteer Packing Day",
      location: "Sahiwal",
      date: "May 2023",
      category: "volunteer"
    },
    {
      id: 3,
      image: "/images/unsplash/community-event-1.svg",
      title: "Community Celebration",
      location: "Lahore",
      date: "June 2023",
      category: "community"
    },
    {
      id: 4,
      image: "/images/unsplash/food-donation-2.svg",
      title: "Rashan Package Preparation",
      location: "Sahiwal",
      date: "July 2023",
      category: ["food", "volunteer"]
    },
    {
      id: 5,
      image: "/images/unsplash/volunteer-group-2.svg",
      title: "Volunteer Recognition",
      location: "Lahore",
      date: "August 2023",
      category: "volunteer"
    },
    {
      id: 6,
      image: "/images/unsplash/community-event-2.svg",
      title: "Eid Distribution",
      location: "Sahiwal",
      date: "April 2023",
      category: ["food", "community"]
    },
    {
      id: 7,
      image: "/images/unsplash/food-donation-1.svg",
      title: "Community Kitchen",
      location: "Lahore",
      date: "September 2023",
      category: "food"
    },
    {
      id: 8,
      image: "/images/unsplash/volunteer-group-2.svg",
      title: "Warehouse Organization",
      location: "Lahore",
      date: "October 2023",
      category: "volunteer"
    }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => 
        Array.isArray(item.category) 
          ? item.category.includes(activeFilter)
          : item.category === activeFilter
      );

  const filters = [
    { id: "all", label: "All" },
    { id: "food", label: "Food Distribution" },
    { id: "volunteer", label: "Volunteer Activities" },
    { id: "community", label: "Community Events" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">Our Gallery</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            See the impact of our work through these moments captured during our donation drives.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-8 flex flex-wrap justify-center gap-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? null : "outline"}
              className={activeFilter === filter.id ? "bg-[rgba(60,60,185)] text-white" : "bg-primary-300 hover:bg-[rgba(60,60,185)] text-gray-700"}
              onClick={() => setActiveFilter(filter.id as FilterType)}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          key={activeFilter}
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              className="group overflow-hidden rounded-lg shadow-md relative cursor-pointer"
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.location}, {item.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Button 
            className="px-6 py-6 bg-[rgba(60,60,185)] hover:bg-[rgba(60,60,185)]-dark text-white"
            onClick={() => {
              window.location.href = '/gallery';
            }}
          >
            View More Photos
         </Button>
        </motion.div>
      </div>
    </section>
  );
}
