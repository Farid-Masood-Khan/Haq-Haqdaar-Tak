import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  
  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    newsletterMutation.mutate(email);
  };

  return (
    <section className="py-16 bg-[rgba(60,60,185)] text-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100">
              Subscribe to our newsletter to receive updates on our activities, upcoming events, and ways to get involved.
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <Input
                id="newsletter-email"
                name="newsletter-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="py-6 px-7 rounded-lg text-gray-800 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-white text-[rgba(60,60,185)] hover:bg-blue-100 py-6 px-6 rounded-lg font-medium whitespace-nowrap"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
