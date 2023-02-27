//Begyndelsen af script
"use strict";

//start function
window.addEventListener("load", start);
//definer variabler
let score = 0;
let lives = 3;
let timer_state = 1;

let cookieObj1 = document.querySelector("#cookie_container1");
let cookieObj2 = document.querySelector("#cookie_container2");
let cookieObj3 = document.querySelector("#cookie_container3");
function start() {
  //assign classes
  assignPaths(cookieObj1);
  assignPaths(cookieObj2);
  assignPaths(cookieObj3);

  startEventListernes();
}

function startEventListernes() {
  //Animation end listeners
  cookieObj1.addEventListener("animationend", startCookie);
  cookieObj2.addEventListener("animationend", startCookie);
  cookieObj3.addEventListener("animationend", startCookie);
  document.querySelector("#timer_cookie1").addEventListener("animationend", timerStep);

  //Click listeners
  cookieObj1.addEventListener("mousedown", cookieClicker);
  cookieObj2.addEventListener("mousedown", cookieClicker);
  cookieObj3.addEventListener("mousedown", cookieClicker);
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

  if (cookie_container.classList.contains("bad_cookie")) {
    removeLives();
  } else if (cookie_container.classList.contains("life_cookie")) {
    if (lives >= 3) {
      score += 5;
      updateScore();
    } else {
      addLives();
    }
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
  let randumNum = mat.floor(math.random() * 10) + 1;
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
  lives++;
  let lifeObj = document.querySelector("#heart" + lives);
  lifeObj.classList.remove("clicked");
}

//end game
function endGame() {
  if (score < 10) {
    game_over();
  } else {
    level_complete();
  }
}

//level complete
function level_complete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#highscore").textContent = "Your score is: " + score;
}
function game_over() {
  document.querySelector("#game_over").classList.remove("hidden");
}

//score updater
function updateScore() {
  document.querySelector("#scoreNum").textContent = score;
}
