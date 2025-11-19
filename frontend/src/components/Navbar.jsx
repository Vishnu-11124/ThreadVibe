import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, LucideLink } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                ThreadVibe
              </span>
            </a>
          </div>

          {/* Center/Right - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200"
            >
              Home
            </a>
            <Link 
              to="/shop" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Shop
            </Link>
            <a 
              href="/about" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="/contact" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Contact
            </a>


            {/* Login/Profile Icon */}
            <a 
              href="/dashboard" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <User className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">

            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-cyan-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/shop"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Shop
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
