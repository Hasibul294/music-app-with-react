/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import song from "../../assets/audio/Pehla Nasha Pehla khumar Full HD l Udit Narayan,Sadhana sargaml Jo jeeta wohi sikandar.mp3";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <>
      {activeSong?.hub ? (
        <audio
          src={
            activeSong?.hub?.actions ? activeSong?.hub?.actions[1]?.uri : song
          }
          ref={ref}
          loop={repeat}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      ) : (
        <audio
          src={activeSong?.preview_url || song}
          ref={ref}
          loop={repeat}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      )}
    </>
  );
};

export default Player;
