import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../../redux/services/shazamSong";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";
import SongCard from "../../components/ui/SongCard";

// import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
const TrendingNow = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const trendingSong = data?.tracks?.slice(12, 20);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Trending Now
        </h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {trendingSong?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={trendingSong}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
