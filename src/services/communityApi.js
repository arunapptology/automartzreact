import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getCommunityList: builder.mutation({
      query(body) {
        return {
          url: `/community/CommentByQId`,
          method: "POST",
          body,
        };
      },
    }),
    getAddedCommunityQuestion: builder.mutation({
      query(body) {
        return {
          url: `/community/AddQuestion`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetCommunityListMutation,
  useGetAddedCommunityQuestionMutation,
} = communityApi;
