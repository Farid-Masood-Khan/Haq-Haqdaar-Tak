
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function EventsPage() {
  const [selectedTab, setSelectedTab] = useState<string>("all");

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
    upcoming: "bg-red-600",
    training: "bg-blue-600",
    special: "bg-purple-600"
  };

  const typeLabels = {
    upcoming: "Upcoming",
    training: "Training",
    special: "Special Event"
  };

  const filteredEvents = selectedTab === "all" 
    ? events 
    : events.filter(event => event.type === selectedTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <section className="relative py-48 text-white"
        style={{
          background: 'linear-gradient(to bottom, rgba(43,42,169,0.95), rgba(42, 42, 169, 0.6))'
        }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
              <p className="text-lg md:text-xl opacity-90">
                Join us in making a difference in our community through these upcoming events and activities.
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#f9fafb" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue="all" 
              className="w-full max-w-4xl mx-auto mb-8"
              onValueChange={setSelectedTab}
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="special">Special</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute top-4 left-4 ${typeColors[event.type]} px-3 py-1 rounded-full text-sm font-medium text-white`}>
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
                        <h3 className="font-heading text-xl font-bold text-primary mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-2 text-gray-500 mb-4">
                          <MapPinIcon className="text-green-600" size={16} />
                          <span>{event.location}</span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Register Now
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              {["upcoming", "training", "special"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute top-4 left-4 ${typeColors[event.type]} px-3 py-1 rounded-full text-sm font-medium text-white`}>
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
                          <h3 className="font-heading text-xl font-bold text-primary mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-2 text-gray-500 mb-4">
                            <MapPinIcon className="text-green-600" size={16} />
                            <span>{event.location}</span>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Register Now
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
