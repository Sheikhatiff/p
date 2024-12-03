"use strict";
//starting varibles
let currentScore = 0;
let currentPlayer = 0;
let scores = [0, 0];
let targetScr = 50;
let b = true;
//selecting elements
const diceEl = document.querySelector(".dice");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  if (b) newGame();
};
const openModal = function (s) {
  document.querySelector(".remarks").textContent = s;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
//selecting btnEl
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnAbout = document.querySelector(".btn--about");

//methods
const rules = function (scr) {
  return `Each player takes turns rolling a dice During their turn, A player can choose to either roll the dice or hold. If a player chooses to hold, their current score is added to their player score, and their turn ends. If a player rolls a 1, their turn ends, and their current score is reset to 0.The player who reaches or exceeds the target score: ${scr} first wins the game.`;
};

const generateRandNo = (i, f) => Math.trunc(Math.random() * f) + i;
const target = function () {
  return Number(prompt(`Enter a New Target Score to win...`));
};
const diceDisplay = (b) =>
  !b ? diceEl.classList.add("hidden") : diceEl.classList.remove("hidden");
const clearElmText = (selector) => {
  document.querySelector(selector).textContent = 0;
};
const activePlayerGraphic = (b) => {
  if (
    !document
      .querySelector(`.player--${b}`)
      .classList.contains("player--active")
  ) {
    document.querySelector(`.player--${b}`).classList.add("player--active");
    b = b === 0 ? 1 : 0;
    document.querySelector(`.player--${b}`).classList.remove("player--active");
  }
};
const newGame = function () {
  //   let trgtScr = target();
  //   if (trgtScr) targetScr = trgtScr;
  //   else newGame();
  diceDisplay(0);
  activePlayerGraphic(0);
  clearElmText("#score--0");
  clearElmText("#score--1");
  clearElmText("#current--0");
  clearElmText("#current--1");
  currentPlayer = 0;
  scores = [0, 0];
  currentScore = 0;
};
const setAndDisplayScore = (activePlayer, score) => {
  const currentEl = document.getElementById(`current--${activePlayer}`);
  currentScore += score;
  checkWin(activePlayer);
  currentEl.textContent = currentScore;
};
const changePlayer = (b) => {
  if (b) scores[currentPlayer] += currentScore;
  setAndDisplayPlayerScore(currentPlayer);
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  setAndDisplayScore(currentPlayer, 0);
  activePlayerGraphic(currentPlayer);
};
const setAndDisplayPlayerScore = (currentPlayer) => {
  const currentEl = document.getElementById(`score--${currentPlayer}`);
  currentEl.textContent = scores[currentPlayer];
};

const checkWin = (activePlayer) => {
  if (scores[activePlayer] + currentScore >= targetScr) {
    b = true;
    openModal(
      `YAHOO!🎆 PLAYER ${activePlayer + 1} WINS🥇. \n Scores: ${
        scores[activePlayer] + currentScore
      } > ${scores[activePlayer === 1 ? 0 : 1]}`
    );
  }
};

//starting point
newGame();

// Event HAndling
btnRoll.addEventListener("click", function () {
  diceDisplay(1);
  const num = generateRandNo(1, 6);
  diceEl.src = `dice-${num}.png`;
  if (num !== 1) {
    setAndDisplayScore(currentPlayer, num);
  } else {
    changePlayer(false);
  }
});
btnHold.addEventListener("click", () => {
  changePlayer(true);
});
btnNew.addEventListener("click", () => {
  newGame();
});
btnAbout.addEventListener("click", () => {
  b = false;
  openModal(rules(targetScr));
  console.log(targetScr);
});
