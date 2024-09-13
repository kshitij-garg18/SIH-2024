import React, { useState, useEffect } from 'react';
import { useQuestions } from './QuestionProvider';
import './Questions.css'; // Ensure this CSS file includes styles for the score bar
import ScoreBar from './ScoreBar'; // Import the ScoreBar component

const Questions = () => {
  const questions = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswer = (answer) => {
    if (answer === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
      setIncrement(1); // Increment score for the correct answer
    } else {
      setIsCorrect(false);
      setIncrement(0); // No increment for the wrong answer
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    // Reset the increment after a short delay
    if (increment > 0) {
      const timer = setTimeout(() => setIncrement(0), 1500);
      return () => clearTimeout(timer);
    }
  }, [increment]);

  if (!currentQuestion) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="questions-container">
      <ScoreBar totalScore={score} incrementScore={increment} /> {/* Ensure only one ScoreBar */}
      {showExplanation ? (
        <div className="explanation-container">
          <div className={`explanation-text ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Correct!' : 'Wrong!'}
            <p>{currentQuestion.explanation}</p>
          </div>
          <button onClick={handleNextQuestion} className="next-button">Next Question</button>
        </div>
      ) : (
        <div className="question-container">
          <h2>{currentQuestion.question}</h2>
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;

