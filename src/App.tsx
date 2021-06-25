import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  return (
    <div className={`App${gameOver ? ' game-over' : ''}`}>
      {gameOver
      ? <div>
        <img src="/explosion.png" alt="Explosion!"></img>
        <div className="game-over">Game Over!</div>
        <span className="score">Score: {score}</span>
        <div><button onClick={() => {
          setGameOver(false);
          setScore(0);
        }}>Restart</button></div>
      </div>
      : <Game setGameOver={() => setGameOver(true)} score={score} setScore={setScore}/>}
    </div>
  );
}

export default App;


const Game = ({setGameOver, score, setScore}: {setGameOver: () => void; score: number; setScore: (score: number) => void}) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(33);
  const [xPositionSlow, setXPositionSlow] = useState(0);
  const [yPositionSlow, setYPositionSlow] = useState(66);
  const [speed, setSpeed] = useState(1);
  const [speedSlow, setSpeedSlow] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      const newXPosition = (xPosition + speed) % 95;

      const shark = document.querySelector('#shark');
      const waterBall = document.querySelector('#water-ball');
      if(newXPosition > 50 && shark && waterBall) {
        const sharkRect = shark.getBoundingClientRect();
        const waterBallRect = waterBall.getBoundingClientRect();
        if(
          waterBallRect.top < sharkRect.bottom
          && waterBallRect.bottom > sharkRect.top
          && waterBallRect.left < sharkRect.right 
          && waterBallRect.right > sharkRect.left
          ) {
            setGameOver();
          }
      }
      setScore(Math.ceil(score + speed))
      setXPosition(newXPosition);
      if(newXPosition === 0) {
        setYPosition(Math.round(10 + Math.random() * 80))
        setSpeed(Math.random() > 0.5 ? speed : Math.min(5, speed + 0.5))
      }
    }, 20);
    return () => clearInterval(interval)
  }, [xPosition, setXPosition, setYPosition, setGameOver, speed, setSpeed, score, setScore]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newXPosition = (xPositionSlow + speedSlow) % 95;

      const shark = document.querySelector('#shark');
      const waterBall = document.querySelector('#water-ball-slow');
      if(newXPosition > 50 && shark && waterBall) {
        const sharkRect = shark.getBoundingClientRect();
        const waterBallRect = waterBall.getBoundingClientRect();
        if(
          waterBallRect.top < sharkRect.bottom
          && waterBallRect.bottom > sharkRect.top
          && waterBallRect.left < sharkRect.right 
          && waterBallRect.right > sharkRect.left
          ) {
            setGameOver();
          }
      }
      setXPositionSlow(newXPosition);
      if(newXPosition === 0) {
        setYPositionSlow(Math.round(10 + Math.random() * 80))
        setSpeedSlow(Math.random() > 0.5 ? speedSlow : Math.min(5, speedSlow + 0.25))
      }
    }, 20);
    return () => clearInterval(interval)
  }, [xPositionSlow, setXPositionSlow, setYPositionSlow, setGameOver, speedSlow, setSpeedSlow]);

  return (
    <div className="game">
      <img src="/Sammy_punk.png" alt="Sammy the punk shark" className="shark" id="shark"/>
      <img src="/water-ball.png" alt="Water ball" className="water-ball" style={{right: `${xPosition}%`, top: `calc(${yPosition}% - 20px)`}} id="water-ball"/>
      <img src="/water-ball.png" alt="Water ball" className="water-ball slow" style={{right: `${xPositionSlow}%`, top: `calc(${yPositionSlow}% - 30px)`}} id="water-ball-slow"/>
      <span className="score">Score: {score}</span>
    </div>
  );
}