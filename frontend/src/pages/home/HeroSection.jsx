import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-200/40 via-blue-200/40 to-cyan-200/40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Elevate Your Style With  
              <span className="block bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Premium T-Shirts
              </span>
              For Everyone
            </h1>

            <p className="mt-5 text-gray-600 text-lg md:text-xl">
              Discover trendy and comfortable tees for Men, Women & Kids.  
              Designed for everyday comfort and timeless style.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/shop"
                className="group inline-flex items-center bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white px-7 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/about"
                className="inline-block px-7 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1594633313490-5b6ebd9a3a56?q=80&w=1000&auto=format&fit=crop"
              alt="T-shirt model"
              className="rounded-2xl shadow-xl w-[90%] md:w-[80%] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-cyan-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-10 w-56 h-56 bg-green-300/40 rounded-full blur-3xl"></div>
    </section>
  );
}
