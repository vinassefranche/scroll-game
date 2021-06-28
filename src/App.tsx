import React, { useState } from "react";
import "./App.css";
import { Game } from "./Game";

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  return gameOver ? (
    <div className="game-over-menu">
      <img src="/explosion.png" alt="Explosion!"></img>
      <div className="game-over">Game Over!</div>
      <span className="score">Score: {score}</span>
      <div>
        <button
          onClick={() => {
            setGameOver(false);
            setScore(0);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  ) : (
    <div className="game-container">
      <Game
        setGameOver={() => setGameOver(true)}
        score={score}
        setScore={setScore}
      />
    </div>
  );
};

export default App;
