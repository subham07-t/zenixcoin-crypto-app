import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-subscription": "ultra",
  "x-rapidapi-proxy-secret": "c02cea90-4588-11eb-add9-c577b8ecdc8e",
  "x-rapidapi-user": "suprikurniyanto",
  "X-RapidAPI-Key": "b4b402c57cmsh7f4536a0d917805p1d4279jsn5e2a8eca2b8b",
  "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
};

const baseUrl = "https://news-api14.p.rapidapi.com";

const createNewsRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
  method: "GET",
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createNewsRequest(
          `/search?q=${newsCategory}&language=en&pageSize=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
