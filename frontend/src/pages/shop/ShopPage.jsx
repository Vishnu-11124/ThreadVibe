import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";

const filters = {
  categories: ["all", "men", "women", "kids"],
  types: ["all", "oversize", "printed", "hoodie", "crop-top", "polo", "full-sleeve"],
  priceRanges: [
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $300", value: "200-300" },
    { label: "Over $300", value: "300-Infinity" },
  ],
};

const ShopPage = () => {
  const [searchItem, setSearchItem] = useState("");

  const [filtersState, setFiltersState] = useState({
    category: "all",
    type: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(16);

  const { category, type, priceRange } = filtersState;

  // ✅ Safe price parsing
  let minPrice = "";
  let maxPrice = "";

  if (priceRange) {
    const parts = priceRange.split("-");
    minPrice = parts[0];
    maxPrice = parts[1] === "Infinity" ? "" : parts[1];
  }

  // ✅ API call
  const { data, error, isLoading } = useGetAllProductsQuery({
    category,
    type,
    minPrice,
    maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  // ✅ Safe data access
  const products = data?.data?.products || [];
  const totalPages = data?.data?.totalPages || 0;
  const totalProducts = data?.data?.totalProducts || 0;

  // ✅ Search filter (frontend)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      type: "all",
      priceRange: "",
    });
    setCurrentPage(1);
  };

  // ✅ Loading & Error states
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error loading products</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-4">
      <section className="max-w-7xl mx-auto flex gap-5">
        
        {/* LEFT FILTER */}
        <div>
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-4/5">
          
          {/* SEARCH */}
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
              Found{" "}
              <span className="text-violet-600 font-semibold">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* PRODUCTS */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Products Available: {filteredProducts.length}
          </h3>

          <ProductCards products={filteredProducts} />

          {/* ✅ Pagination */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
