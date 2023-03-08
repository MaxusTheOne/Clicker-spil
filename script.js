//Begyndelsen af script
"use strict";

//start function
window.addEventListener("load", load);
//definer variabler
let score = 0;
let lives = 3;
let timer_state = 1;
let highscore = 0;
let gameState;
let requiredScore = 25;

let cookieObj1 = document.querySelector("#cookie_container1");
let cookieObj2 = document.querySelector("#cookie_container2");
let cookieObj3 = document.querySelector("#cookie_container3");
let cookieObj4 = document.querySelector("#cookie_container4");
let cookieObj5 = document.querySelector("#cookie_container5");
let cookieObj6 = document.querySelector("#cookie_container6");

//startscreen
function load() {
  gameState = "load";
  initCookies();
  let startButton = document.querySelector("#startButton");
  document.querySelector("#start").classList.remove("hidden");
  startButton.addEventListener("click", start);

  //extra
  document.querySelector("#transitionCookies").classList.add("hidden");
}

function start() {
  //reset variables
  score = 0;
  lives = 3;
  timer_state = 1;
  updateScore();
  //remove start screen
  document.querySelector("#startButton").removeEventListener("click", start);
  document.querySelector("#start").classList.add("hidden");
  gameState = "playing";
  //start cookies
  initCookies();

  //start background music
  document.querySelector("#bg_music").currentTime = 0;
  document.querySelector("#bg_music").play();

  document.querySelector("#timer_cookie1").classList.add("cookie_timer");
  document.querySelector("#timer_cookie1").addEventListener("animationend", timerStep);
}

function initCookies() {
  startCookie.call(cookieObj1);
  startCookie.call(cookieObj2);
  startCookie.call(cookieObj3);
  startCookie.call(cookieObj4);
  startCookie.call(cookieObj5);
  startCookie.call(cookieObj6);

  //assign events
  startEventListernes(cookieObj1);
  startEventListernes(cookieObj2);
  startEventListernes(cookieObj3);
  startEventListernes(cookieObj4);
  startEventListernes(cookieObj5);
  startEventListernes(cookieObj6);
}

function startEventListernes(cookieObj) {
  //Animation end listeners
  cookieObj.addEventListener("animationend", startCookie);

  //Click listeners
  if (gameState != "load") cookieObj.addEventListener("mousedown", cookieClicker);
}
//timer animation hjælper
function timerStep() {
  let timer_cookie = document.querySelector("#timer_cookie" + timer_state);

  timer_cookie.removeEventListener("animationend", timerStep);
  if (timer_state < 13) {
    timer_state++;
    timer_cookie = document.querySelector("#timer_cookie" + timer_state);
    timer_cookie.classList.add("cookie_timer");
    timer_cookie.addEventListener("animationend", timerStep);
  } else {
    endGame();
  }
}

//får cookien til at forsvinde når de bliver klikket
function cookieClicker() {
  let cookie_container = this;
  cookie_container.removeEventListener("mousedown", cookieClicker);
  cookie_container.classList.add("pause");
  cookie_container.querySelector("img").classList.add("clicked");
  document.querySelector("#munch1").currentTime = 0;
  document.querySelector("#munch1").play();
  // bad cookie clicked
  if (cookie_container.classList.contains("bad_cookie")) {
    removeLives();

    //good cookie clicked
  } else if (cookie_container.classList.contains("life_cookie")) {
    if (lives >= 3) {
      score += 5;
      updateScore();
    } else {
      addLives();
    }
    //else. a good cookie is clicked
  } else {
    score++;
    updateScore();
  }
}

//starter cookies op igen
function startCookie() {
  let cookie_container = this;
  removePaths(cookie_container);
  cookie_container.classList.remove("roll", "reverse");

  cookie_container.offsetLeft;
  cookie_container.classList.remove("pause");
  cookie_container.querySelector("img").classList.remove("clicked");
  if (gameState != "load") {
    cookie_container.addEventListener("mousedown", cookieClicker);
  }
  assignPaths(cookie_container);
  assignType(cookie_container);
}

//remove paths
function removePaths(cookieObj) {
  cookieObj.classList.remove(
    "path1",
    "path2",
    "path3",
    "path4",
    "path5",
    "path6",
    "path7",
    "path8"
  );
}

//assign paths
function assignPaths(cookieObj) {
  if (Math.floor(Math.random() * 2) == 1) {
    cookieObj.classList.add("roll");
  } else {
    cookieObj.classList.add("reverse");
  }
  cookieObj.classList.add("path" + (Math.floor(Math.random() * 8) + 1));
}

//remove type class
function removeTypes(cookieObj) {
  cookieObj.classList.remove("life_cookie", "bad_cookie");
}

//assign type class
function assignType(cookieObj) {
  removeTypes(cookieObj);

  let randumNum = Math.floor(Math.random() * 10) + 1;
  if (randumNum == 1) {
    cookieObj.classList.add("life_cookie");
  } else if (randumNum <= 4) {
    cookieObj.classList.add("bad_cookie");
  }
}

//remove a life
function removeLives() {
  document.querySelector("#heart" + lives).classList.add("clicked");
  lives--;
  if (lives <= 0) {
    game_over();
  }
}

//add a life
function addLives() {
  if (lives < 3) {
    lives++;
    let lifeObj = document.querySelector("#heart" + lives);
    lifeObj.classList.remove("clicked");
  }
}

//end game
function endGame() {
  if (score < requiredScore) {
    game_over();
  } else {
    console.log("Spillet er vundet, vi har " + score + " points");
    level_complete();
  }
}

//score updater
function updateScore() {
  console.log("scoreUp");
  document.querySelector("#scoreNum").textContent = score;
}

//level complete
function level_complete() {
  console.log("level_complete");
  gameState = "end";
  document.querySelector("#score").textContent = "Your score is: " + score;
  document.querySelector("#transitionCookies").classList.remove("hidden");
  document.querySelector("#gameOverCookie1").classList.add("cookieTransition");
  document.querySelector("#gameOverCookie2").classList.add("cookieTransition");
  document.querySelector("#lvCompleteRestart").addEventListener("click", startGame);
  document
    .querySelector("#gameOverCookie2")
    .addEventListener("animationend", showLevelCompleteScreen);
  if (score > highscore) {
    highscore = score;
  }
  document.querySelector("#highscore").textContent = "Highscore: " + highscore;
  unloadGame();
}
function showLevelCompleteScreen() {
  console.log("ShowLevelCompleteScreen");
  //audio
  document.querySelector("#bg_music").pause();
  document.querySelector("#yay").currentTime = 0;
  document.querySelector("#yay").play();

  document
    .querySelector("#gameOverCookie2")
    .removeEventListener("animationend", showLevelCompleteScreen);

  document.querySelector("#gameOverCookie1").classList.remove("cookieTransition");
  document.querySelector("#gameOverCookie2").classList.remove("cookieTransition");
  document.querySelector("#gameOverCookie1").classList.add("clicked");
  document.querySelector("#gameOverCookie2").classList.add("clicked");
  document.querySelector("#level_complete").classList.remove("hidden");
}

//game over
function game_over() {
  gameState = "end";
  document.querySelector("#gameOverCookie1").classList.add("cookieTransition");
  document.querySelector("#gameOverCookie2").classList.add("cookieTransition");
  document.querySelector("#transitionCookies").classList.remove("hidden");
  document.querySelector("#gameOverCookie2").addEventListener("animationend", showGameOverScreen);
  document.querySelector("#gameOverRestart").addEventListener("click", startGame);
  unloadGame();
}
function showGameOverScreen() {
  //audio
  document.querySelector("#bg_music").pause();
  document.querySelector("#cry").currentTime = 0;
  document.querySelector("#cry").play();
  document
    .querySelector("#gameOverCookie2")
    .removeEventListener("animationend", showGameOverScreen);
  document.querySelector("#gameOverCookie1").classList.remove("cookieTransition");
  document.querySelector("#gameOverCookie2").classList.remove("cookieTransition");
  document.querySelector("#gameOverCookie1").classList.add("clicked");
  document.querySelector("#gameOverCookie2").classList.add("clicked");
  document.querySelector("#game_over").classList.remove("hidden");
}

function startGame() {
  document.querySelector("#gameOverRestart").removeEventListener("click", unloadGame);
  document.querySelector("#lvCompleteRestart").removeEventListener("click", unloadGame);
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  load();
}
function unloadGame() {
  console.log("restarting...");
  gameState = "load";
  document.querySelector("#timer_cookie1").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie2").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie3").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie4").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie5").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie6").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie7").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie8").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie9").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie10").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie11").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie12").classList.remove("cookie_timer");
  document.querySelector("#timer_cookie13").classList.remove("cookie_timer");

  cookieObj1.removeEventListener("mousedown", cookieClicker);
  cookieObj2.removeEventListener("mousedown", cookieClicker);
  cookieObj3.removeEventListener("mousedown", cookieClicker);
  cookieObj4.removeEventListener("mousedown", cookieClicker);
  cookieObj5.removeEventListener("mousedown", cookieClicker);
  cookieObj6.removeEventListener("mousedown", cookieClicker);

  addLives();
  addLives();
  addLives();
}
