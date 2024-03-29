import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-white bg-opacity-30 group-hover:flex ${
            (activeSong?.key && activeSong?.key === song?.key) ||
            (activeSong?.name && activeSong?.name === song?.name)
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={
            (song?.images && song?.images?.coverart) ||
            (song?.album?.images && song?.album.images[1]?.url) ||
            "https://img.freepik.com/free-photo/texture-treble-clef-dark-background-isolated-generative-ai_169016-29581.jpg"
          }
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white">
          <Link to={`/song/${song?.key}`}>{song?.title || song?.name}</Link>
        </p>
        <p className="text-sm text-gray-300 mt-1">
          {/* <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          > */}
          <span className="text-[#03DCEB]">Artist:</span>{" "}
          {song?.subtitle || song?.artists[0]?.name || "No artist found"}
          {/* </Link> */}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
