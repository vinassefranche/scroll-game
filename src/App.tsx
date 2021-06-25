import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Game/>
    </div>
  );
}

export default App;


const Game = () => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(50);
  useEffect(() => {
    const interval = setInterval(() => {
      const newXPosition = (xPosition + 1) % 95;
      setXPosition(newXPosition);
      if(newXPosition === 0) {
        setYPosition(Math.round(10 + Math.random() * 80))
      }
    }, 10);
    return () => clearInterval(interval)
  }, [xPosition, setXPosition, setYPosition])
  return (
    <div className="game">
      <img src="/Sammy_punk.png" alt="Sammy the punk shark" className="shark"/>
      <img src="/water-ball.gif" alt="Water ball" className="water-ball" style={{right: `${xPosition}%`, top: `calc(${yPosition}% - 40px)`}}/>
    </div>
  );
}