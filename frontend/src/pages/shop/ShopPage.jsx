import React, { useEffect, useState } from 'react'
import productsData from '../../data/products'
import ProductCards from '../shop/ProductCards'
import ShopFiltering from './ShopFiltering'


const filters = {
    categories: ["all", "men", "women", "kids"],
    types: ["all", "oversize", "printed", "hoodie", "crop-top", "polo", "full-sleeve"],
    priceRanges: [
        {label: 'Under $50', min: 0, max: 50},
        {label: '$50 - $100', min: 50, max: 100},
        {label: '$100 - $200', min: 100, max: 200},
        {label: '$200 - $300', min: 200, max: 300},
        {label: 'Over $300', min: 300, max: Infinity}
    ]
}

const ShopPage = () => {
    const [searchItem, setSearchItem] = useState('')
    const [products, setProducts] = useState(productsData)
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        type: 'all',
        priceRange: ''
    })

    // filtering function
    const applyFilters = () => {
        let filteredProducts = productsData;

        if(filtersState.category && filtersState.category !== 'all'){
            filteredProducts = filteredProducts.filter((product) => product.category === filtersState.category)
        }

        if(filtersState.type && filtersState.type !== 'all'){
            filteredProducts = filteredProducts.filter((product) => product.type === filtersState.type)
        }

        if(filtersState.priceRange){
            const [min, max] = filtersState.priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter((product) => product.price >= min && product.price <= max)
        }

        filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(searchItem.toLowerCase()))

        setProducts(filteredProducts)     
        
    }

    useEffect(() => {
        applyFilters()
    }, [filtersState, searchItem])


    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            type: 'all',
            priceRange: ''
        })
    }
    
  return (
  <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-4">
    
    <section className="max-w-7xl mx-auto flex gap-5">
      
      {/* LEFT FILTER SECTION */}
      <div>   
        <ShopFiltering
          filters={filters}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
          clearFilters={clearFilters}
        />
      </div>

      {/* RIGHT PRODUCTS SECTION */}
      <div className="w-full md:w-4/5">

        {/* SEARCH BOX */}
        <div className="bg-white shadow-xl rounded-xl p-5 mb-5">
          <div className="relative">
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search products..."
              className="w-full px-5 py-3 pl-12 text-lg border-2 border-gray-200 rounded-xl 
                         focus:outline-none focus:border-violet-500 focus:ring-4 
                         focus:ring-violet-100 transition-all duration-300"
            />

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
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

          <p className="text-gray-600 text-md mt-3">
            Found 
            <span className="text-violet-600 font-semibold"> {products.length} </span>
            products
          </p>
        </div>

        {/* PRODUCTS */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Products Available: {products.length}
        </h3>

        <ProductCards products={products} />
      </div>

    </section>
  </div>
);

}

export default ShopPage
