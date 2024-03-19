import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SongCard from "../../components/ui/SongCard";
import Loader from "../../components/ui/Loader";
import Error from "../../components/ui/Error";

const RecommendationPage = () => {
  const [recommendationSong, setRecommendationData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, serError] = useState(false);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/recommendations/",
    params: {
      limit: "20",
      seed_tracks: "0c6xIDDpzE81m2q797ordA",
      seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
      seed_genres: "classical,country",
    },
    headers: {
      "X-RapidAPI-Key": "3b315a8abemshb2396d06d53287fp16439cjsn0a287880511b",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchRecommendationSong = async () => {
      try {
        const res = await axios.request(options);
        setIsLoading(false);
        setRecommendationData(res.data);
      } catch (error) {
        setIsLoading(false);
        serError(true);
        console.error(error);
      }
    };

    fetchRecommendationSong();
  }, []);

  if (isLoading) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Recommendation for you{" "}
          <span className="text-[#03DCEB] font-semibold italic">
            Our most famous tracks
          </span>
        </h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {recommendationSong?.tracks?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={recommendationSong.tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationPage;
