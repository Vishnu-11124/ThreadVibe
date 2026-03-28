import React, { useState } from "react";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import { Star } from "lucide-react";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const PostReview = ({ openReview, handleClose, productId }) => {
  const [postReview, { isLoading }] = usePostReviewMutation();
  // console.log(productId)

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // ⭐ Clear review
  const handleClearReview = () => {
    setComment("");
    setRating(0);
  };

  // ⭐ Submit review
  const handlePostReview = async (e) => {
    e.preventDefault();

    if (!comment || !rating) {
      alert("Please add comment and rating");
      return;
    }

    try {
      const newReview = {
        comment,
        rating,
        productId, // ✅ only this (no userId)
      };

      await postReview(newReview).unwrap();

      Toastify({
        text: "✅ Your review has been submitted successfully!",
        duration: 3000,
        gravity: "top", // top or bottom
        position: "right", // left, center, right
        backgroundColor: "#22c55e", // green
        stopOnFocus: true,
      }).showToast();

      handleClearReview();
      handleClose();
    } catch (error) {
      console.log(error)
      Toastify({
        text: "❌ Failed to post review. Please try again.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ef4444", // red
      }).showToast();
    }
  };

  return (
    <div
      className={`${openReview ? "fixed inset-0 flex items-center justify-center bg-black/50 z-50" : "hidden"}`}
    >
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Post Review</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* ⭐ Rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer transition ${
                star <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* ✍️ Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          rows={4}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClearReview}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Clear
          </button>

          <button
            onClick={handlePostReview}
            disabled={isLoading}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
