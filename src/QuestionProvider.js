import React, { createContext, useContext } from "react";
import {questionsData} from "./QuestionsData";

const QuestionContext = createContext();

export const useQuestions = () => useContext(QuestionContext);

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function QuestionProvider({ settings, children }) {
  const { language, category, difficulty } = settings || {};

  // Get the filtered questions based on language, category, and difficulty

  console.log("Selected Language: ", language);
  console.log("Selected Category: ", category);
  console.log("Selected Difficulty: ", difficulty);

  const filteredQuestions =
    questionsData[language]?.[category]?.[difficulty] || [];

  // Shuffle the questions to make sure they're presented randomly
  const shuffledQuestions = shuffleArray(filteredQuestions);

  return (
    <QuestionContext.Provider value={shuffledQuestions}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionProvider;
