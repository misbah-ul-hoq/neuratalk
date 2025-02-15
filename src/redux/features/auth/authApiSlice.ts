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
          url: "/api/v1/auth/signup",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/verify-otp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyOtpMutation } =
  authApiSlice;
