import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  (isPlaying && activeSong?.title && activeSong?.title === song.title) ||
  (activeSong?.name && activeSong?.name === song.name) ? (
    <FaPauseCircle size={40} className="text-blue-400" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={40} className="text-blue-400" onClick={handlePlay} />
  );

export default PlayPause;
