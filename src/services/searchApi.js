import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getSearchResults: builder.mutation({
      query(body) {
        return {
          url: `/mainSearch`,
          method: "POST",
          body,
        };
      },
    }),
    getVehicleCategory: builder.query({
      query: () => `/category/getVehicleCategory`,
    }),
    getVehicleModel: builder.mutation({
      query(body) {
        return {
          url: `/model/getVehicleModelById`,
          method: "POST",
          body,
        };
      },
    }),
    getVehicleBrand: builder.mutation({
      query(body) {
        return {
          url: `/brand/getBrandNameData`,
          method: "POST",
          body,
        };
      },
    }),
    getFilteredResults: builder.mutation({
      query(body) {
        return {
          url: `/filters/productFilter`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetSearchResultsMutation,
  useGetVehicleCategoryQuery,
  useGetVehicleModelMutation,
  useGetVehicleBrandMutation,
  useGetFilteredResultsMutation,
} = searchApi;
