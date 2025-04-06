import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import AboutPage from "@/pages/about-page";
import DonatePage from "@/pages/donate-page-fixed";
import GalleryPage from "@/pages/gallery-page";
import ContactPage from "@/pages/contact-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import CursorAnimation from "@/components/ui/cursor-animation";
import PageTransition from "@/components/ui/page-transition";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { useEffect } from "react";
import EventsPage from "./pages/event-page";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location} mode="fade">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/donate" component={DonatePage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/Events" component={EventsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/auth" component={AuthPage} />
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ScrollToTop />
        <Router />
        <WhatsAppButton />
        <Toaster />
        <CursorAnimation />
        
        {/* Loading overlay */}
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 2.8 }}
            style={{ 
              scrollBehavior: "unset",
              pointerEvents: "none",
              backgroundColor: "rgba(60,60,185,1)" 
            }}
          >
            <div className="relative w-[40rem] h-[40rem]">
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                {/* Background ripples */}
                {[...Array(4)].map((_, i) => (
                  <motion.circle
                    key={`ripple-${i}`}
                    cx="100"
                    cy="100"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    initial={{ r: 20 }}
                    animate={{
                      r: [20, 90],
                      opacity: [0.5, 0],
                      strokeWidth: ["0.5px", "0.1px"]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.8,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Orbital particles */}
                {[...Array(24)].map((_, i) => (
                  <motion.g key={`particle-group-${i}`}>
                    <motion.circle
                      r="1.5"
                      fill="white"
                      initial={{ 
                        x: 100,
                        y: 100,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: [100, 100 + 60 * Math.cos(i * 15 * Math.PI / 180)],
                        y: [100, 100 + 60 * Math.sin(i * 15 * Math.PI / 180)],
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.line
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.05,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      x1="100"
                      y1="100"
                      x2={100 + 60 * Math.cos(i * 15 * Math.PI / 180)}
                      y2={100 + 60 * Math.sin(i * 15 * Math.PI / 180)}
                    />
                  </motion.g>
                ))}

                {/* Central geometric pattern */}
                <g>
                  {[...Array(3)].map((_, i) => (
                    <motion.path
                      key={`hex-${i}`}
                      d="M100,70 L126,85 L126,115 L100,130 L74,115 L74,85 Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="0.5"
                      initial={{ scale: 1, rotate: i * 40 }}
                      animate={{ 
                        rotate: [i * 40, i * 40 + 360],
                        scale: [1, 1.1, 1]
                      }}
                      style={{ transformOrigin: '100px 100px' }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  ))}
                  
                  {/* Core element */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="15"
                    fill="rgba(255,255,255,0.15)"
                    animate={{
                      r: [15, 20, 15],
                      opacity: [0.15, 0.3, 0.15],
                      filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </g>
              </svg>
            </div>
          </motion.div>
        </AnimatePresence>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
