import React, { useState } from 'react'
import { formatDate } from '../../../utils/formatDate'
import { Star } from "lucide-react"
import PostReview from './PostReview'

const ReviewCard = ({ reviewData }) => {
  const [openReview, setOpenReview] = useState(false)

  const reviews = reviewData?.reviews || {}
  
  const handleOpenReview = () => setOpenReview(true)
  const handleCloseReview = () => setOpenReview(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Reviews
        </h2>

        <button
          onClick={handleOpenReview}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          Add Review
        </button>
      </div>

      {/* Reviews List */}
      {
        reviews.length > 0 ? (
          <div className="space-y-6">
            {
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                >
                  {/* Top Section */}
                  <div className="flex items-start gap-4">
                    
                    {/* Profile Image */}
                    <img
                      src={review?.userId?.profileImage}
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800">
                          {review?.userId?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(review?.createdAt)}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mt-1">
                        {
                          [...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < review?.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))
                        }
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review?.comment}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )
      }

      {/* Modal */}
      <PostReview
        openReview={openReview}
        handleClose={handleCloseReview}
        productId={reviewData?.product._id}
      />
    </div>
  )
}

export default ReviewCard
