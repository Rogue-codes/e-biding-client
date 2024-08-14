/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {
  IAuctionResponse,
  IAuctionsResponse,
  IRecommendedResponse,
} from "../interfaces/auction.interface";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const auctionApi = createApi({
  reducerPath: "auctionApi",
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
  tagTypes: [
    "AuctionsID",
    "Auctions",
    "Auction",
    "PENDING-BIDS",
    "RECOMMENDED-BIDS",
  ],
  endpoints: (builder) => ({
    getAuctions: builder.query<
      IAuctionsResponse,
      {
        search?: string;
        limit?: number;
        page?: number;
        filter?: boolean;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: ({ page }) => ({
        url: `/auction/all?page=${page}&limit=10`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Auction"],
    }),
    getAuction: builder.query<
      IAuctionResponse,
      {
        id: any;
      }
    >({
      query: ({ id }) => ({
        url: `/auction/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),

    placeBid: builder.mutation<
      any,
      { auction: any; user: number; bidAmount: number }
    >({
      query: (payload) => {
        return {
          url: `/bid/create`,
          method: "POST",
          body: { ...payload, bidAmount: payload.bidAmount * 1 },
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["PENDING-BIDS"],
    }),

    withdrawBid: builder.mutation<any, { id: any }>({
      query: ({ id }) => {
        return {
          url: `/bid/${id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["PENDING-BIDS"],
    }),

    getPendingBids: builder.query<
      any,
      {
        id: any;
      }
    >({
      query: ({ id }) => ({
        url: `/bid/pending/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["PENDING-BIDS"],
    }),

    getRecomendedBids: builder.query<
      IRecommendedResponse,
      {
        id: any;
      }
    >({
      query: ({ id }) => ({
        url: `/bid/related-bids/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["RECOMMENDED-BIDS"],
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionQuery,
  usePlaceBidMutation,
  useWithdrawBidMutation,
  useGetPendingBidsQuery,
  useGetRecomendedBidsQuery,
} = auctionApi;
