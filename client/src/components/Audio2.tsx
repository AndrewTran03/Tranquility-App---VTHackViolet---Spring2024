import { useState, useRef } from "react";
import { HiForward, HiBackward, HiPause, HiPlay } from "react-icons/hi2";
import GentleBreeze from "/src/assets/audio/agentlebreeze.mp3";
import DreamingSeas from "/src/assets/audio/dreamingseas.mp3";
import EveningSakura from "/src/assets/audio/eveningsakura.mp3";
import LoveSerenade from "/src/assets/audio/loveserenade.mp3";
import MeditativeRain from "/src/assets/audio/meditativerain.mp3";
import ReflectedLight from "/src/assets/audio/reflectedlight.mp3";
import WhiteNoise from "/src/assets/audio/whitenoise.mp3";
import "../styles/AudioStyles.css";

const Audio: React.FC = () => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    {
      title: "A Gentle Breeze",
      src: GentleBreeze
    },
    {
      title: "Dreaming Seas",
      src: DreamingSeas
    },
    {
      title: "Evening Sakura",
      src: EveningSakura
    },
    {
      title: "Love Serenade",
      src: LoveSerenade
    },
    {
      title: "Meditative Rain",
      src: MeditativeRain
    },
    {
      title: "Reflected Light",
      src: ReflectedLight
    },
    {
      title: "White Noise",
      src: WhiteNoise
    }
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  const playPauseHandler = () => {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      audioRef.current?.play();
      setPlay(true);
    }
  };
  const songEndHandler = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);

    setPlay(true);
  };

  const previousSongHandler = () => {
    setCurrentSongIndex((currentSongIndex - 1) % songs.length);

    setPlay(true);
  };

  return (
    <>
      <audio ref={audioRef} src={currentSong.src} onEnded={songEndHandler}></audio>
      <div
        className={"button"}
        style={{
          position: "relative",
          top: "-120px",
          left: "97%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px"
        }}
      >
        <button onClick={previousSongHandler}>
          <HiBackward />
        </button>
        <button onClick={playPauseHandler}>{play ? <HiPause></HiPause> : <HiPlay></HiPlay>}</button>
        <button onClick={songEndHandler}>
          <HiForward />
        </button>
      </div>
    </>
  );
};

export default Audio;
