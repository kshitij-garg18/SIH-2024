import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import NameInput from './NameInput';
import QuizSettings from './QuizSettings';
import Questions from './Questions';
import QuestionProvider from './QuestionProvider';
import useGameSounds from './useGameSounds';
import './App.css';

function App() {
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [userName, setUserName] = useState("");
  const [quizSettings, setQuizSettings] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const { playBackgroundStart, stopBackgroundStart } = useGameSounds();

  const handleStartQuiz = () => {
    playBackgroundStart();
    setIsStartScreen(false);
  };

  useEffect(() => {
    if (isQuizStarted) {
      stopBackgroundStart();
    }
  }, [isQuizStarted, stopBackgroundStart]);

  const startQuiz = (settings) => {
    setQuizSettings(settings);
    setIsQuizStarted(true);
  };

  const handleReset = () => {
    setQuizSettings(null);
    setUserName("");
    setIsQuizStarted(false);
    setIsStartScreen(true);
  };

  return (
    <div className="App">
      {isStartScreen ? (
        <StartScreen onStartQuiz={handleStartQuiz} />
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
