import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
import { Menu, X,ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-[rgba(60,60,185)] backdrop-blur-sm shadow-md" : "bg-transparent"
  }`;
  
  

  return (
    <header className={navbarClasses}>
      <nav className="py-4">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <img 
                src="/images/logo.png" 
                alt="Haq Haqdaar Tak Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-white font-heading text-lg md:text-xl font-bold">Haq Haqdaar Tak</h1>
              <p className="text-blue-200 text-xs md:text-sm font-arabic">حق حقدار تک</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
          {[
              { href: "/#home", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/gallery", label: "Gallery" },
              { href: "/events", label: "Events" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <div key={item.href} className="relative">
                <Link href={item.href}>
                  <motion.div
                    className="relative px-1 py-2 text-white font-medium"
                    whileHover={{ color: "#BFDBFE" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-blue-200 w-full origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </motion.div>
                </Link>
                {location === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-red-400 w-full"
                    layoutId="activeNavLink"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
            {user && (
              <Link href="/dashboard" className="text-white hover:text-blue-200 transition-colors font-medium">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            ) : (
              <Link href="/auth" className="hidden md:block">
                <Button className="bg-red-600 hover:bg-red-700">Register / Login</Button>
              </Link>
            )}
            <button className="md:hidden text-white" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden fixed w-full left-0 top-[72px] z-50 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.4,
                ease: "easeInOut" 
              }}
            >
              <div
              style={{
                background: 'linear-gradient(to bottom, rgba(54, 54, 136, 0.95), rgba(67, 67, 182, 0.6))'
              }}
              className="container mx-auto px-4 py-4 mt-2 backdrop-blur-md rounded-b-xl shadow-xl border border-primary/20">
                {/* Mobile menu links with staggered animation */}
                <motion.div 
                  className="space-y-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.07
                      }
                    }
                  }}
                >
                  {[
                    { path: "/#home", label: "Home" },
                    { path: "/about", label: "About" },
                    { path: "/gallery", label: "Gallery" },
                    { path: "/events", label: "Events" },
                    { path: "/contact", label: "Contact" },
                    ...(user ? [{ path: "/dashboard", label: "Dashboard" }] : [])
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        href={item.path} 
                        onClick={closeMobileMenu} 
                        className="flex items-center py-3 px-4 rounded-lg text-white hover:bg-white/10 transition-colors font-medium text-lg"
                      >
                        <span>{item.label}</span>
                        <motion.div 
                          className="ml-auto text-white/60"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="border-t border-white/10 my-3"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="py-3 px-4"
                >
                  {user ? (
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      disabled={logoutMutation.isPending}
                      className="w-full py-6 text-lg font-bold"
                    >
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </Button>
                  ) : (
                    <Link href="/auth" onClick={closeMobileMenu} className="block">
                      <Button className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg font-bold">
                        Register / Login
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
