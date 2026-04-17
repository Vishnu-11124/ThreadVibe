import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartModel from '../pages/shop/CartModel';
import userdemo from '../assets/userdemo.jpg'
import { useLogoutUserMutation } from  "../redux/features/auth/authApi"
import { logout } from '../redux/features/auth/authSlice';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = useSelector((state) => state.cart.products)
  
  const cartCount = products.length

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  // console.log(user)

  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropdownOpen)
  }

  // admin dropdown
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin"},
    { label: "Manage Items", path: "/dashboard/manage-products"},
    { label: "All Orders", path: "/dashboard/manage-orders"},
    { label: "Add Product", path: "/dashboard/add-product"},
    { label: "Manage Users", path: "/dashboard/users"},
  ]

  // user dropdown
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard"},
    { label: "Profile", path: "/dashboard/profile"},
    { label: "Payments", path: "/dashboard/payments"},
    { label: "Orders", path: "/dashboard/orders"},
  ]

  const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

  const [ logoutUser ] = useLogoutUserMutation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.error("Failed to logout")
    }
  }

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
            <Link
              to="/"
              className="text-gray-700 hover:text-cyan-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
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

            {/* Cart Icon with Badge */}
            {/* <Link 
              to="/cart" 
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link> */}

            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login/Profile Icon */}

            {user ? (
              <div className="relative">
                {/* Profile Image */}
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || userdemo}
                  alt="user profile"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                />

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-md z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            to={menu.path}
                            className="block px-4 py-2 hover:bg-gray-100 transition"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
              >
                <User className="w-5 h-5" />
              </a>
            )}

            {/* <a
              href="/login"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <User className="w-5 h-5" />
            </a> */}
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon */}
            {/* <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:shadow-lg transition-all duration-200"
            >
              <ShoppingCart className="w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link> */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

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

      {isCartOpen && (
        <CartModel
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Shop
            </Link>
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
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-3 px-3 py-2 w-full rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-medium hover:shadow-lg transition-all duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="mt-3 border-t pt-3">
                {/* Profile Info */}
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    src={user?.profileImage || userdemo}
                    alt="user"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="mt-2 space-y-1">
                  {dropDownMenus.map((menu, index) => (
                    <Link
                      key={index}
                      to={menu.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      {menu.label}
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left mt-2 px-3 py-2 text-red-500 hover:bg-red-50 text-sm rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}