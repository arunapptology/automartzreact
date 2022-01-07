import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadStocksApi = createApi({
  reducerPath: "uploadStocksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getVehicleTypes: builder.query({
      query: () => `/vehicleType`,
    }),

    getVehicleBrands: builder.mutation({
      query(body) {
        return {
          url: `/vehiclebrandData`,
          method: "POST",
          body,
        };
      },
    }),

    getVehicleModels: builder.mutation({
      query(body) {
        return {
          url: `/vehiclebrandcatType`,
          method: "POST",
          body,
        };
      },
    }),
    getUploadUserStocks: builder.mutation({
      query(body) {
        return {
          url: `/stock/AddUserStockCatAll`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetVehicleTypesQuery,
  useGetVehicleBrandsMutation,
  useGetVehicleModelsMutation,
  useGetUploadUserStocksMutation,
} = uploadStocksApi;
