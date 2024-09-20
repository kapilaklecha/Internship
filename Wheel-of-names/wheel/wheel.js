<<<<<<< HEAD
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

// Array of entries
const entries = ["ram", "syam", "tom"];

const wheelRadius = canvas.width / 2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const numberOfEntries = entries.length;
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
    ctx.fillText(entries[i], 0, 0);
    ctx.restore();
  }
}

drawWheel();
=======
document.getElementById("canvas");

function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    const circle = new Path2D();
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.fill(circle);
  }
}
draw();
>>>>>>> parent of 0fd8d62... Added wheel ui
