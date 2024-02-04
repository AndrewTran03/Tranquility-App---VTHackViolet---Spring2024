import { useState, useRef } from "react";
import { HiForward, HiBackward, HiPause, HiPlay } from "react-icons/hi2";
import GentleBreeze from "/src/assets/audio/agentlebreeze.mp3";
import DreamingSeas from "/src/assets/audio/dreamingseas.mp3";
import EveningSakura from "/src/assets/audio/eveningsakura.mp3";
import LoveSerenade from "/src/assets/audio/loveserenade.mp3";
import MeditativeRain from "/src/assets/audio/meditativerain.mp3";
import ReflectedLight from "/src/assets/audio/reflectedlight.mp3";
import WhiteNoise from "/src/assets/audio/whitenoise.mp3";
import GentleBreezePic from "/src/assets/images/agentlebreeze.jpg";
import DreamingSeasPic from "/src/assets/images/dreamingseas.jpg";
import EveningSakuraPic from "/src/assets/images/eveningsakura.jpeg";
import LoveSerenadePic from "/src/assets/images/loveserenade.png";
import MeditativeRainPic from "/src/assets/images/meditativerain.jpg";
import ReflectedLightPic from "/src/assets/images/reflectedlight.png";
import WhiteNoisePic from "/src/assets/images/whitenoise.jpg";
import "../styles/AudioStyles.css";
import Typography from "@mui/material/Typography";

const Audio: React.FC = () => {
  const [play, setPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

  const pictures = [
    {
      title: "A Gentle Breeze",
      src: GentleBreezePic
    },
    {
      title: "Dreaming Seas",
      src: DreamingSeasPic
    },
    {
      title: "Evening Sakura",
      src: EveningSakuraPic
    },
    {
      title: "Love Serenade",
      src: LoveSerenadePic
    },
    {
      title: "Meditative Rain",
      src: MeditativeRainPic
    },
    {
      title: "Reflected Light",
      src: ReflectedLightPic
    },
    {
      title: "White Noise",
      src: WhiteNoisePic
    }
  ];

  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const currentPic = pictures[currentPicIndex];

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
    setCurrentPicIndex((currentPicIndex + 1) % pictures.length);
    setPlay(true);
  };

  const previousSongHandler = () => {
    setCurrentSongIndex((currentSongIndex - 1) % songs.length);
    setCurrentPicIndex((currentPicIndex - 1) % pictures.length);
    setPlay(true);
  };

  return (
    <>
      <audio ref={audioRef} src={currentSong.src} onEnded={songEndHandler}></audio>
      <div className={"image"}>
        <img ref={imageRef} src={currentPic.src} alt={currentPic.title} />
      </div>
      <div className={"title"}>
        <Typography style={{ margin: "15px auto", fontSize: "20px" }}>
          <b>{currentSong.title}</b>
        </Typography>
      </div>
      <div
        className={"button"}
        style={{
          position: "relative",
          top: "0px",
          left: "50%",
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
