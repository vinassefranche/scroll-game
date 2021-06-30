import { useCallback, useState } from "react";

const LOCAL_STORAGE_KEY = "best-score";

export const useBestScore = () => {
  const [bestScore, setBestScore] = useState<number>(getStoredBestScore());

  const checkAndSetBestScore = useCallback(
    (score: number) => {
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem(LOCAL_STORAGE_KEY, score.toString());
      }
    },
    [setBestScore, bestScore]
  );

  const resetBestScore = useCallback(() => {
    setBestScore(0);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
  }, [setBestScore]);

  return {
    bestScore,
    checkAndSetBestScore,
    resetBestScore,
  };
};

const getStoredBestScore = () => {
  const storedBestScore = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedBestScore === null) {
    return 0;
  }
  try {
    return JSON.parse(storedBestScore);
  } catch (error) {
    return 0;
  }
};
