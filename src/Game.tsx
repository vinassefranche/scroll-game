import React, { useEffect, useRef, useState } from "react";
import "./Game.css";

export const Game = ({
  setGameOver,
}: {
  setGameOver: (score: number) => void;
}) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(33);
  const [xPositionSlow, setXPositionSlow] = useState(0);
  const [yPositionSlow, setYPositionSlow] = useState(66);
  const [speed, setSpeed] = useState(1.8);
  const [speedSlow, setSpeedSlow] = useState(0.8);
  const [score, setScore] = useState(0);

  const shark = useRef<HTMLImageElement>(null);
  const waterBall = useRef<HTMLImageElement>(null);
  const waterBallSlow = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo({ top: window.innerHeight / 3 });
  }, []);

  useEffect(() => {
    if (xPosition > 50 && shark.current && waterBall.current) {
      const sharkRect = shark.current.getBoundingClientRect();
      const waterBallRect = waterBall.current.getBoundingClientRect();
      if (
        waterBallRect.top < sharkRect.bottom &&
        waterBallRect.bottom > sharkRect.top &&
        waterBallRect.left < sharkRect.right &&
        waterBallRect.right > sharkRect.left
      ) {
        return setGameOver(score);
      }
    }
    if (xPositionSlow > 50 && shark.current && waterBallSlow.current) {
      const sharkRect = shark.current.getBoundingClientRect();
      const waterBallRect = waterBallSlow.current.getBoundingClientRect();
      if (
        waterBallRect.top < sharkRect.bottom &&
        waterBallRect.bottom > sharkRect.top &&
        waterBallRect.left < sharkRect.right &&
        waterBallRect.right > sharkRect.left
      ) {
        return setGameOver(score);
      }
    }
    const timeout = setTimeout(() => {
      setScore(Math.ceil(score + speed));

      const newXPosition = (xPosition + Math.round(speed * 2) / 2) % 95;
      setXPosition(newXPosition);
      if (newXPosition === 0) {
        setYPosition(Math.round(10 + Math.random() * 80));
        setSpeed(Math.min(5, speed + 0.2));
      }

      const newXPositionSlow =
        (xPositionSlow + Math.round(speedSlow * 2) / 2) % 95;
      setXPositionSlow(newXPositionSlow);
      if (newXPositionSlow === 0) {
        setYPositionSlow(Math.round(10 + Math.random() * 80));
        setSpeedSlow(Math.min(5, speedSlow + 0.2));
      }
    }, 20);
    return () => clearTimeout(timeout);
  }, [
    xPosition,
    xPositionSlow,
    setXPosition,
    setXPositionSlow,
    setYPosition,
    setYPositionSlow,
    setGameOver,
    speed,
    speedSlow,
    setSpeed,
    setSpeedSlow,
    score,
    setScore,
    shark,
    waterBall,
  ]);

  return (
    <div className="game">
      <img
        src="/Sammy_punk.png"
        alt="Sammy the punk shark"
        className="shark"
        id="shark"
        ref={shark}
      />
      <img
        src="/water-ball.png"
        alt="Water ball"
        className="water-ball"
        style={{ right: `${xPosition}%`, top: `calc(${yPosition}% - 20px)` }}
        id="water-ball"
        ref={waterBall}
      />
      <img
        src="/water-ball.png"
        alt="Water ball"
        className="water-ball slow"
        style={{
          right: `${xPositionSlow}%`,
          top: `calc(${yPositionSlow}% - 30px)`,
        }}
        id="water-ball-slow"
        ref={waterBallSlow}
      />
      <span className="game-score">Score: {score}</span>
    </div>
  );
};
