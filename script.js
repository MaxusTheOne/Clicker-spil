//Begyndelsen af script
"use strict";

//start function
window.addEventListener("load", load);
//definer variabler
let score = 0;
let lives = 3;
let timer_state = 1;
let gameState;
let requiredScore = 25;
const url = "https://cookersbase-default-rtdb.europe-west1.firebasedatabase.app/";

const cookieObjList = [];

//startscreen
function load() {
  gameState = "load";
  let startButton = document.querySelector("#startButton");
  document.querySelector("#start").classList.remove("hidden");
  startButton.addEventListener("click", start);
  //startButton.addEventListener("click", level_complete);
  //create cookies
  createCookies(5)
  initCookies();
  //extra
  document.querySelector("#transitionCookies").classList.add("hidden");
}

function createCookies(cookieCount){
  for (let i = 0; i < cookieCount; i++){
    const cookieHTML = /*HTML*/ `
      <div id="cookie_container${i}" class="cookie_container">
        <img src="images/SmallCookie.png" id="cookie_sprite${i}" class="cookie_sprite" />
      </div>
    `
    document.querySelector("#cookie_container_container").insertAdjacentHTML("beforeend",cookieHTML)
    cookieObjList.push(document.querySelector("#cookie_container_container div:last-child"))
  }
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
  for (let i = 0; i < cookieObjList.length; i++) {
    //start animations
    startCookie.call(cookieObjList[i]);
    //assign events
    startEventListernes(cookieObjList[i]);
  }
}

function startEventListernes(cookieObj) {
  //animation end listeners
  cookieObj.addEventListener("animationend", startCookie);

  //click listeners
  if (gameState != "load") cookieObj.addEventListener("mousedown", cookieClicker);
}
//timer animation hjælper
function timerStep() {
  let timer_cookie = document.querySelector("#timer_cookie" + timer_state);
  timer_state++;
  timer_cookie.removeEventListener("animationend", timerStep);
  if (timer_state < 13) {
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
  cookieObj.classList.remove("path1", "path2", "path3", "path4", "path5", "path6", "path7", "path8");
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
    // console.log("Spillet er vundet, vi har " + score + " points");
    level_complete();
  }
}

//score updater
function updateScore() {
  // console.log("scoreUp");
  document.querySelector("#scoreNum").textContent = score;
}

//level complete
function level_complete() {
  // console.log("level_complete");
  gameState = "end";
  document.querySelector("#score").textContent = "Your score is: " + score;
  document.querySelector("#transitionCookies").classList.remove("hidden");
  document.querySelector("#gameOverCookie1").classList.add("cookieTransition");
  document.querySelector("#gameOverCookie2").classList.add("cookieTransition");
  document.querySelector("#lvCompleteRestart").addEventListener("click", startGame);
  document.querySelector("#gameOverCookie2").addEventListener("animationend", showLevelCompleteScreen);
  unloadGame();
}
function showLevelCompleteScreen() {
  // console.log("ShowLevelCompleteScreen");
  //audio
  document.querySelector("#bg_music").pause();
  document.querySelector("#yay").currentTime = 0;
  document.querySelector("#yay").play();

  document.querySelector("#gameOverCookie2").removeEventListener("animationend", showLevelCompleteScreen);
  for (let i = 1; i <= 2; i++) {
    document.querySelector(`#gameOverCookie${i}`).classList.remove("cookieTransition");
    document.querySelector(`#gameOverCookie${i}`).classList.add("clicked");
  }
  document.querySelector("#submitName").disabled = false;
  document.querySelector("#scoreForm").addEventListener("submit", submitScore);
  getHighscores();

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
  for (let i = 1; i <= 2; i++) {
    document.querySelector(`#gameOverCookie${i}`).classList.remove("cookieTransition");
    document.querySelector(`#gameOverCookie${i}`).classList.add("clicked");
  }
  document.querySelector("#gameOverCookie2").removeEventListener("animationend", showGameOverScreen);
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
  // console.log("restarting...");
  gameState = "load";
  for (let i = 1; i <= 13; i++) {
    document.querySelector(`#timer_cookie${i}`).classList.remove("cookie_timer");
  }

  for (var i = 0; i < 6; i++) {
    cookieObjList[i].removeEventListener("mousedown", cookieClicker);
  }
  for (let i = 0; i <= 3; i++) addLives();
}
async function getHighscores() {
  document.querySelector("#highscoreList").textContent = "";
  const rawData = await fetch(`${url}/posts.json`, {
    method: "GET",
  });
  const dataList = await rawData.json();
  const readyData = prepareScoreData(dataList);
  showScoreList(sortScores(readyData));
}
function sortScores(array) {
  return array.sort((a, b) => b.score - a.score);
}
function showScoreList(array) {
  for (let i = 0; i < 10 && i < array.length; i++) {
    const element = /*HTML*/ `
    <li>${array[i].score} by ${array[i].name}</li>
    `;
    document.querySelector("#highscoreList").insertAdjacentHTML("beforeend", element);
  }
}

function submitScore(event) {
  // console.log("submit clicked");
  event.preventDefault();
  const name = document.querySelector("#name").value;
  if (name.length != 0 && name.length < 20) sendScore(name, score, window.location.href);
}

async function sendScore(name, score, credentials) {
  document.querySelector("#submitName").disabled = true;

  const scoreObj = {
    name: `${name}`,
    score: `${score}`,
    credentials: `${credentials}`,
  };
  const scoreToJson = JSON.stringify(scoreObj);
  const response = await fetch(`${url}/posts.json`, {
    method: "POST",
    body: scoreToJson,
  });
  getHighscores();
}
function prepareScoreData(dataObject) {
  const scoreArray = [];
  for (const key in dataObject) {
    const score = dataObject[key];
    scoreArray.push(score);
  }
  return scoreArray;
}
