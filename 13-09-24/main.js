const playArea = document.getElementById("play-area");
const starter = document.querySelector("#starter");
const gravity = 0.5;
const damping = 0.75;
const ballRadius = 20;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * -10;
    this.mass = 1;
    this.color = "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
    this.el = document.createElement("div");
    this.el.classList.add("ball");
    this.el.style.backgroundColor = this.color;
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
    const rSum = ballRadius * 2;
    const dx = otherBall.x - this.x;
    const dy = otherBall.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the distance between the balls is less than their combined radius
    if (distance < rSum) {
      this.resolveCollision(otherBall);
    }
  }

  resolveCollision(otherBall) {
    const dx = otherBall.x - this.x;
    const dy = otherBall.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normal vector between the balls
    const normal = [dx / distance, dy / distance];

    // Relative velocity
    const relativeVelocity = [otherBall.vx - this.vx, otherBall.vy - this.vy];

    // Velocity along the normal direction
    const velocityAlongNormal =
      relativeVelocity[0] * normal[0] + relativeVelocity[1] * normal[1];

    // If balls are moving apart, no need to resolve the collision
    if (velocityAlongNormal > 0) return;

    // Coefficient of restitution (elasticity)
    const restitution = 0.75;

    // Impulse scalar based on the restitution and masses of the balls
    const impulseScalar = -(1 + restitution) * velocityAlongNormal;
    const totalMass = this.mass + otherBall.mass;
    const impulse = impulseScalar / totalMass;

    // Apply the impulse to the velocities of both balls
    this.vx -= impulse * this.mass * normal[0];
    this.vy -= impulse * this.mass * normal[1];
    otherBall.vx += impulse * otherBall.mass * normal[0];
    otherBall.vy += impulse * otherBall.mass * normal[1];
  }
}

const balls = [];

function createBall(event) {
  starter.innerHTML = "";
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
