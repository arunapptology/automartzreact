import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getQuickLinks: builder.query({
      query: (id) => `api-web/api/quickLinksBycategory?id=${id}`,
    }),
    getCommunityQuestionShortList: builder.query({
      query: () => `/api-web/Community/QuestionShortList`,
    }),
    getSurvey: builder.query({
      query: () => `/api-web/Api/surveys`,
    }),
    getFaqs: builder.query({
      query: () => `/api-web/Api/faqs`,
    }),
  }),
});

export const {
  useGetQuickLinksQuery,
  useGetCommunityQuestionShortListQuery,
  useGetSurveyQuery,
  useGetFaqsQuery,
} = globalApi;
