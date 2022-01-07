import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getLatestNews: builder.query({
      query: () => `/news/latestnews`,
    }),
    getLatestNewsDetails: builder.query({
      query: (slug) => `/news/latestnewsdetail?slug=${slug}`,
    }),
    getLatestLaunches: builder.query({
      query: () => `/news/autotendsnews`,
    }),
    getLatestLaunchesDetails: builder.query({
      query: (slug) => `/news/autotendsnewsById?slug=${slug}`,
    }),
    getNationalEvents: builder.query({
      query: () => `/news/getNatevent`,
    }),
    getNationalEventsDetails: builder.query({
      query: (slug) => `/news/getNateventDetail?slug=${slug}`,
    }),
    getInternationalEvents: builder.query({
      query: () => `/news/getInterevent`,
    }),
    getInternationalEventsDetails: builder.query({
      query: (slug) => `/news/getIntereventDetail?slug=${slug}`,
    }),
  }),
});

export const {
  useGetLatestNewsQuery,
  useGetLatestNewsDetailsQuery,
  useGetLatestLaunchesQuery,
  useGetLatestLaunchesDetailsQuery,
  useGetNationalEventsQuery,
  useGetNationalEventsDetailsQuery,
  useGetInternationalEventsQuery,
  useGetInternationalEventsDetailsQuery,
} = newsApi;
