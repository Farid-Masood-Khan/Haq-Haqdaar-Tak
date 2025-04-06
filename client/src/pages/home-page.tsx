import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import ServicesSection from "@/components/home/services-section";
import ImpactStatistics from "@/components/home/impact-statistics";
import GallerySection from "@/components/home/gallery-section";
import EventsSection from "@/components/home/events-section";
import DonationSection from "@/components/home/donation-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import ContactSection from "@/components/home/contact-section";
import NewsletterSection from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ImpactStatistics />
        <GallerySection />
        <EventsSection />
        <DonationSection />
        <TestimonialsSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
