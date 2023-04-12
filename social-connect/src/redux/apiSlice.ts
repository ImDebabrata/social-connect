import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signupUserType } from "@/components/auth/Signup";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:6001" }),
  //Signup Endpoint
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload: signupUserType) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    //Login Endpoint
    login: builder.mutation({
      query: (payload: any) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    //Google Login Endpoint
    loginGoogle: builder.mutation({
      query: (token: { token: string }) => ({
        url: "/auth/googlelogin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      }),
    }),
    //Verify Otp Endpoint
    verifyOtp: builder.mutation({
      query: (payload: { otp: number; email: string }) => ({
        url: "/auth/verifyotp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
    }),
    //Resend Otp Endpoint
    resendOtp: builder.mutation({
      query: (payload: { email: string }) => ({
        url: "/auth/resendotp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
    }),
    //Post Section Endpoints
    //Get all posts Endpoint
    allPosts: builder.query({
      query: () => "/post",
    }),
    //add new post Endpoint
    newPost: builder.mutation({
      query: (payload) => ({
        url: "/post",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLoginGoogleMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useAllPostsQuery,
  useNewPostMutation,
} = apiSlice;
