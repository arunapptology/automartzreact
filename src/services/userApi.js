import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getUserLogin: builder.mutation({
      query(body) {
        return {
          url: `/userLogin`,
          method: "POST",
          body,
        };
      },
    }),
    getUserStocks: builder.mutation({
      query(body) {
        return {
          url: `/userStocksPro`,
          method: "POST",
          body,
        };
      },
    }),
    getDeleteUserStocks: builder.mutation({
      query(body) {
        return {
          url: `/deleteUserStocks`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetUserLoginMutation,
  useGetUserStocksMutation,
  useGetDeleteUserStocksMutation,
} = userApi;
