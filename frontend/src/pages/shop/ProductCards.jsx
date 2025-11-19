import React from 'react'
import { Link } from 'react-router-dom'


const ProductCards = ({products}) => {
    
  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            products.map((product) => (
                <div key={product.id} className="group">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <Link to={`/shop/${product.id}`}>
                        <div className="relative overflow-hidden bg-gray-50">
                            <img  
                              src={product.images} 
                              alt={product.name} 
                              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-5">
                            <h1 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors duration-200">
                              {product.name}
                            </h1>
                            <div className='flex gap-2 mb-4 flex-wrap'>
                                <h2 className="text-xs font-semibold bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-3 py-1.5 rounded-full">
                                  {product.brand}
                                </h2>
                                <h2 className="text-xs font-semibold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-3 py-1.5 rounded-full">
                                  {product.type}
                                </h2>
                            </div>
                            <p className="text-base text-gray-700 font-medium">
                              Price: <b className="text-2xl font-bold text-violet-700">${product.price}</b> 
                              <strike className="text-sm text-gray-400 ml-2">${product.oldPrice}</strike>
                            </p>
                        </div>
                        </Link>
                    </div>
                </div>    
            ))
        }
      </div>
    </div>
  )
}

export default ProductCards