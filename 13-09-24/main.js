const playArea = document.getElementById("play-area");
const gravity = 0.5;
const damping = 0.75;
const ballRadius = 10;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * -10;
    this.mass = 1;
    this.el = document.createElement("div");
    this.el.classList.add("ball");
    this.updatePosition();
    playArea.appendChild(this.el);
  }

  updatePosition() {
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.y + 2 * ballRadius > window.innerHeight) {
      this.y = window.innerHeight - 2 * ballRadius;
      this.vy *= -damping;
    }

    if (this.x <= 0 || this.x + 2 * ballRadius >= window.innerWidth) {
      this.vx *= -1;
    }

    if (
      Math.abs(this.vy) < 1 &&
      this.y + 2 * ballRadius >= window.innerHeight
    ) {
      this.vy = 0;
      this.vx *= 0.98;
      if (Math.abs(this.vx) < 0.1) {
        this.vx = 0;
      }
    }

    this.updatePosition();
  }

  checkCollision(otherBall) {
    const dx = otherBall.x - this.x;
    const dy = otherBall.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 2 * ballRadius) {
      this.resolveCollision(otherBall); // Handle collision response
    }
  }

  // Handle the collision response based on physics
  resolveCollision(otherBall) {
    const dx = otherBall.x - this.x;
    const dy = otherBall.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector
    const normalX = dx / distance;
    const normalY = dy / distance;

    // Calculate relative velocity
    const relativeVelocityX = this.vx - otherBall.vx;
    const relativeVelocityY = this.vy - otherBall.vy;

    // Calculate the velocity along the normal direction (dot product)
    const velocityAlongNormal =
      relativeVelocityX * normalX + relativeVelocityY * normalY;

    console.log(relativeVelocityX);

    // If the balls are moving away from each other, do nothing
    if (velocityAlongNormal > 0) return;

    // Apply the impulse to both balls (assuming equal mass)
    const impulse = (2 * velocityAlongNormal) / (this.mass + otherBall.mass);
    this.vx -= impulse * normalX * otherBall.mass;
    this.vy -= impulse * normalY * otherBall.mass;
    otherBall.vx += impulse * normalX * this.mass;
    otherBall.vy += impulse * normalY * this.mass;

    // Separate the balls to prevent overlapping
    const overlap = 2 * ballRadius - distance;
    const separationX = (overlap * normalX) / 2;
    const separationY = (overlap * normalY) / 2;
    this.x -= separationX;
    this.y -= separationY;
    otherBall.x += separationX;
    otherBall.y += separationY;
    console.log([this.vx, this.vy]);
  }
}

const balls = [];

function createBall(event) {
  const ball = new Ball(event.clientX - ballRadius, event.clientY - ballRadius);
  balls.push(ball);
}

function animate() {
  balls.forEach((ball) => {
    ball.move();
    balls.forEach((otherBall) => {
      if (ball !== otherBall) {
        ball.checkCollision(otherBall);
      }
    });
  });
  requestAnimationFrame(animate);
}

animate();

playArea.addEventListener("click", createBall);
