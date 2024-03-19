import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TrendingNow from "./pages/TrendingNow/TrendingNowPage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import SongDetails from "./pages/SongDetails/SongDetailsPage.jsx";
import RecommendationPage from "./pages/Recommendation/RecommendationPage.jsx";
import TopArtistPage from "./pages/TopArtist/TopArtistPage.jsx";
import Search from "./pages/Search/SearchPage.jsx";
import Error from "./components/ui/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/trending-now",
        element: <TrendingNow></TrendingNow>,
      },
      {
        path: "/song/:songid",
        element: <SongDetails></SongDetails>,
      },
      {
        path: "/recommendation",
        element: <RecommendationPage></RecommendationPage>,
      },
      {
        path: "/top-artists",
        element: <TopArtistPage></TopArtistPage>,
      },
      {
        path: "/search/:searchTerm",
        element: <Search></Search>,
      },
      {
        path: "*",
        element: <Error></Error>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
  // </React.StrictMode>
);
