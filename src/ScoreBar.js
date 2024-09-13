import React, { useState, useEffect } from 'react';
import './ScoreBar.css'; // Ensure this CSS file includes styles for the score bar

const ScoreBar = ({ totalScore, incrementScore }) => {
  const [width, setWidth] = useState(0);
  const totalQuestions = 5; // Replace with the total number of questions
  const percent = (totalScore / totalQuestions) * 100;

  useEffect(() => {
    setWidth(percent);
  }, [totalScore, percent]);

  return (
    <div className="score-bar-container">
      <div className="score-bar" style={{ width: `${width}%` }}>
        <span className="score-text">Score: {totalScore}</span>
        {incrementScore > 0 && (
          <div className="score-flash">+{incrementScore}</div>
        )}
      </div>
    </div>
  );
};

export default ScoreBar;

