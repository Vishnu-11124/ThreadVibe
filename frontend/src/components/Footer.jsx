import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              ThreadVibe
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Premium t-shirts for Men, Women & Kids.  
              Quality, Comfort & Style — delivered to your door.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Info</h3>

            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                Kannur, Kerala, India
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cyan-400" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                support@threadvibe.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="text-white font-semibold">ThreadVibe</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
