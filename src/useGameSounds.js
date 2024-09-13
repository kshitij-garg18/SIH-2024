import { useRef } from "react";

const useGameSounds = () => {
  const backgroundStartSound = useRef(new Audio("/audio/background-start.mp3"));
  const thinkingSound = useRef(new Audio("/audio/thinking.mp3"));
  const correctSound = useRef(new Audio("/audio/correct-answer.mp3"));
  const wrongSound = useRef(new Audio("/audio/wrong-answer.mp3"));
  const winningSound = useRef(new Audio("/audio/winning.mp3"));

  const playBackgroundStart = () => {
    backgroundStartSound.current.loop = true;
    backgroundStartSound.current.play();
  };

  const stopBackgroundStart = () => {
    backgroundStartSound.current.pause();
    backgroundStartSound.current.currentTime = 0; // Reset to start
  };

  const playThinkingSound = () => {
    thinkingSound.current.play();
  };

  const stopThinkingSound = () => {
    thinkingSound.current.pause();
    thinkingSound.current.currentTime = 0; // Reset to start
  };

  const playCorrectSound = () => {
    correctSound.current.play();
  };

  const playWrongSound = () => {
    wrongSound.current.play();
  };

  const playWinningSound = () => {
    winningSound.current.play();
  };

  return {
    playBackgroundStart,
    stopBackgroundStart,
    playThinkingSound,
    stopThinkingSound,
    playCorrectSound,
    playWrongSound,
    playWinningSound,
  };
};

export default useGameSounds;
