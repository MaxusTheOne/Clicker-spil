//Begyndelsen af script
"use strict";

//start function
window.addEventListener("load", start);
//definer variabler
let score = 0;
let lives = 3;
let timer_state = 1;
let highscore = 0;

let cookieObj1 = document.querySelector("#cookie_container1");
let cookieObj2 = document.querySelector("#cookie_container2");
let cookieObj3 = document.querySelector("#cookie_container3");
let cookieObj4 = document.querySelector("#cookie_container4");
let cookieObj5 = document.querySelector("#cookie_container5");
let cookieObj6 = document.querySelector("#cookie_container6");
function start() {
  //reset variables
  score = 0;
  lives = 3;
  timer_state = 1;
  updateScore();

  //start cookies
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

  document.querySelector("#timer_cookie1").classList.add("cookie_timer");
  document.querySelector("#timer_cookie1").addEventListener("animationend", timerStep);
}

function assignStartClass(cookieObj) {
  assignPaths(cookieObj);

  assignType(cookieObj);
}

function startEventListernes(cookieObj) {
  //Animation end listeners
  cookieObj.addEventListener("animationend", startCookie);

  //Click listeners
  cookieObj.addEventListener("mousedown", cookieClicker);
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
  console.log(this);
  cookie_container.removeEventListener("mousedown", cookieClicker);
  cookie_container.classList.add("pause");
  cookie_container.querySelector("img").classList.add("clicked");

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
  console.log("cookie started");
  let cookie_container = this;
  removePaths(cookie_container);
  cookie_container.classList.remove("roll", "reverse");

  cookie_container.offsetLeft;
  cookie_container.classList.remove("pause");
  cookie_container.querySelector("img").classList.remove("clicked");
  cookie_container.addEventListener("mousedown", cookieClicker);
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
  if (score < 25) {
    game_over();
  } else {
    level_complete();
  }
}

//score updater
function updateScore() {
  document.querySelector("#scoreNum").textContent = score;
}

//level complete
function level_complete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#score").textContent = "Your score is: " + score;
  document.querySelector("#lvCompleteRestart").addEventListener("click", restartGame);
}

//game over
function game_over() {
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#gameOverRestart").addEventListener("click", restartGame);
}

function restartGame() {
  console.log("restarting...");
  document.querySelector("#gameOverRestart").removeEventListener("click", restartGame);
  document.querySelector("#lvCompleteRestart").removeEventListener("click", restartGame);
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");

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
  addLives();
  addLives();
  addLives();

  start();
}
