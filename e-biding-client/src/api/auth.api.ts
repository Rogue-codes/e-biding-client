/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginForm, ILoginResponse } from "../interfaces/user.interface";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<any, { payload: ILoginForm }>({
      query: (payload) => {
        return {
          url: `/user/register`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    verifyOTP: builder.mutation<
      any,
      {
        userId: number;
        token: string;
      }
    >({
      query: (payload) => {
        return {
          url: `/user/verify`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    resendOTP: builder.mutation<
      any,
      {
        userId: number;
      }
    >({
      query: (payload) => {
        return {
          url: `/user/resend-otp`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    login: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: (payload) => {
        return {
          url: `/auth/user/login`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useLoginMutation,
} = authApi;
