import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MdVolunteerActivism, MdOutlineFastfood, MdPeople } from "react-icons/md";

// About Page sections
import OurMission from "@/components/about/our-mission";
import OurHistory from "@/components/about/our-history";
import TeamSection from "@/components/about/team-section";
import ImpactReports from "@/components/about/impact-reports";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section
          className="relative py-40 text-white"
          style={{
            background: 'linear-gradient(to bottom, rgba(43,42,169,0.95), rgba(42, 42, 169,0.6))'
          }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Haq Haqdaar Tak</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                We are dedicated to providing food and ration to those in need across Lahore and Sahiwal, Pakistan.
                Our mission is to ensure no one goes hungry in our communities.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="outline" className="text-white border-[rgba(42,42,169,0.9)] bg-[rgba(42,42,169,0.9)] hover:bg-white/20">
                  <Link href="/donate">Support Our Cause</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-[rgba(42,42,169,0.9)] hover:bg-[rgba(42,42,169,0.9)]">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>              
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#f9fafb" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Key Areas Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-[rgba(60,60,185)] font-bold">Our Key Focus Areas</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Haq Haqdaar Tak works in three key areas to support communities in need
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdOutlineFastfood className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl text-[rgba(60,60,185)] font-semibold mb-2">Food Distribution</h3>
                <p className="text-gray-600">
                  Providing regular food and ration distribution to families and individuals in Lahore and Sahiwal.
                </p>
              </motion.div>
              
              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdVolunteerActivism className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl text-[rgba(60,60,185)] font-semibold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Organizing community events and drives to build resilience and support networks within local communities.
                </p>
              </motion.div>
              
              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdPeople className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl text-[rgba(60,60,185)] font-semibold mb-2">Volunteer Engagement</h3>
                <p className="text-gray-600">
                  Empowering individuals to contribute through volunteering and community service opportunities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Mission Section */}
        <OurMission />
        
        {/* Our History Section */}
        <OurHistory />
        
        {/* Our Team Section */}
        <TeamSection />
        
        {/* Impact Reports Section */}
        <ImpactReports />
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl text-[rgba(60,60,185)] font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join us in our mission to provide food and ration to those in need.
              Your support can change lives in Lahore and Sahiwal communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[rgba(60,60,185)] hover:bg-[rgba(60,60,185)]/90 text-white shadow-lg">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="bg-[rgba(60,60,185)]/90 hover:bg-[rgba(60,60,185)] text-white shadow-lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
