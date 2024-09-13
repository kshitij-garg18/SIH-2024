import React, { useState } from "react";
import { quizOptions } from "./quizOptions"; // Your quiz options data
import './App.css'; // Import the same CSS file

function QuizSettings({ startQuiz }) {
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (language && category && difficulty) {
      startQuiz({ language, category, difficulty });
    } else {
      alert("Please select all options.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Language:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">Select Language</option>
        {quizOptions.languages.map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {quizOptions.categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label>Difficulty:</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">Select Difficulty</option>
        {quizOptions.difficulties.map((diff, index) => (
          <option key={index} value={diff}>
            {diff}
          </option>
        ))}
      </select>

      <button type="submit" disabled={!language || !category || !difficulty}>Start Quiz</button>
    </form>
  );
}

export default QuizSettings;
