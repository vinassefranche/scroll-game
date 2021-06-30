import React, { useState } from "react";
import "./App.css";
import { Game } from "./Game";
import { useBestScore } from "./useBestScore";

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { bestScore, checkAndSetBestScore, resetBestScore } = useBestScore();

  return gameOver ? (
    <div className="game-over-menu">
      <img src="/explosion.png" alt="Explosion!"></img>
      <div className="game-over">Game Over!</div>
      <span className="score">Score: {score}</span>
      {score === bestScore ? (
        <span className="new-best-score">This is your best score!!</span>
      ) : (
        <span className="best-score">Best score: {bestScore}</span>
      )}
      <div className="buttons">
        <button
          onClick={() => {
            setGameOver(false);
            setScore(0);
          }}
        >
          Restart
        </button>
        <button onClick={resetBestScore}>Reset best score</button>
      </div>
    </div>
  ) : (
    <div className="game-container">
      <Game
        setGameOver={(score: number) => {
          setScore(score);
          setGameOver(true);
          checkAndSetBestScore(score);
        }}
      />
    </div>
  );
};

export default App;
