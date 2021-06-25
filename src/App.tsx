import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  return (
    <div className={`App${gameOver ? ' game-over' : ''}`}>
      {gameOver
      ? <div>
        <img src="/explosion.png" alt="Explosion!"></img>
        <div className="game-over">Game Over!</div>
        <div><button onClick={() => setGameOver(false)}>Restart</button></div>
      </div>
      : <Game setGameOver={() => setGameOver(true)}/>}
    </div>
  );
}

export default App;


const Game = ({setGameOver}: {setGameOver: () => void}) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(50);
  useEffect(() => {
    const interval = setInterval(() => {
      const shark = document.querySelector('#shark');
      const waterBall = document.querySelector('#water-ball');
      if(shark && waterBall) {
        const sharkRect = shark.getBoundingClientRect();
        const waterBallRect = waterBall.getBoundingClientRect();
        if(waterBallRect.top < sharkRect.bottom && waterBallRect.bottom > sharkRect.top
          && waterBallRect.left < sharkRect.right && waterBallRect.right > sharkRect.left ) {
            console.log('collision')
            setGameOver();
          }
      }
      const newXPosition = (xPosition + 1) % 95;
      setXPosition(newXPosition);
      if(newXPosition === 0) {
        setYPosition(Math.round(10 + Math.random() * 80))
      }
    }, 10);
    return () => clearInterval(interval)
  }, [xPosition, setXPosition, setYPosition, setGameOver]);

  return (
    <div className="game">
      <img src="/Sammy_punk.png" alt="Sammy the punk shark" className="shark" id="shark"/>
      <img src="/water-ball.gif" alt="Water ball" className="water-ball" style={{right: `${xPosition}%`, top: `calc(${yPosition}% - 40px)`}} id="water-ball"/>
    </div>
  );
}