/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ILoginForm,
  ILoginResponse,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";
import Cookies from "js-cookie";
import { IForm } from "../views/profile/Profile";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

const token = Cookies.get("client-token");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("client-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<any, { payload: any }>({
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

    updateUser: builder.mutation<IUserResponse, {payload:any,id:any}>({
      query: ({ payload, id }) => {
        return {
          url: `/user/update/${id}`,
          method: "PUT",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    getStatus: builder.query<any, { email: string }>({
      query: ({ email }) => {
        return {
          url: `/user/status/${email}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
          },
        };
      },
    }),

    getUser: builder.query<IUserResponse, { id: any }>({
      query: ({ id }) => {
        return {
          url: `/user/me/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token,
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
  useGetStatusQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
