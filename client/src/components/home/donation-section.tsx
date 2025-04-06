import { useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Utensils, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function DonationSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState<string>("5000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [fullName, setFullName] = useState<string>(user?.fullName || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [message, setMessage] = useState<string>("");

  const submitDonation = useMutation({
    mutationFn: async (formData: any) => {
      if (user) {
        // If user is logged in, save the donation to the database
        await apiRequest("POST", "/api/donations", {
          amount: parseFloat(formData.amount),
          message: formData.message,
          userId: user.id,
          status: "pending"
        });
      }
      
      // Redirect to WhatsApp regardless of login status
      const amount = formData.amount;
      const whatsappNumber = "923360665892";
      const whatsappMessage = `Hello, I would like to donate PKR ${amount} to Haq Haqdaar Tak. My name is ${formData.fullName}. ${formData.message ? `Message: ${formData.message}` : ''}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your donation!",
        description: "We've redirected you to WhatsApp to complete your donation.",
      });
      
      // Reset form
      setCustomAmount("");
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Donation submission failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalAmount = customAmount || donationAmount;
    if (!finalAmount) {
      toast({
        title: "Please select or enter an amount",
        variant: "destructive",
      });
      return;
    }
    
    if (!fullName || !email || !phone) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    submitDonation.mutate({
      amount: finalAmount,
      fullName,
      email,
      phone,
      message
    });
  };

  const handleAmountClick = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="donate" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[rgba(60,60,185)] mb-4">Make a Difference</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Your contribution helps us provide essential nourishment to families in need across Lahore and Sahiwal.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-[rgba(60,60,185)] mb-6">How Your Donation Helps</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center">
                    <UtensilsCrossed className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-2">Monthly Food Packages</h4>
                  <p className="text-gray-600">
                    PKR 5,000 provides a family with essential food items for a month, including flour, rice, lentils, oil, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                    <Utensils className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-2">Community Kitchen</h4>
                  <p className="text-gray-600">
                    PKR 15,000 helps us run a community kitchen for a day, serving fresh meals to over 100 individuals.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold mb-2">Volunteer Support</h4>
                  <p className="text-gray-600">
                    PKR 2,000 provides transportation and resources for our volunteers to reach remote communities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-heading text-lg font-semibold mb-3">Other Ways to Help</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Volunteer your time and skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Spread awareness about our cause</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Donate food and essential items directly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Partner with us as a business or organization</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold text-[rgba(60,60,185)]">Support Our Cause</h3>
              <p className="text-gray-600 mt-2">Your generosity can make a real difference in someone's life</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Choose Donation Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <Button
                    type="button"
                    variant={donationAmount === "500" && !customAmount ? null : "outline"}
                    className={
                      donationAmount === "500" && !customAmount 
                        ? "bg-[rgba(60,60,185)] text-white border-2 border-[rgba(60,60,185)]" 
                        : "bg-white text-primary border-2 border-primary hover:bg-[rgba(60,60,185)] hover:border-[rgba(60,60,185)]"
                    }
                    onClick={() => handleAmountClick("500")}
                  >
                    PKR 500
                  </Button>
                  <Button
                    type="button"
                    variant={donationAmount === "1000" && !customAmount ? null : "outline"}
                    className={
                      donationAmount === "1000" && !customAmount 
                      ? "bg-[rgba(60,60,185)] text-white border-2 border-[rgba(60,60,185)]" 
                      : "bg-white text-primary border-2 border-primary hover:bg-[rgba(60,60,185)] hover:border-[rgba(60,60,185)]"
                  }
                    onClick={() => handleAmountClick("1000")}
                  >
                    PKR 1,000
                  </Button>
                  <Button
                    type="button"
                    variant={donationAmount === "5000" && !customAmount ?  null  : "outline"}
                    className={
                      donationAmount === "5000" && !customAmount 
                      ? "bg-[rgba(60,60,185)] text-white border-2 border-[rgba(60,60,185)]" 
                      : "bg-white text-primary border-2 border-primary hover:bg-[rgba(60,60,185)] hover:border-[rgba(60,60,185)]"
                  }
                    onClick={() => handleAmountClick("5000")}
                  >
                    PKR 5,000
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter Custom Amount"
                    className="pl-12"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setDonationAmount("");
                    }}
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                    PKR
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message (Optional)</label>
                <Textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share any specific instructions or comments"
                />
              </div>
              
              <Button
                type="submit"
                variant="accent"
                className="w-full py-6"
                size="lg"
                disabled={submitDonation.isPending}
              >
                {submitDonation.isPending ? "Processing..." : "Proceed to Donate"}
              </Button>
              
              <p className="text-center text-sm text-gray-500">
                After submitting, you'll be connected with our team via WhatsApp to complete your donation.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
