import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              ThreadVibe
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Premium t-shirts for Men, Women & Kids.
              Quality, Comfort & Style — delivered to your door.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 hover:bg-cyan-500 hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Customer Info</h3>
            <ul className="space-y-2.5 text-sm">
              {["Privacy Policy", "Terms & Conditions", "Shipping Policy", "Refund Policy"].map((label) => (
                <li key={label}>
                  <a href="#" className="hover:text-white transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Kannur, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors duration-150">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:support@threadvibe.com" className="hover:text-white transition-colors duration-150 break-all">
                  support@threadvibe.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">ThreadVibe</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">Made with ♥ in Kerala</p>
        </div>

      </div>
    </footer>
  );
}