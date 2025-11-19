import React from 'react';
import { ShoppingBag, Sparkles, TrendingUp, Star, Truck, Shield, RefreshCw, Package, Users, Heart, Award, ChevronRight } from 'lucide-react';
import CategorySection from './CategorySection';
import TrendingProducts from '../shop/TrendingProducts';

export default function Highlight() {
  const categories = [
    {
      title: "Men's Collection",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
      items: "200+ Styles",
      bgGradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Women's Collection",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=400&fit=crop",
      items: "180+ Styles",
      bgGradient: "from-green-500 to-cyan-500"
    },
    {
      title: "Kids Collection",
      image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&h=400&fit=crop",
      items: "120+ Styles",
      bgGradient: "from-cyan-500 to-blue-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      text: "Best t-shirts I've ever bought! The quality is amazing and the fit is perfect. ThreadVibe has become my go-to store."
    },
    {
      name: "Mike Chen",
      role: "Fitness Enthusiast",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      text: "Love the fabric quality and the designs are super trendy. Great prices too! Highly recommend ThreadVibe to everyone."
    },
    {
      name: "Emily Davis",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      text: "Fast delivery and excellent customer service. The t-shirts are comfortable and stylish. Will definitely order again!"
    }
  ];

  const trustFeatures = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% protected checkout"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Certified materials"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-cyan-100">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-semibold text-gray-700">New Collection 2024</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="block text-gray-900">Wear Your</span>
                <span className="block bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Vibe
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Discover premium quality t-shirts that match your style. From casual to trendy, find your perfect fit at ThreadVibe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-bold rounded-xl shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-cyan-300 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop"
                    alt="Featured T-shirt"
                    className="relative rounded-2xl shadow-2xl w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-bold text-cyan-600">Trending</span>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300"></div>
                  <img
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=300&fit=crop"
                    alt="T-shirt style 1"
                    className="relative rounded-xl shadow-lg w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
                  <img
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop"
                    alt="T-shirt style 2"
                    className="relative rounded-xl shadow-lg w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Highlight Section
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-lg text-gray-600">Find the perfect style for everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-96">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm mb-4 opacity-90">{category.items}</p>
                    <button className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.bgGradient} rounded-lg font-semibold transform group-hover:scale-105 transition-all duration-300`}>
                      Explore Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <CategorySection/>
      <TrendingProducts/>

      {/* Trust Building Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 rounded-full text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      {/* <section className="py-20 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">Limited Time Offer</span>
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                Get 30% Off
                <br />
                Your First Order!
              </h2>
              <p className="text-lg text-white/90">
                Sign up now and receive an exclusive discount on your first purchase. Plus, get early access to new collections and special promotions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                  Subscribe Now
                </button>
              </div>
              <p className="text-sm text-white/70">*Valid for new customers only. Terms apply.</p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop"
                alt="Special Offer"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold text-xl px-6 py-3 rounded-full shadow-lg transform rotate-12">
                30% OFF
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Join thousands of happy customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-cyan-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-cyan-300"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">10K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-400">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">50+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">4.9</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}