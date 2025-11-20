import React from 'react'

const ShopFiltering = ({filters, filtersState, setFiltersState, clearFilters}) => {
  return (
    <div className="flex-shrink-0 w-full md:w-64 bg-white rounded-xl shadow-md p-4 sticky top-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-violet-100">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </h3>
      </div>

      {/* Category Filter */}
      <div className='flex flex-col space-y-2 mb-4'>
        <h4 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 bg-violet-600 rounded-full"></span>
          Category
        </h4>
        <hr className="border-gray-200 mb-2" />
        <div className="space-y-1">
          {
              filters.categories.map((category) => (
                  <label 
                    key={category} 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-violet-50 cursor-pointer transition-all duration-200 group"
                  > 
                      <input 
                        type='radio' 
                        name='category' 
                        id='category' 
                        value={category}
                        checked={filtersState.category === category}
                        onChange={(e) => setFiltersState({...filtersState, category: e.target.value})}
                        className="w-3.5 h-3.5 text-violet-600 border-gray-300 focus:ring-2 focus:ring-violet-500 cursor-pointer"
                      /> 
                      <span className="text-sm text-gray-700 font-medium capitalize group-hover:text-violet-600 transition-colors">
                        {category}
                      </span>
                      {filtersState.category === category && (
                        <svg className="w-3.5 h-3.5 text-violet-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                  </label>
              ))
          }
        </div>
      </div>

      {/* Types Filter */}
      <div className='flex flex-col space-y-2 mb-4'>
        <h4 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
          Types
        </h4>
        <hr className="border-gray-200 mb-2" />
        <div className="space-y-1">
          {
              filters.types.map((type) => (
                  <label 
                    key={type} 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-all duration-200 group"
                  > 
                      <input 
                        type='radio' 
                        name='type' 
                        id='type' 
                        value={type}
                        checked={filtersState.type === type}
                        onChange={(e) => setFiltersState({...filtersState, type: e.target.value})}
                        className="w-3.5 h-3.5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                      /> 
                      <span className="text-sm text-gray-700 font-medium capitalize group-hover:text-purple-600 transition-colors">
                        {type}
                      </span>
                      {filtersState.type === type && (
                        <svg className="w-3.5 h-3.5 text-purple-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                  </label>
              ))
          }
        </div>
      </div>

      {/* Price Range Filter */}
      <div className='flex flex-col space-y-2 mb-4'>
        <h4 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
          <span className="w-1 h-4 bg-pink-600 rounded-full"></span>
          Price Range
        </h4>
        <hr className="border-gray-200 mb-2" />
        <div className="space-y-1">
          {
              filters.priceRanges.map((range) => (
                  <label 
                    key={range.label} 
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-pink-50 cursor-pointer transition-all duration-200 group"
                  > 
                      <input 
                        type='radio' 
                        name='priceRange' 
                        id='priceRange' 
                        value={`${range.min}-${range.max}`}
                        checked={filtersState.priceRange === `${range.min}-${range.max}`}
                        onChange={(e) => setFiltersState({...filtersState, priceRange: e.target.value})}
                        className="w-3.5 h-3.5 text-pink-600 border-gray-300 focus:ring-2 focus:ring-pink-500 cursor-pointer"
                      /> 
                      <span className="text-sm text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                        {range.label}
                      </span>
                      {filtersState.priceRange === `${range.min}-${range.max}` && (
                        <svg className="w-3.5 h-3.5 text-pink-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                  </label>
              ))
          }
        </div>
      </div>

      {/* Clear Button */}
      <button 
        onClick={clearFilters}
        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Clear All Filters
      </button>
    </div>
  )
}

export default ShopFiltering