import { getLocalStorage } from "./storage.js";

function showHighScores() {
    const highStreakText = getLocalStorage("High Streak") || "N/A";
    const highScoreText = getLocalStorage("High Score") || "N/A";
  
    const highStreakElement = document.getElementById("high-streak");
    const highScoreElement = document.getElementById("high-score");
  
    highStreakElement.textContent = `Current High Streak: ${highStreakText}`;
    highScoreElement.textContent = `Current High Score: ${highScoreText}`;
  }
  

export { showHighScores };  