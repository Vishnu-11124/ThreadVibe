import React, { useState } from "react";
import ProductCards from "./ProductCards";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + 4);
  };

  const currentPage = 1;

  const [filtersState, setFiltersState] = useState({
    category: "all",
    type: "all",
    priceRange: "",
  });

  const { category, type, priceRange } = filtersState;
  let minPrice = "";
  let maxPrice = "";

  const { data, error, isLoading } = useGetAllProductsQuery({
    category,
    type,
    minPrice,
    maxPrice,
    page: currentPage,
    limit: visibleProducts,
  });
  const products = data?.data?.products || [];

  return (
    <section className="py-14 max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Trending Products</h2>
        <p className="text-gray-600 mt-2">
          Check out what people are loving this week!
        </p>
      </div>

      {/* Product List */}
      <div>
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* Load More Button */}
      {visibleProducts < products.length && (
        <div className="text-center mt-10">
          <button
            onClick={loadMoreProducts}
            className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/80 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
