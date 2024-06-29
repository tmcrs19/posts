import { BASE_URL } from "@faceit/lib/config/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["FeedPosts", "Users"],
  endpoints: () => ({}),
});
