import React, { useState, useEffect } from "react";
import StartScreen from "./StartScreen"; // Import the StartScreen component
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

  // Play background music after clicking the "Start" button
  const handleStart = () => {
    playBackgroundStart();
    setIsStartScreen(false); // Hide start screen and show quiz settings
  };

  // Stop background music when the quiz starts
  useEffect(() => {
    if (isQuizStarted) {
      stopBackgroundStart();
    }
  }, [isQuizStarted]);

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
        <StartScreen onStart={handleStart} />  // Show start screen with button
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

