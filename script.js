//Begyndelsen af script

function cookieClicker(cookieNum) {
  console.log("cookie" + cookieNum + " Clicked");
  document
    .querySelector("#cookie_container" + cookieNum)
    .removeEventListener("click", window["cookieClick" + cookieNum]);
  document.querySelector("#cookie_container" + cookieNum).classList.add("pause");
  document.querySelector("#cookie_img" + cookieNum).classList.add("clicked");
}

function cookieClick1() {
  cookieClicker(1);
}
function cookieClick2() {
  cookieClicker(2);
}
function cookieClick3() {
  cookieClicker(3);
}

function startCookie(cookieNum) {
  console.log("cookie started");
  document.querySelector("#cookie_container" + cookieNum).classList.remove("roll");
  document.querySelector("#cookie_container" + cookieNum).offsetLeft;
  document.querySelector("#cookie_container" + cookieNum).classList.remove("pause");
  document.querySelector("#cookie_img" + cookieNum).classList.remove("clicked");
  document.querySelector("#cookie_container" + cookieNum).classList.add("roll");

  document
    .querySelector("#cookie_container" + cookieNum)
    .addEventListener("click", window["cookieClick" + cookieNum]);
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
//Click listeners
document.querySelector("#cookie_container1").addEventListener("click", cookieClick1);
document.querySelector("#cookie_container2").addEventListener("click", cookieClick2);
document.querySelector("#cookie_container3").addEventListener("click", cookieClick3);

//Animation end listeners
document.querySelector("#cookie_container1").addEventListener("animationend", startCookie1);
document.querySelector("#cookie_container2").addEventListener("animationend", startCookie2);
document.querySelector("#cookie_container3").addEventListener("animationend", startCookie3);
