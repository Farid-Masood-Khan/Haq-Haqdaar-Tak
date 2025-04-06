import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import ParticlesBackground from "@/components/ui/particles-background";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { hover, motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    style={{
      background: 'linear-gradient(to bottom, rgba(43,42,169,0.95), rgba(42, 42, 169, 0.6))'
    }}
    >
      <ParticlesBackground color="#2c2bad" density={40} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-4 backdrop-blur-sm border-2 border-primary/10 shadow-lg"
        style={{
          background: 'white',
        }}
        >
          <CardContent className="pt-6 pb-6">
            <motion.div 
              className="flex flex-col items-center text-center mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
              <h1 className="text-3xl font-bold text-[rgba(42,42,169,0.9)]">404 Not Found</h1>
              <p className="text-black mt-2">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/">
                <Button className="w-full bg-[rgba(42,42,169,0.9)] hover:bg-[rgba(42,42,169,0.8)]">
                  Go Home
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline"
                className="w-full bg-white hover:bg-[rgba(42,42,169,0.9)] text-[rgba(42,42,169,0.9)] border-2 border-[rgba(42,42,169,0.9)]"
                >
                  Contact Support
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
