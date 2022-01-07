import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getProductDetails: builder.mutation({
      query(body) {
        return {
          url: `/products/productDetails`,
          method: "POST",
          body,
        };
      },
    }),
    getMostVisitedProducts: builder.query({
      query: () => `/products/mostVisitedProductCount`,
    }),
    getStockPromotion: builder.query({
      query: () => `/stocks/getvanstockinfo`,
    }),
    getStockPrmotionDetail: builder.mutation({
      query(body) {
        return {
          url: `/stocks/getvanstockinfoById`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetProductDetailsMutation,
  useGetMostVisitedProductsQuery,
  useGetStockPromotionQuery,
  useGetStockPrmotionDetailMutation,
} = productsApi;
