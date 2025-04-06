import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertDonationSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

// Donation Form Schema Extension
const donationFormSchema = insertDonationSchema.extend({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

export default function DonatePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const [donationStep, setDonationStep] = useState(1);
  const [donationDetails, setDonationDetails] = useState<DonationFormValues | null>(null);

  // Define the donation form
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "",
      message: "",
      status: "pending",
    },
  });

  // Create a donation mutation
  const donationMutation = useMutation({
    mutationFn: async (values: DonationFormValues) => {
      const res = await apiRequest("POST", "/api/donations", {
        ...values,
        amount: Number(values.amount),
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Donation initiated",
        description: "Your donation has been recorded. You can track it in your dashboard.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      // Move to WhatsApp step
      setDonationStep(3);
    },
    onError: (error) => {
      toast({
        title: "Failed to process donation",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  function onSubmit(values: DonationFormValues) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue with your donation.",
        variant: "destructive",
      });
      setLocation("/auth");
      return;
    }

    if (donationStep === 1) {
      setDonationDetails(values);
      setDonationStep(2);
    } else if (donationStep === 2) {
      // Process the donation through API
      donationMutation.mutate(values);
    }
  }

  // Donation process steps component
  const DonationSteps = () => (
    <div className="mb-8">
      <div className="flex justify-between relative mb-4 w-full max-w-lg mx-auto">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-300" 
          style={{ width: donationStep === 1 ? "0%" : donationStep === 2 ? "50%" : "100%" }}
        ></div>

        {/* Step Circles */}
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${donationStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'} z-10`}>
          1
        </div>
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${donationStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'} z-10`}>
          2
        </div>
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${donationStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'} z-10`}>
          3
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 max-w-lg mx-auto px-1">
        <span className={donationStep === 1 ? "text-primary font-medium" : ""}>Details</span>
        <span className={donationStep === 2 ? "text-primary font-medium" : ""}>Confirm</span>
        <span className={donationStep === 3 ? "text-primary font-medium" : ""}>Complete</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-primary/90 to-primary/70 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Donation</h1>
              <p className="text-lg md:text-xl opacity-90 mb-4">
                Your generosity helps us provide food and ration to those in need in Lahore and Sahiwal, Pakistan.
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
            <div className="max-w-3xl mx-auto">
              {/* Steps Indicator */}
              <DonationSteps />
              
              {/* Donation Forms */}
              <Card>
                <CardContent className="pt-6">
                  {donationStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 text-center">Donation Details</h2>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <Tabs defaultValue="oneTime" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="oneTime">One-time Donation</TabsTrigger>
                              <TabsTrigger value="monthly">Monthly Support</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="oneTime" className="space-y-6 pt-4">
                              <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Donation Amount (PKR)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter amount" 
                                        {...field} 
                                        type="number"
                                        min="1"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-3 gap-3">
                                {[1000, 5000, 10000].map((amount) => (
                                  <Button 
                                    key={amount}
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.setValue("amount", amount.toString())}
                                    className={form.watch("amount") === amount.toString() ? "border-primary" : ""}
                                  >
                                    PKR {amount.toLocaleString()}
                                  </Button>
                                ))}
                              </div>
                              
                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Message (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Add a message with your donation"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TabsContent>
                            
                            <TabsContent value="monthly" className="space-y-6 pt-4">
                              <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Monthly Amount (PKR)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter amount" 
                                        {...field} 
                                        type="number"
                                        min="1"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-3 gap-3">
                                {[1500, 3000, 5000].map((amount) => (
                                  <Button 
                                    key={amount}
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.setValue("amount", amount.toString())}
                                    className={form.watch("amount") === amount.toString() ? "border-primary" : ""}
                                  >
                                    PKR {amount.toLocaleString()}/month
                                  </Button>
                                ))}
                              </div>
                              
                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Message (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Add a message with your donation"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TabsContent>
                          </Tabs>
                          
                          <Button 
                            type="submit" 
                            className="w-full" 
                            size="lg"
                            disabled={!form.formState.isValid}
                          >
                            Continue
                          </Button>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                  
                  {donationStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 text-center">Confirm Donation</h2>
                      
                      {donationDetails && (
                        <div className="space-y-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-semibold">PKR {Number(donationDetails.amount).toLocaleString()}</span>
                            </div>
                            {donationDetails.message && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Message:</span>
                                <span className="font-medium">{donationDetails.message}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-600 mb-6">
                              By proceeding, you'll be directed to our WhatsApp contact to complete your donation. We appreciate your support!
                            </p>
                            
                            <div className="flex flex-col gap-3">
                              <Button
                                onClick={() => donationMutation.mutate(donationDetails)}
                                disabled={donationMutation.isPending}
                                size="lg"
                              >
                                {donationMutation.isPending ? "Processing..." : "Confirm Donation"}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setDonationStep(1)}
                                disabled={donationMutation.isPending}
                              >
                                Back to Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {donationStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-4"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                      <p className="text-gray-600 mb-6">
                        Your donation has been recorded. Please click the button below to contact us via WhatsApp to complete your donation.
                      </p>
                      
                      <div className="space-y-4">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          size="lg"
                          onClick={() => {
                            const amount = donationDetails?.amount || "";
                            const message = `Hello, I would like to make a donation of PKR ${amount}${donationDetails?.message ? ` with message: ${donationDetails.message}` : ""}`;
                            const encodedMessage = encodeURIComponent(message);
                            window.open(`https://wa.me/923360665892?text=${encodedMessage}`, "_blank");
                          }}
                        >
                          Continue to WhatsApp
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <Link href="/dashboard">
                            View Donation History
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Why Donate Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why Donate to Haq Haqdaar Tak?</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Your contribution makes a real difference in the lives of those in need
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Reason 1 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Funding</h3>
                  <p className="text-gray-600">
                    We ensure that your donations are used effectively and transparently, with 100% going directly to food and ration distribution.
                  </p>
                </CardContent>
              </Card>
              
              {/* Reason 2 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Local Impact</h3>
                  <p className="text-gray-600">
                    Your donation stays within the Lahore and Sahiwal communities, helping families in immediate need right where you live.
                  </p>
                </CardContent>
              </Card>
              
              {/* Reason 3 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainable Approach</h3>
                  <p className="text-gray-600">
                    We don't just provide one-time help – we build ongoing support systems that help communities become more resilient over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}