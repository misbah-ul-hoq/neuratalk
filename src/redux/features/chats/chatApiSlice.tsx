import { baseApi } from "@/redux/api/api";

const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveChat: builder.mutation({
      query: (credentials) => ({
        url: "/chat",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    tempChat: builder.mutation({
      query: (credentials) => ({
        url: "/chat/temp-chat",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSaveChatMutation, useTempChatMutation } = authApiSlice;
