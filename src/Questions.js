import React, { useState } from 'react';
import { useQuestions } from './QuestionProvider';
import './Questions.css';  // Import any specific styles for this component

function Questions() {
  const questions = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (questions.length === 0) return <div>No questions available</div>;

  const question = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setUserAnswer(null);
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="questions-container">
      <div className="question">
        <h2>{question.question}</h2>
        <div className="options">
          {question.options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`option-button ${isAnswered ? (option === question.correctAnswer ? 'correct-option' : 'wrong-option') : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {isAnswered && (
        <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
          <p>{isCorrect ? 'Correct!' : 'Wrong!'}</p>
          <p><strong>Explanation:</strong></p>
          <p className="typing-animation">{question.explanation}</p>
          <button onClick={handleNext}>Next Question</button>
        </div>
      )}
    </div>
  );
}

export default Questions;

