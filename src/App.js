import React, { useState } from "react";
import NameInput from "./NameInput";
import QuizSettings from "./QuizSettings";
import Questions from "./Questions";
import QuestionProvider from "./QuestionProvider";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [quizSettings, setQuizSettings] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const startQuiz = (settings) => {
    setQuizSettings(settings);
    setIsQuizStarted(true);
  };

  const handleReset = () => {
    setQuizSettings(null);
    setUserName("");
    setIsQuizStarted(false);
  };

  return (
    <div className="App">
      {!userName ? (
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
