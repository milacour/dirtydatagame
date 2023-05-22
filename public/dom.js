// dom.js

import { co2ToTrees } from "./utils.js";
import { getLocalStorage } from "./storage.js";

function showTrees(co2) {
    const treesElement = document.getElementById("trees");
    const trees = co2ToTrees(co2);
    treesElement.textContent = `Trees: ${trees}`;
}

function showHighScores() {
    const highStreakText = getLocalStorage("High Streak") || "N/A";
    const totalScoreText = getLocalStorage("Total Score") || "N/A";

    const highStreakElement = document.getElementById("high-streak");
    const totalScoreElement = document.getElementById("total-score");

    highStreakElement.textContent = `High Streak: ${highStreakText}`;
    totalScoreElement.textContent = `Total Score: ${totalScoreText}`;
}


export { showHighScores, showTrees };  