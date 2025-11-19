import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from "../../data/products.json"
import ProductCards from '../shop/ProductCards'

const CategoryPage = () => {
    const {categoryName} = useParams()
    // console.log(categoryName)
    const [filteredProducts, setFilteredProducts] = useState([])

    const [searchItem, setSearchItem] = useState('')

    useEffect(() => {
        const filtered = products.filter((product) => product.category === categoryName.toLowerCase()).filter((product) => product.name.toLowerCase().includes(searchItem.toLowerCase()))

        setFilteredProducts(filtered)
    }, [searchItem])
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500text-white py-16 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center capitalize tracking-tight">
            {categoryName}'s Collection
          </h1>
          <p className="text-center text-violet-100 mt-4 text-lg">
            Discover amazing products just for you
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input 
                type="text" 
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 shadow-sm"
              />
              <svg 
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            {/* <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500  to-cyan-500 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              Search
            </button> */}
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-center md:text-left">
            <p className="text-gray-600 font-medium">
              Found <span className="text-violet-600 font-bold text-lg">{filteredProducts.length}</span> products
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts}/>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-6">
              <svg 
                className="w-20 h-20 text-gray-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500">Try adjusting your search or browse other categories</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage