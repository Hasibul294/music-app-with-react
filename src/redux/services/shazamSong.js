import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamSongApi = createApi({
  reducerPath: "shazamSongApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "3b315a8abemshb2396d06d53287fp16439cjsn0a287880511b"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "charts/track" }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search?term=${searchTerm}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `shazam-songs/get-details?id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamSongApi;
