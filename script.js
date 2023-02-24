//Begyndelsen af script
"use strict";

//start function
window.addEventListener("load", start);
//definer variabler
let score = 0;
let lives = 3;
let timer_state = 1;

function start() {
  //assign classes
  assignPaths(document.querySelector("#cookie_container1"));
  assignPaths(document.querySelector("#cookie_container2"));
  assignPaths(document.querySelector("#cookie_container3"));

  //Click listeners
  document.querySelector("#cookie_container1").addEventListener("mousedown", cookieClick1);
  document.querySelector("#cookie_container2").addEventListener("mousedown", cookieClick2);
  document.querySelector("#cookie_container3").addEventListener("mousedown", cookieClick3);

  //Animation end listeners
  document.querySelector("#cookie_container1").addEventListener("animationend", startCookie1);
  document.querySelector("#cookie_container2").addEventListener("animationend", startCookie2);
  document.querySelector("#cookie_container3").addEventListener("animationend", startCookie3);
  document.querySelector("#timer_cookie1").addEventListener("animationend", timerStep);
}
//timer animation hjælper
function timerStep() {
  console.log("timerStep start");
  let timer_cookie = document.querySelector("#timer_cookie" + timer_state);

  timer_cookie.removeEventListener("animationend", timerStep);
  if (timer_state < 13) {
    console.log("is under 13 time_state");
    timer_state++;
    timer_cookie = document.querySelector("#timer_cookie" + timer_state);
    console.log(timer_state);
    timer_cookie.classList.add("cookie_timer");
    timer_cookie.addEventListener("animationend", timerStep);
  } else {
    endGame();
  }
}

//får cookien til at forsvinde når de bliver klikket
function cookieClicker(cookieNum) {
  console.log("cookie" + cookieNum + " Clicked");
  let cookie_container = document.querySelector("#cookie_container" + cookieNum);

  cookie_container.removeEventListener("mousedown", window["cookieClick" + cookieNum]);
  cookie_container.classList.add("pause");
  document.querySelector("#cookie_img" + cookieNum).classList.add("clicked");

  if (cookie_container.classList.contains("bad_cookie")) {
    removeLives();
  } else {
    score++;
    updateScore();
  }
}

//starter cookies op igen
function startCookie(cookieNum) {
  console.log("cookie started");
  let cookie_container = document.querySelector("#cookie_container" + cookieNum);
  cookie_container.classList.remove("roll");
  cookie_container.classList.remove("reverse");
  removePaths(cookie_container);

  cookie_container.offsetLeft;
  cookie_container.classList.remove("pause");
  document.querySelector("#cookie_img" + cookieNum).classList.remove("clicked");
  cookie_container.addEventListener("mousedown", window["cookieClick" + cookieNum]);
  assignPaths(cookie_container);
}
function removePaths(cookieObj) {
  cookieObj.classList.remove("path1");
  cookieObj.classList.remove("path2");
  cookieObj.classList.remove("path3");
  cookieObj.classList.remove("path4");
  cookieObj.classList.remove("path5");
  cookieObj.classList.remove("path6");
  cookieObj.classList.remove("path7");
  cookieObj.classList.remove("path8");
}

function assignPaths(cookieObj) {
  if (Math.floor(Math.random() * 2) == 1) {
    cookieObj.classList.add("roll");
  } else {
    cookieObj.classList.add("reverse");
  }
  switch (Math.floor(Math.random() * 8)) {
    case 1:
      cookieObj.classList.add("path1");
      break;
    case 2:
      cookieObj.classList.add("path2");
      break;
    case 3:
      cookieObj.classList.add("path3");
      break;
    case 4:
      cookieObj.classList.add("path4");
      break;
    case 5:
      cookieObj.classList.add("path5");
      break;
    case 6:
      cookieObj.classList.add("path6");
      break;
    case 7:
      cookieObj.classList.add("path7");
      break;
    case 0:
      cookieObj.classList.add("path8");
      break;
  }
}

//fjern liv
function removeLives() {
  document.querySelector("#heart" + lives).classList.add("clicked");
  lives--;
  if (lives <= 0) {
    game_over();
  }
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

//idk hvordan jeg gør det uden de her
function cookieClick1() {
  cookieClicker(1);
}
function cookieClick2() {
  cookieClicker(2);
}
function cookieClick3() {
  cookieClicker(3);
}
function startCookie1() {
  startCookie(1);
}
function startCookie2() {
  startCookie(2);
}
function startCookie3() {
  startCookie(3);
}

//score updater
function updateScore() {
  document.querySelector("#scoreNum").textContent = score;
}
