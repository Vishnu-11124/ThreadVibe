import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        const data = {
            username,
            email,
            password
        }
        console.log(data)
    }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 px-4 py-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
            {/* Card Container */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                {/* Logo/Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h2>
                <p className="text-center text-gray-500 mb-8">Join us and start shopping today!</p>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Username Input */}
                    <div className="relative group">
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input 
                                type="text"
                                placeholder='Choose a username..'
                                name='username'
                                id='username' 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input 
                                type="email"
                                placeholder='Enter your email..'
                                name='email'
                                id='email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 transition-all duration-300 text-gray-800"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative group">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input 
                                type="password"
                                placeholder='Create a strong password..'
                                name='password'
                                id='password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800"
                                required
                            />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters long</p>
                    </div>

                    {/* Error/Success Message */}
                    {
                        message && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-700 text-sm font-medium">{message}</p>
                                </div>
                            </div>
                        )
                    }

                    {/* Terms and Conditions */}
                    {/* <div className="flex items-start gap-3">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            required
                            className="mt-1 w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-2 focus:ring-cyan-500"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the 
                            <Link to="/terms" className="text-cyan-600 hover:text-cyan-700 font-semibold mx-1">
                                Terms and Conditions
                            </Link>
                            and
                            <Link to="/privacy" className="text-cyan-600 hover:text-cyan-700 font-semibold mx-1">
                                Privacy Policy
                            </Link>
                        </label>
                    </div> */}

                    {/* Submit Button */}
                    <button 
                        type='submit'
                        className="w-full py-4 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 hover:from-green-600 hover:via-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>Create Account</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account? 
                        <Link 
                            to='/login' 
                            className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 hover:from-green-600 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300"
                        >
                            Login here
                        </Link>
                    </p>
                </div>

                {/* Divider */}
                {/* <div className="mt-6 flex items-center">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-4 text-xs text-gray-400">Quick Sign Up</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div> */}

                {/* Social Sign Up Buttons */}
                {/* <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#4285F4">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-800 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">GitHub</span>
                    </button>
                </div> */}
            </div>

            {/* Footer Text */}
            {/* <p className="text-center mt-6 text-sm text-gray-500">
                © 2024 T-Shirt Store. All rights reserved.
            </p> */}
        </div>

        <style jsx>{`
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
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
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .animate-shake {
                animation: shake 0.3s ease-in-out;
            }
        `}</style>
    </section>
  )
}

export default Register