import { ReactNode, createContext, useState } from "react";
import { TrackType } from "../components/Track/Track";
import trackList from "../assets/trackList";

const audio = new Audio();

interface AudioContextProps {
  audio?: HTMLAudioElement;
  currentTrack: TrackType;
  isAudioPlaying: boolean;
  handleToggleAudio: (track: TrackType) => void;
}

export const AudioContext = createContext<AudioContextProps>({
  currentTrack: trackList[0],
  isAudioPlaying: false,
  handleToggleAudio: () => {},
});

interface AudioProviderProps {
  children: ReactNode;
}

const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<TrackType>(trackList[0]);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const handleToggleAudio = (track: TrackType) => {
    if (currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setIsAudioPlaying(true);

      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();

      return;
    }

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio.play();
      setIsAudioPlaying(true);
    }
  };

  const value = { audio, currentTrack, isAudioPlaying, handleToggleAudio };
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
