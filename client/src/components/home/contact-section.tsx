import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const contactMutation = useMutation({
    mutationFn: async (formData: any) => {
      await apiRequest("POST", "/api/contact", formData);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We will get back to you soon.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Message submission failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    contactMutation.mutate({
      name,
      email,
      phone,
      subject,
      message
    });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">Contact Us</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Have questions or want to get involved? Reach out to our team.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <Input
                  id="contactName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  id="contactEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  id="contactPhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="contactSubject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue  placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donation">Donation Inquiry</SelectItem>
                    <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                    <SelectItem value="partnership">Partnership Proposal</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="contactMessage" className="block text-gray-700 font-medium mb-2">Message</label>
                <Textarea
                  id="contactMessage"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[rgba(60,60,185)] hover:bg-primary-dark text-white"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-red-600 text-3xl mb-3">
                  <MapPin />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Lahore Office</h3>
                <p className="text-gray-600">
                  123 Main Street, Johar Town,<br />
                  Lahore, Pakistan
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-red-600 text-3xl mb-3">
                  <MapPin />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Sahiwal Office</h3>
                <p className="text-gray-600">
                  456 Central Avenue,<br />
                  Sahiwal, Pakistan
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-green-600 text-3xl mb-3">
                  <Phone />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+923360665892" className="hover:text-primary">+92 336 0665892</a>
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-blue-600 text-3xl mb-3">
                  <Mail />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@haqhaqdaartak.org" className="hover:text-primary">info@haqhaqdaartak.org</a>
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md h-72">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108704.59514370093!2d74.22575821350243!3d31.482625607468434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sJohar%20Town%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1652267766151!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lahore Office Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
