import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signupUserType } from "@/components/auth/Signup";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:6001" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload: signupUserType) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload: any) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
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
  }),
});

export const { useSignupMutation, useLoginMutation, useLoginGoogleMutation } =
  apiSlice;
