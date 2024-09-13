import React, { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import NameInput from "./NameInput";
import QuizSettings from "./QuizSettings";
import Questions from "./Questions";
import QuestionProvider from "./QuestionProvider";
import useGameSounds from "./useGameSounds"; // Import the custom sound hook
import "./App.css";

function App() {
  const [isStartScreen, setIsStartScreen] = useState(true); // Manage the start screen
  const [userName, setUserName] = useState("");
  const [quizSettings, setQuizSettings] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const { playBackgroundStart, stopBackgroundStart } = useGameSounds(); // Use the sound hook

  // Play background music after clicking the "Take Quiz" button
  const handleStartQuiz = () => {
    playBackgroundStart();
    setIsStartScreen(false);
  };

  // Stop background music when the quiz starts
  useEffect(() => {
    if (isQuizStarted) {
      stopBackgroundStart(); // Ensure the music stops when the quiz starts
    }
  }, [isQuizStarted, stopBackgroundStart]); // Added stopBackgroundStart as a dependency

  const startQuiz = (settings) => {
    setQuizSettings(settings);
    setIsQuizStarted(true);
  };

  const handleReset = () => {
    setQuizSettings(null);
    setUserName("");
    setIsQuizStarted(false);
    setIsStartScreen(true); // Reset back to start screen
  };

  return (
    <div className="App">
      {isStartScreen ? (
        <StartScreen onStartQuiz={handleStartQuiz} />  // Show start screen with "Take Quiz" and "Interesting Facts" buttons
      ) : !userName ? (
        <NameInput setUserName={setUserName} />
      ) : !isQuizStarted ? (
        <QuizSettings startQuiz={startQuiz} />
      ) : (
        <>
          <QuestionProvider settings={quizSettings}>
            <Questions />
          </QuestionProvider>
          <button className="reset-button" onClick={handleReset}>
            Start New Quiz
          </button>
        </>
      )}
    </div>
  );
}

export default App;
