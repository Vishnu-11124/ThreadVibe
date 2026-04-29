import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { SlidersHorizontal } from "lucide-react";

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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const [filtersState, setFiltersState] = useState({
    category: "all",
    type: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(16);

  const { category, type, priceRange } = filtersState;

  let minPrice = "";
  let maxPrice = "";
  if (priceRange) {
    const parts = priceRange.split("-");
    minPrice = parts[0];
    maxPrice = parts[1] === "Infinity" ? "" : parts[1];
  }

  const { data, error, isLoading } = useGetAllProductsQuery({
    category, type, minPrice, maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  const products = data?.data?.products || [];
  const totalPages = data?.data?.totalPages || 0;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const clearFilters = () => {
    setFiltersState({ category: "all", type: "all", priceRange: "" });
    setCurrentPage(1);
  };

  // Count active filters for badge
  const activeFilterCount = [
    filtersState.category !== "all",
    filtersState.type !== "all",
    filtersState.priceRange !== "",
  ].filter(Boolean).length;

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error loading products</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Search + mobile filter button ── */}
        <div className="bg-white shadow-md rounded-xl p-4 mb-5 flex items-center gap-3">

          {/* Search input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search products..."
              className="w-full px-5 py-3 pl-11 text-base border-2 border-gray-200 rounded-xl
                         focus:outline-none focus:border-violet-500 focus:ring-4
                         focus:ring-violet-100 transition-all duration-300"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Mobile filter button — hidden on desktop */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="md:hidden relative flex items-center gap-2 px-4 py-3 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors duration-200 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4 px-1">
          Showing <span className="text-violet-600 font-semibold">{filteredProducts.length}</span> products
        </p>

        {/* ── Main layout ── */}
        <div className="flex gap-6">

          {/* LEFT FILTER — desktop only */}
          <aside className="hidden md:block w-64 shrink-0">
            <ShopFiltering
              filters={filters}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
            />
          </aside>

          {/* RIGHT PRODUCTS */}
          <div className="flex-1 min-w-0">
            <ProductCards products={filteredProducts} />

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}

      {/* Backdrop */}
      {isFilterDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsFilterDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50 md:hidden
          bg-white rounded-t-2xl shadow-2xl
          transform transition-transform duration-300 ease-in-out
          max-h-[85vh] overflow-y-auto
          ${isFilterDrawerOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* Drawer handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-violet-600" />
            Filters
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-violet-100 text-violet-700 rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter content */}
        <div className="px-5 py-4">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
        </div>

        {/* Apply button */}
        <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-gray-100">
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;