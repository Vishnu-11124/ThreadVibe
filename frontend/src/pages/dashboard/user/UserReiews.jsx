import React from 'react';
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';

const UserReiews = () => {

  const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery();

  if (isLoading) {
    return <p className="text-center text-gray-400 text-lg mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 text-lg mt-20">No reviews found</p>;
  }

  const reviewData = reviews?.data || [];

  // ✅ handle empty safely
  if (reviewData.length === 0) {
    return <p className="text-center text-gray-400 text-lg mt-20">No reviews available</p>;
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Your Reviews
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {reviewData.map((review, index) => {

          const product = review?.productId;

          return (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">

              {/* ✅ SAFE IMAGE */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={product?.images?.[0] || "https://via.placeholder.com/300"}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col gap-2 flex-1">

                {/* ✅ SAFE NAME */}
                <p className="text-sm font-bold text-gray-900 truncate">
                  {product?.name || "Product not available"}
                </p>

                <p className="text-xs text-gray-300 font-mono truncate">
                  {product?._id || "N/A"}
                </p>

                {/* ⭐ Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {review.comment}
                </p>

                <p className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
                  {review?.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserReiews;
