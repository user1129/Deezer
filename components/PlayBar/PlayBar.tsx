import React from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./PlayBar.module.scss";
import { IconButton, Slider } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import TimeFormat from "../../utils/TimeFormat";

const OptimizeRenderComponent = () => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const { audio, currentTrack } = React.useContext(AudioContext);
  const { duration } = currentTrack;

  const handleChangeSlider = (_, value: number) => {
    const time = Math.round((value / 100) * duration);
    setCurrentTime(time);
    if (audio) {
      audio.currentTime = time;
    }
  };
  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(audio?.currentTime || 0);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <React.Fragment>
      <p>{TimeFormat(currentTime)}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={handleChangeSlider}
      />
    </React.Fragment>
  );
};

const PlayBar: React.FC = () => {
  const { currentTrack, handleToggleAudio, isAudioPlaying } =
    React.useContext(AudioContext);

  const { title, artists, preview, duration } = currentTrack;

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isAudioPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <OptimizeRenderComponent />
        <p>{TimeFormat(duration)}</p>
      </div>
    </div>
  );
};

export default PlayBar;
