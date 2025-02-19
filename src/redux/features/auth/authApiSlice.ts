import { baseApi } from "@/redux/api/api";

const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => {
        console.log(credentials);
        return {
          url: "/auth/signup",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserInfo: builder.mutation({
      query: (credentials) => {
        console.log(credentials);
        return {
          url: "/auth/me",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useGetUserInfoMutation,
} = authApiSlice;
