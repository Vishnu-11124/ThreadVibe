import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // ✅ Get All Products
    getAllProducts: builder.query({
      query: ({
        category = "all",
        type = "all",
        minPrice = "",
        maxPrice = "",
        page = 1,
        limit = 10,
      }) => ({
        url: "/",
        params: {
          category,
          type,
          minPrice,
          maxPrice,
          page,
          limit,
        },
      }),
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-product/${id}`,
        method: "PATCH", // or PATCH (recommended)
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Products", id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useGetRelatedProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
export default productsApi;
