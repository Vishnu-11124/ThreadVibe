import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrdersByUserId: builder.query({
            query: () => ({
                url: '/user-orders',
                method: 'GET',
            }),
            })
    })


})

export const { useGetOrdersByUserIdQuery } = orderApi
export default orderApi