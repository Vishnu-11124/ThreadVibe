import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL.js";

const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (review) => ({
        url: "/post-review",
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),

    getReviewsCount: builder.query({
      query: () => ({
        url: "/total-review",
      }),
    }),
    getReviewsByUserId: builder.query({
      query: () => ({
        url: '/user-reviews',
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "Reviews", id: result[0]?.email }] : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewApi;
export default reviewApi;
