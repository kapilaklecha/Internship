const ifr = document.querySelector("#my-iframe");
let ele = null;
const btnLeft = document.querySelector("#left-btn");
const btnRight = document.querySelector("#right-btn");
const btnUp = document.querySelector("#up-btn");
const btnDown = document.querySelector("#down-btn");
const btnReset = document.querySelector("#reset");

ifr.onload = function () {
  var element = ifr.contentDocument || ifr.contentWindow.document;

  if (element) {
    ele = element.querySelector("#circle-wrapper-img");
  } else {
    console.error('Element with id "hello" not found.');
  }
};

let initialPos = {
  x: 0,
  y: 0,
};

let step = 10;

let posX = initialPos.x;
let posY = initialPos.y;

function changePos(dir) {
  if (dir === "up") {
    posY += step;
    ele.style.bottom = `${posY}px`;
  } else if (dir === "down") {
    posY -= step;
    ele.style.bottom = `${posY}px`;
  } else if (dir === "left") {
    posX -= step;
    ele.style.left = `${posX}px`;
  } else if (dir === "right") {
    posX += step;
    ele.style.left = `${posX}px`;
  }
}

btnUp.addEventListener("click", () => changePos("up"));
btnDown.addEventListener("click", () => changePos("down"));
btnLeft.addEventListener("click", () => changePos("left"));
btnRight.addEventListener("click", () => changePos("right"));

btnReset.addEventListener("click", () => {
  posX = initialPos.x;
  posY = initialPos.y;
  ele.style.left = `${posX}px`;
  ele.style.bottom = `${posY}px`;
});
