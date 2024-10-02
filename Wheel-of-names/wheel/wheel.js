import { users } from "../store.js";
import { resultsArr } from "../store.js";

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const results = document.querySelector(".display-results");
const winnerPopupName = document.querySelector(".winner-name");
const popup = document.querySelector(".popup-parent");
const popClose = document.querySelector("#close-pop");
const popCloseBtn = document.querySelector("#close-modal");
const greet = document.querySelector(".greet");
const removeBtn = document.querySelector("#remove-modal");

// Variables for the wheel

// const colors = [
//   "#FF6347",
//   "#FFD700",
//   "#90EE90",
//   "#87CEFA",
//   "#FF69B4",
//   "#9370DB",
// ];
let rotation = 0;
let isSpinning = false;
let spinSpeed = 0;

const radius = canvas.width / 2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let areaCircle = Math.PI * Math.pow(radius, 2);
// Function to draw the wheel
export function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (users.length === 0) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(225, 225, 225)";
    ctx.fill();
    return;
  }

  const anglePerSegment = (2 * Math.PI) / users.length;

  for (let i = 0; i < users.length; i++) {
    if (
      (users.length > 0 && users[i]["text"] === undefined) ||
      users[i]["color"] === undefined
    ) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(225, 225, 225)";
      ctx.fill();
      console.log("JSON must have text property and color property");
      return;
    }
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;
    let color = users[i]["color"];
    let isValid = isColor(color);
    let randCol = randomColor();
    if (isValid) {
      color = users[i]["color"];
    } else {
      color = randCol;
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSegment / 2);

    // We can add a switch statement to add more cases with different angles and sizes for font in this function

    let initText = users[i]["text"];

    let arcLength = 50 * anglePerSegment;
    let fontSize = getMaxFontSize(ctx, initText, arcLength);
    console.log(fontSize);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = `${fontSize}px Arial`;

    let metrics = ctx.measureText(initText);
    let widthText = metrics.width;

    let text = initText;
    if (widthText > 350) {
      text = formateText(initText);
    }

    // Working: text from the edge of the circle;
    // let xCord = radius / 2 - widthText + 5;
    // console.log(xCord);
    //Working: section ends here.

    ctx.fillText(text, radius / 1.5, 0, radius / 1.5);
    ctx.restore();
  }
  ctx.restore();
}

// function to spin the wheel and update it to ui.
// this function also stop the wheel.
function spinWheel() {
  if (!isSpinning) return;
  rotation += spinSpeed;
  spinSpeed *= 0.98;

  if (spinSpeed < 0.01) {
    isSpinning = false;
    spinSpeed = 0;
    declareWinner();
    return;
  }

  // This part rotate the context image.
  // ctx.save();
  // ctx.translate(centerX, centerY);
  // ctx.rotate(rotation);
  // ctx.translate(-centerX, -centerY);

  // drawWheel();

  // This part rotate the full canvas.
  canvas.style.transform = `rotate(${rotation}rad)`;
  requestAnimationFrame(spinWheel);
}

// fuction to start the spin.
function startSpin() {
  if (isSpinning || users.length === 0) return;
  isSpinning = true;
  spinSpeed = Math.random() * 1; // spin speed can be controlled from here.
  spinWheel();
}

// fuction to declare the winner and update to ui.
function declareWinner() {
  // Calculate the winner.
  const anglePerSegment = (2 * Math.PI) / users.length;
  const finalAngle = (2 * Math.PI - (rotation % (2 * Math.PI))) % (2 * Math.PI);
  const winningIndex = Math.floor(finalAngle / anglePerSegment);
  const winnerName = users[winningIndex]["text"];
  const winnerColor = users[winningIndex]["color"];

  // Updating the popup.
  winnerPopupName.innerText = winnerName;
  greet.style.backgroundColor = winnerColor;
  removeBtn.style.backgroundColor = winnerColor;
  popup.style.display = "block";

  resultsArr.push(winnerName);

  // Updating the results tab.
  let val = resultsArr[resultsArr.length - 1];
  let child = document.createElement("div");
  child.innerText = val;
  results.append(child);
}

canvas.addEventListener("click", startSpin);

drawWheel();

// Function to close the popup
function closePopup() {
  popup.style.display = "none";
}

popClose.addEventListener("click", closePopup);
popCloseBtn.addEventListener("click", closePopup);

function formateText(initText) {
  let shortText = initText.slice(0, 20);
  let finalText = shortText + "...";
  return finalText;
}

function isColor(colorName) {
  let valid = CSS.supports("color", colorName);
  return valid;
}

function randomColor() {
  let randomCol = "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
  return randomCol;
}

// Need improvement
function validFontSize(angle) {
  let fontSize = 24;

  if (angle < 0.25) {
    fontSize = 20;
  }
  if (angle < 0.15) {
    fontSize = 16;
  }
  if (angle > 2) {
    fontSize = 48;
  }
  return fontSize;
}

function getMaxFontSize(ctx, text, maxHeight) {
  console.log(maxHeight, "maxHeight");
  let fontSize = 32;
  const minFontSize = 1;

  ctx.font = `${fontSize}px Arial`;
  let metrics = ctx.measureText(text);
  let textHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  while (textHeight > maxHeight && fontSize > minFontSize) {
    fontSize--;
    ctx.font = `${fontSize}px Arial`;
    metrics = ctx.measureText(text);
    textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  }

  return fontSize;
}
