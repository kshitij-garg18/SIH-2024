import React, { useState } from 'react';
import factData from './factdata'; // Import the facts data
import './StartScreen.css'; // Ensure you have styling for this screen

const StartScreen = ({ onStartQuiz }) => {
  const [showFact, setShowFact] = useState(false); // Track if facts are being shown
  const [currentFact, setCurrentFact] = useState('');

  // Function to show a random fact
  const showRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * factData.length);
    setCurrentFact(factData[randomIndex]);
    setShowFact(true); // Show the fact
  };

  // Function to show a new fact
  const showNewFact = () => {
    const randomIndex = Math.floor(Math.random() * factData.length);
    setCurrentFact(factData[randomIndex]);
  };

  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz Game</h1>

      {!showFact ? (
        <>
          <button className="start-button" onClick={onStartQuiz}>
            Take Quiz
          </button>
          <button className="fact-button" onClick={showRandomFact}>
            Interesting Facts
          </button>
        </>
      ) : (
        <div className="fact-container">
          <p>{currentFact}</p>
          <button className="new-fact-button" onClick={showNewFact}>
            Show Another Fact
          </button>
          <button className="back-button" onClick={() => setShowFact(false)}>
            Back to Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
