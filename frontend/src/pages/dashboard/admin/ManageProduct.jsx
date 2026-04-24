import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../redux/features/products/productApi";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const { data, error, isLoading } = useGetAllProductsQuery({
    category: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data?.products || [];
  const totalPages = data?.data?.totalPages || 0;
  const totalProducts = data?.data?.totalProducts || 0;

  const startProduct = (currentPage - 1) * productsPerPage;
  const endProduct = startProduct + products.length;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      Toastify({
        text: "Product deleted successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#22c55e",
      }).showToast();
    } catch (error) {
      Toastify({
        text: "Error deleting product",
        duration: 3000,
        backgroundColor: "#ef4444",
      }).showToast();
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading products
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Product Management
        </h2>
      </div>

      {/* Info */}
      <div className="mb-4 text-gray-600">
        Showing {startProduct + 1} to {endProduct} of {totalProducts} products
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-center">Edit</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  {startProduct + index + 1}
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {formatDate(product.createdAt)}
                </td>

                <td className="px-6 py-4 text-center">
                  <Link
                    to={`/dashboard/update-products/${product._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      handleDeleteProduct(product._id)
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No products found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;
