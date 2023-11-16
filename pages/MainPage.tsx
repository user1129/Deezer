import React from "react";
import tracklist from "../assets/trackList.ts";
import style from "./MainPage.module.scss";
import Track from "../components/Track/Track.tsx";
import { Input } from "@mui/material";

type TrackType = {
  id: number;
  src: string;
  preview: string;
  duration: number;
  title: string;
  artists: string;
};

const MainPage: React.FC = () => {
  const [tracks, settracks] = React.useState<TrackType[]>(tracklist);

  const handleChange = (value: string) => {
    if (!value) {
      return tracklist;
    }
    const query = value.toLowerCase();
    const filtered = tracklist.filter(
      (track) =>
        track.title.toLowerCase().includes(query) ||
        track.artists.toLowerCase().includes(query)
    );

    settracks(filtered);
  };

  return (
    <div className={style.search}>
      <Input
        className={style.input}
        placeholder="Поиск треков"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className={style.list}>
        {tracks.map((el: TrackType) => (
          <Track key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
