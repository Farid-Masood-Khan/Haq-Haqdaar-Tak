import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  type: "upcoming" | "training" | "special";
};

export default function EventsSection() {
  const events: Event[] = [
    {
      id: 1,
      title: "Monthly Rashan Distribution",
      description: "Join us for our monthly rashan distribution event where we'll be providing essential food packages to 200+ families.",
      date: "April 15, 2023",
      time: "9:00 AM",
      location: "Johar Town, Lahore",
      image: "/images/events/monthly-distribution.svg",
      type: "upcoming"
    },
    {
      id: 2,
      title: "Volunteer Training Session",
      description: "Learn about our volunteer process, safety protocols, and how to effectively engage with the communities we serve.",
      date: "April 20, 2023",
      time: "5:00 PM",
      location: "Community Center, Sahiwal",
      image: "/images/events/volunteer-training.svg",
      type: "training"
    },
    {
      id: 3,
      title: "Community Iftar Dinner",
      description: "Join us for a special community iftar dinner serving hundreds of people during the holy month of Ramadan.",
      date: "April 25, 2023",
      time: "6:30 PM",
      location: "Central Park, Lahore",
      image: "/images/events/community-iftar.svg",
      type: "special"
    }
  ];

  const typeColors = {
    upcoming: "bg-red-600 text-white",
    training: "bg-blue-600 text-white",
    special: "bg-purple-600 text-white"
  };

  const typeLabels = {
    upcoming: "Upcoming",
    training: "Training",
    special: "Special Event"
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">Upcoming Events</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Join us in our upcoming food distribution drives and volunteer activities.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {events.map((event) => (
            <motion.div 
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              variants={fadeIn}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 left-4 ${typeColors[event.type]} px-3 py-1 rounded-full text-sm font-medium`}>
                  {typeLabels[event.type]}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 mb-3">
                  <CalendarIcon className="text-red-600" size={16} />
                  <span>{event.date}</span>
                  <ClockIcon className="text-red-600 ml-2" size={16} />
                  <span>{event.time}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[rgba(60,60,185)] mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>
                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                  <MapPinIcon className="text-green-600" size={16} />
                  <span>{event.location}</span>
                </div>
                <Button className="w-full bg-[rgba(60,60,185)] hover:bg-[rgba(60,60,185)]">
                  Register to Volunteer
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
