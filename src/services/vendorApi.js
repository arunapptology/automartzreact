import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getVendorSignup: builder.mutation({
      query(body) {
        return {
          url: `/vendor-registration`,
          method: "POST",
          body,
        };
      },
    }),
    getVendorLogin: builder.mutation({
      query(body) {
        return {
          url: `/Vendorlogin`,
          method: "POST",
          body,
        };
      },
    }),
    getVendorStocks: builder.mutation({
      query(body) {
        return {
          url: `/vendorStocksPro`,
          method: "POST",
          body,
        };
      },
    }),
    getDeleteVendorStocks: builder.mutation({
      query(body) {
        return {
          url: `/deleteVendorStock`,
          method: "POST",
          body,
        };
      },
    }),
    getVendorsList: builder.mutation({
      query(body) {
        return {
          url: `/vendor/vendorList`,
          method: "POST",
          body,
        };
      },
    }),
    getMostVisitedVendors: builder.query({
      query: () => `/vendor/mostvisit`,
    }),
    getLatestVendors: builder.query({
      query: () => `/vendor/latest-vendor`,
    }),
    getVendorInfo: builder.mutation({
      query(body) {
        return {
          url: `/vendor/getUserInfoByIdWeb`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetVendorSignupMutation,
  useGetVendorLoginMutation,
  useGetVendorStocksMutation,
  useGetDeleteVendorStocksMutation,
  useGetVendorsListMutation,
  useGetMostVisitedVendorsQuery,
  useGetLatestVendorsQuery,
  useGetVendorInfoMutation,
} = vendorApi;
