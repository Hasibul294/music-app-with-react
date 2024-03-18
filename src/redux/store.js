import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamSongApi } from "./services/shazamSong";

export const store = configureStore({
  reducer: {
    [shazamSongApi.reducerPath]: shazamSongApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamSongApi.middleware),
});
