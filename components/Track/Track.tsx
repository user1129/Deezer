import React from "react";
import style from "./track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import TimeFormat from "../../utils/TimeFormat";
import { AudioContext } from "../../context/AudioContext";
import cn from "classnames";

export type TrackType = {
  id: number;
  src: string;
  preview: string;
  duration: number;
  title: string;
  artists: string;
};

const Track: React.FC<TrackType> = (track) => {
  const { handleToggleAudio, currentTrack, isAudioPlaying } =
    React.useContext(AudioContext);
  const { preview, duration, title, artists } = track;
  const formattedDuration = TimeFormat(duration);
  const isCurrentTrack = currentTrack.id === track.id;
  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isCurrentTrack && isAudioPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt="" />
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{formattedDuration}</p>
    </div>
  );
};

export default Track;
