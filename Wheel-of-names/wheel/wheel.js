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

// Function to draw the wheel
export function drawWheel() {
  const radius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

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
      // throw new Error("JSON must have text property and color property");
      console.log("JSON must have text property and color property");
      return;
    }
    const startAngle = i * anglePerSegment + rotation;
    const endAngle = startAngle + anglePerSegment;

    ctx.fillStyle = users[i]["color"];
    // users[i]["color"] = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText(users[i]["text"], radius / 1.5, 0);
    ctx.restore();
  }
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

  drawWheel();
  requestAnimationFrame(spinWheel);
}

// fuction to start the spin.
function startSpin() {
  if (isSpinning || users.length === 0) return;
  isSpinning = true;
  spinSpeed = Math.random() * 1; // spin speed can be controlled form here.
  spinWheel();
}

// fuction to declare the winner and update to ui.
function declareWinner() {
  // Calculate the winner.
  const anglePerSegment = (2 * Math.PI) / users.length;
  const finalAngle = rotation % (2 * Math.PI);
  const winningIndex = Math.floor(
    (users.length - finalAngle / anglePerSegment) % users.length
  );
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

// fuction to close the popup.
function closePopup() {
  popup.style.display = "none";
}

popClose.addEventListener("click", closePopup);
popCloseBtn.addEventListener("click", closePopup);
