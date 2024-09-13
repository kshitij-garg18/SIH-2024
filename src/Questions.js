import React, { useState, useEffect } from 'react';
import { useQuestions } from './QuestionProvider';
import './Questions.css';
import ScoreBar from './ScoreBar';
import useGameSounds from './useGameSounds'; // Import the custom sound hook

const Questions = () => {
  const questions = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const { 
    playCorrectSound, 
    playWrongSound, 
    playWinningSound, 
    playThinkingSound, 
    stopThinkingSound 
  } = useGameSounds(); // Use the custom sound hook

  const currentQuestion = questions[currentQuestionIndex];
  const maxScore = questions.length;

  // Play "thinking" sound when a new question is displayed
  useEffect(() => {
    playThinkingSound();
    return () => stopThinkingSound();
  }, [currentQuestionIndex, playThinkingSound, stopThinkingSound]); // Added both dependencies

  const handleAnswer = (answer) => {
    stopThinkingSound();
    if (answer === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore === maxScore) {
          playWinningSound();
        } else {
          playCorrectSound();
        }
        return newScore;
      });
      setIncrement(1);
    } else {
      setIsCorrect(false);
      playWrongSound();
      setIncrement(0);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
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
      <ScoreBar totalScore={score} incrementScore={increment} />
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
