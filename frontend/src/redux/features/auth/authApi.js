import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/auth`,

  // IMPORTANT for cookies
  credentials: "include",

  // IMPORTANT fallback for token-based auth
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["user"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMountOrArgChange: true,
      providesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["user"],
    }),

    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/editprofile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;

export default authApi;
