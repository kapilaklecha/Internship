let balls = [];
let div = document.querySelector(".ball"),
  g = 0.5,
  absorption = 0.7,
  bottom = 650;

class Ball {
  constructor(x, y, vx, vy) {
    this.pos = { x: x, y: y };
    this.v = { x: vx, y: vy };

    this.ele = div.cloneNode();
    document.body.appendChild(this.ele);
  }

  calc() {
    this.pos.x += this.v.x;
    this.pos.y += this.v.y;
    this.v.y += g;

    if (this.pos.y > bottom) {
      this.pos.y = bottom;
      this.v.y = -this.v.y * absorption;
    }

    if (this.pos.x < 0 || this.pos.x > 620) {
      this.v.x = -this.v.x;
    }
  }

  move() {
    this.ele.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
  }
}

(function loop() {
  for (let ball of balls) {
    ball.calc();
    ball.move();
  }
  requestAnimationFrame(loop);
})();

function position(e) {
  let x = e.clientX - 70;
  let y = e.clientY;
  let vx = 0.5;
  let vy = 10;
  let newBall = new Ball(x, y, vx, vy);
  balls.push(newBall);
}

document.addEventListener("click", position);
