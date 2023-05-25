import { fetchRandomWebsiteData } from "./api.js";
import { setLocalStorage, getLocalStorage } from "./storage.js";
import { compareWebsites } from './utils.js';
import { showHighScores } from "./dom.js";

window.addEventListener('DOMContentLoaded', (event) => {
  const nextButton = document.getElementById("next-button");
  const startButton = document.getElementById("start-button");
  const playAgainButton = document.getElementById("play-again-button");
  const currentRoundElement = document.getElementById("current-round");
  const website1Container = document.getElementById("website1-container");
  const website1NameElement = document.getElementById("website1-name");
  const website1Co2Element = document.getElementById("website1-co2-per-month");
  const website2Container = document.getElementById("website2-container");
  const website2NameElement = document.getElementById("website2-name");
  const website2Co2Element = document.getElementById("website2-co2-per-month");
  const website1DomainElement = document.getElementById("website1-domain")
  const website2DomainElement = document.getElementById("website2-domain")
  const resultMessageElement = document.getElementById("result-message-container");
  const streakElement = document.getElementById("streak");
  const totalScoreElement = document.getElementById("total-score");
  const highStreakElement = document.getElementById("high-streak");
  const roundContainer = document.getElementById("round-container");
  const gameContainer = document.getElementById("game-container");
  const vsContainer = document.getElementById("vs-container");
  const scoreContainer = document.getElementById("score-container");
  
  let fetchedWebsites = [];
  let website1;
  let website2;
  let currentRound = 0;
  let currentStreak = 0;
  let totalScore = 0;
  let highStreak = 0;
  
  startButton.classList.remove("hidden");
  startButton.addEventListener("click", startGame);


  function startGame() {
    startButton.classList.add("hidden");
    document.querySelector("main.hero").classList.add("hidden");
    website1Container.classList.remove("hidden")
    website2Container.classList.remove("hidden")
    roundContainer.classList.remove("hidden");
    gameContainer.classList.remove("hidden");
    vsContainer.classList.remove("hidden");
    scoreContainer.classList.remove("hidden");
    currentRoundElement.classList.remove("hidden");

    resetGame();
  }

  function resetGame() {
    currentRound = 0;
    currentStreak = 0;
    totalScore = 0;
    highStreak = getLocalStorage("High Streak") || 0;

    playAgainButton.classList.add("hidden");
    resultMessageElement.textContent = "";

    setLocalStorage("Total Score", totalScore);
    nextRound();
  }

  function nextRound() {
    currentRound += 1;
    currentRoundElement.textContent = `Round: ${currentRound}`;
    streakElement.classList.remove("hidden");
    totalScoreElement.classList.remove("hidden");
    resultMessageElement.classList.add("hidden");
    nextButton.classList.add("hidden");
  
    website1Container.classList.remove("correct", "incorrect");
    website2Container.classList.remove("correct", "incorrect");
  
    website1Container.removeEventListener("click", handleWebsite1Click);
    website2Container.removeEventListener("click", handleWebsite2Click);
  
    fetchRandomWebsiteData()
      .then(([fetchedWebsite1, fetchedWebsite2]) => {
        website1 = fetchedWebsite1;
        website2 = fetchedWebsite2;
  
        console.log("Website 1:", website1);
        console.log("Website 2:", website2);
  
        website1NameElement.textContent = website1.name;
        website1DomainElement.textContent = website1.domain;
        website1Co2Element.textContent = "";
     
  
        website2NameElement.textContent = website2.name;
        website2DomainElement.textContent = website2.domain;
        website2Co2Element.textContent = "";
       
  
        website1Container.addEventListener("click", handleWebsite1Click);
        website2Container.addEventListener("click", handleWebsite2Click);

        fetchedWebsites.push(website1, website2); 
      })
      .catch(error => {
        console.error("Fejl ved hentning af websitedata:", error);
      });
  }
  
  function handleGuessResult(guessResult, clickedContainer) {
    website1Container.removeEventListener("click", handleWebsite1Click);
    website2Container.removeEventListener("click", handleWebsite2Click);

    website1Container.classList.remove("correct", "incorrect");
    website2Container.classList.remove("correct", "incorrect");

    if (guessResult === "correct") {
        updateRound(true);
        resultMessageElement.textContent = "Correct!";
        clickedContainer.classList.add("correct");
    } else if (guessResult === "incorrect") {
        updateRound(false);
        resultMessageElement.textContent = "Incorrect!";
        clickedContainer.classList.add("incorrect");
    }

    const website1Co2Tons = Math.round(website1.co2_kg_per_month / 1000);
    const website2Co2Tons = Math.round(website2.co2_kg_per_month / 1000);

    website1Co2Element.innerHTML = `CO2/Month: <br/> <span id="website1-co2-value"><b>${website1Co2Tons}</b></span> tons`;
    website2Co2Element.innerHTML = `CO2/Month: <br/> <span id="website2-co2-value"><b>${website2Co2Tons}</b></span> tons`;    

    website1Co2Element.classList.remove("hidden");
    website2Co2Element.classList.remove("hidden");

    let startValue1 = Math.round(website1Co2Tons * 0.8);
    let startValue2 = Math.round(website2Co2Tons * 0.8);

    animateValue(document.getElementById("website1-co2-value"), startValue1, website1Co2Tons, 500);
    animateValue(document.getElementById("website2-co2-value"), startValue2, website2Co2Tons, 500);

    resultMessageElement.classList.remove("hidden");
    nextButton.classList.remove("hidden");

    if (currentRound === 10) {
        endGame();
    }

    streakElement.textContent = `Streak: ${currentStreak}`;
    totalScoreElement.textContent = `Score: ${totalScore}`;
}

function animateValue(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

  function handleWebsite1Click() {
    let guessResult = compareWebsites(website1, website1, website2);
    handleGuessResult(guessResult, website1Container);
    website1Container.removeEventListener("click", handleWebsite1Click);
    website2Container.removeEventListener("click", handleWebsite2Click);
  }
  
  function handleWebsite2Click() {
    let guessResult = compareWebsites(website2, website1, website2);
    handleGuessResult(guessResult, website2Container);
    website1Container.removeEventListener("click", handleWebsite1Click);
    website2Container.removeEventListener("click", handleWebsite2Click);
  }
  
  function updateRound(isCorrect) {
    if (isCorrect) {
      currentStreak += 1;
      totalScore += 1;
    } else {
      currentStreak = 0;
    }

    if (currentStreak > highStreak) {
      setLocalStorage("High Streak", currentStreak);
      highStreak = currentStreak;
    }

    setLocalStorage("Total Score", totalScore);
  }

  function endGame() {
    nextButton.classList.add("hidden");
    playAgainButton.classList.remove("hidden");
    resultMessageElement.textContent = "Well done!";

    showHighScores(highStreak, totalScore);
  }

  nextButton.addEventListener("click", nextRound);
  playAgainButton.addEventListener("click", resetGame);
});
