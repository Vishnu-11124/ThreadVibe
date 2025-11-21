import React from 'react'
import { useParams } from 'react-router-dom'


const SingleProduct = () => {
  const { id } = useParams()
  
  return (
    <>
     {/* Product details */}
      <section className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-10'>
        <div className="md:w-1/2 group">
          <img 
            src="https://dummyimage.com/400x500/228b22/fff&text=Kids+Hoodie" 
            alt="" 
            className="w-90 h-auto rounded-2xl shadow-lg object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Name</h2>
          <p className="text-gray-600 leading-relaxed mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, beatae.</p>
          <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-700">brand: <strong className="text-cyan-600">brand name</strong></p>
            <p className="text-gray-700">category: <strong className="text-cyan-600">category name</strong></p>
            <p className="text-gray-700">type: <strong className="text-cyan-600">type name</strong></p>
            <p className="text-gray-700 flex items-center gap-2">Rating: <strong className="text-yellow-500 flex items-center gap-1">4.5 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg></strong></p>
          </div>
          <div className='flex gap-3 mb-6'>
            <button className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold transition-all duration-200">S</button>
            <button className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white font-semibold transition-all duration-200">M</button>
            <button className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-500 hover:text-white font-semibold transition-all duration-200">L</button>
          </div>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 mb-6">Price <s className="text-gray-400 text-lg font-normal ml-2">$100</s></p>
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 hover:from-green-600 hover:via-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            Add To Cart
          </button>
        </div>    
      </section>
      {/* Related products */}
      <div className="max-w-6xl mx-auto px-4 py-10 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-cyan-500 rounded-full"></span>
          Related Products
        </h3>
      </div>
      {/* Product reviews */}
      <section className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 rounded-2xl mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
          Reviews Here
        </h3>
      </section>
    </>
  )
}

export default SingleProduct