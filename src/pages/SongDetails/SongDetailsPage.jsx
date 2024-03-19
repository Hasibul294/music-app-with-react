import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../../redux/services/shazamSong";
import DetailsHeader from "../../components/ui/DetailsHeader";
import RelatedSongs from "../../components/ui/RelatedSongs";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //   const {
  //     data,
  //     isFetching: isFetchinRelatedSongs,
  //     error,
  //   } = useGetSongRelatedQuery({ songid });
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  const lyricsId =
    songData?.resources["shazam-songs"][songid]?.relationships?.lyrics?.data[0]
      ?.id;

  const lyrics = songData?.resources?.lyrics[lyricsId]?.attributes?.text;

  const artistInfo = songData?.resources["shazam-songs"][songid]?.attributes;

  console.log(artistInfo);

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistInfo={artistInfo} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {lyrics ? (
            lyrics.map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className="text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>
      {/* 
      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}
    </div>
  );
};

export default SongDetails;
