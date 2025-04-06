import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/images/logo.png" alt="Haq Haqdaar Tak Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-heading text-lg font-bold">Haq Haqdaar Tak</h3>
                <p className="text-gray-400 text-xs font-arabic">حق حقدار تک</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6">
              Empowering communities through nourishment. Your support helps us provide essential food to those in need.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-2 rounded-lg hover:opacity-80 transition-opacity">
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-heading text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/donate" className="text-gray-400 hover:text-white transition-colors">Donate</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-heading text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Food Distribution</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Emergency Relief</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Volunteer Program</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Rashan Packages</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-heading text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="text-red-500 mt-1 flex-shrink-0" size={18} />
                <span>123 Main Street, Johar Town, Lahore, Pakistan</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="text-red-500 mt-1 flex-shrink-0" size={18} />
                <span>+92 336 0665892</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="text-red-500 mt-1 flex-shrink-0" size={18} />
                <span>info@haqhaqdaartak.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="text-red-500 mt-1 flex-shrink-0" size={18} />
                <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Haq Haqdaar Tak. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
