import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={
          (activeSong?.images && activeSong?.images?.coverart) ||
          (activeSong?.album?.images && activeSong?.album.images[1]?.url) ||
          "https://img.freepik.com/free-photo/texture-treble-clef-dark-background-isolated-generative-ai_169016-29581.jpg"
        }
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title || activeSong?.name || "No name found"}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle || activeSong?.artists[0]?.name || "N/A"}
      </p>
    </div>
  </div>
);

export default Track;
