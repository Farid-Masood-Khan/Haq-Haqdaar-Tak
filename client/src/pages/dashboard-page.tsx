import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import DonationHistory from "@/components/dashboard/donation-history";
import UserProfile from "@/components/dashboard/user-profile";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [_, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 md:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome, {user?.fullName}</h1>
            <p className="text-gray-600">
              Track your donations and manage your account
            </p>
          </header>

          <Tabs defaultValue="donations" className="space-y-6">
            <TabsList>
              <TabsTrigger value="donations">Donation History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="donations" className="space-y-6">
              <DonationHistory />
            </TabsContent>

            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>
          </Tabs>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h2 className="text-xl font-semibold text-primary mb-4">Thank You for Your Support</h2>
            <p className="text-gray-700 mb-4">
              Your generosity helps us provide essential nourishment to families in need across Lahore and Sahiwal. 
              Every contribution makes a real difference in our communities.
            </p>
            <p className="text-gray-700">
              Have questions about your donations? Contact us directly via WhatsApp or visit our contact page.
            </p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
