import { user } from "../store.js";

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const basicEntries = document.querySelector("#entries-panel");

// Array of entries
const entries = ["ram", "syam", "tom"];

const wheelRadius = canvas.width / 2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const numberOfEntries = user.length;
const anglePerEntry = (2 * Math.PI) / numberOfEntries;
// testing colors
const colors = [
  "#FF6347",
  "#FFD700",
  "#90EE90",
  "#87CEFA",
  "#FF69B4",
  "#9370DB",
];

// Function to draw the wheel
function drawWheel() {
  for (let i = 0; i < numberOfEntries; i++) {
    let { text, color } = user[i];
    const startAngle = i * anglePerEntry;
    const endAngle = startAngle + anglePerEntry;

    ctx.fillStyle = colors[i % colors.length];

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    const textAngle = startAngle + anglePerEntry / 2;
    const textX = centerX + (wheelRadius / 2) * Math.cos(textAngle);
    const textY = centerY + (wheelRadius / 2) * Math.sin(textAngle);

    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);
    ctx.fillStyle = "#000";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
}

drawWheel();

function see() {}
