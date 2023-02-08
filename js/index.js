/* USe strict mode  */
"use strict";
/* Define const variable from app */
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
let playerOneCurrentScore = document.querySelector("#current--0");
let playerTwoCurrentScore = document.querySelector("#current--1");
const playerOneScore = document.querySelector("#score--0");
const playerTwoScore = document.querySelector("#score--1");
/* define buttons variables */
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");

// sort scores of player one and two  in array
// create function and store it in initial values of this variable.

let scores, playing, currentScore, activePlayer;
// its function to make every variables to intial value .
const init = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;

  diceImg.classList.add("hidden");
  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
};
init();
//Reafactor switchPlayer code to function.
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // its mean if activeplayer = 0 => it will be 1 and if activeplayer = 1 => it will be zero.
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
};
/* Rolling dice functionalty */
btnRoll.addEventListener("click", function () {
  // if playing = true => excute all code in if block of
  if (playing) {
    /* Generating random dice roll */
    const dice = Math.trunc(Math.random() * 6) + 1;
    /* Display dice */
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;
    /* Check for rolled 1 : if true , switch to next player */
    if (dice !== 1) {
      // add numbers of dice images to current score of activePlayer and displayed it .
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      /* change activeplayer to 1 if it = 0 , or active player = 0 if it = 1  */
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Add currentScore to active player
    scores[activePlayer] += currentScore;
    // Exe : scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if score of any player >= 100 => it win the game and add class => player--winner
    if (scores[activePlayer] >= 100) {
      // make playing false to cant click any buttons excpet new game button
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // remove class activeplayer
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      //remove dice image from game
      diceImg.classList.add("hidden");
    } else {
      //switchPlayer
      switchPlayer();
    }
  }
});
// reset the game after click new game button it call function init  function => that reset every thing.
btnNew.addEventListener("click", init);
