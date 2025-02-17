import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://neuratalk-api-ten.vercel.app/api/v1";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) headers.set("authToken", authToken);
      return headers;
    },
  }),

  endpoints: () => ({}),
});
