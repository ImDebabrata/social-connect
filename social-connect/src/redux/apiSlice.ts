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
    loginGoogle: builder.mutation({
      query: (token: string) => ({
        url: "/auth/googlelogin",
        method: "POST",
        body: token,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginGoogleMutation } = apiSlice;
