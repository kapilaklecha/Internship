import { users } from "../store.js";
import { resultsArr } from "../store.js";

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const results = document.querySelector(".display-results");
const winnerPopupName = document.querySelector(".winner-name");
const popup = document.querySelector(".popup-parent");
const popClose = document.querySelector("#close-pop");
const popCloseBtn = document.querySelector("#close-modal");

// Variables for the wheel

const colors = [
  "#FF6347",
  "#FFD700",
  "#90EE90",
  "#87CEFA",
  "#FF69B4",
  "#9370DB",
];
let rotation = 0;
let isSpinning = false;
let spinSpeed = 0;
const winnerDisplay = document.createElement("div");

// Function to draw the wheel
export function drawWheel() {
  const radius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (users.length === 0) {
    ctx.beginPath();
    ctx.arc(centerX, centerX, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  const anglePerSegment = (2 * Math.PI) / users.length;

  for (let i = 0; i < users.length; i++) {
    const startAngle = i * anglePerSegment + rotation;
    const endAngle = startAngle + anglePerSegment;

    ctx.fillStyle = colors[i % colors.length];
    users[i]["color"] = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.strokeStyle = "FFFFFF";
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(users[i]["text"], radius / 1.5, 0);
    ctx.restore();
  }
}

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

function startSpin() {
  if (isSpinning || users.length === 0) return;
  isSpinning = true;
  spinSpeed = Math.random() * 0.2;
  spinWheel();
  console.log(users);
}

function declareWinner() {
  const anglePerSegment = (2 * Math.PI) / users.length;
  const finalAngle = rotation % (2 * Math.PI);
  const winningIndex = Math.floor(
    (users.length - finalAngle / anglePerSegment) % users.length
  );
  const winnerName = users[winningIndex]["text"];
  winnerPopupName.innerText = winnerName;
  popup.style.display = "block";
  resultsArr.push(winnerName);
  let val = resultsArr[resultsArr.length - 1];

  let child = document.createElement("div");
  child.innerText = val;
  results.append(child);
}

canvas.addEventListener("click", startSpin);

drawWheel();

function closePopup() {
  popup.style.display = "none";
}

popClose.addEventListener("click", closePopup);
popCloseBtn.addEventListener("click", closePopup);
