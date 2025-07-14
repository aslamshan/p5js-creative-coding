let ballX = 200;
let ballY = 200;
let ballSize = 40;
let speedX = 3;
let speedY = 2;

let ballColor;

function setup() {
  createCanvas(400, 400);
  ballColor = color(255, 100, 100);
}

function draw() {
  background(240);

  stroke(200);
  for (let i = 0; i <= width; i += 40) {
    line(i, 0, i, height);
    line(0, i, width, i);
  }

  fill(ballColor);
  stroke(0);
  strokeWeight(2);
  ellipse(ballX, ballY, ballSize);

  ballX += speedX;
  ballY += speedY;

  if (ballX > width - ballSize / 2 || ballX < ballSize / 2) {
    speedX *= -1;
    ballColor = color(random(255), random(255), random(255)); // Change color on X edge
  }

  if (ballY > height - ballSize / 2 || ballY < ballSize / 2) {
    speedY *= -1;
    ballColor = color(random(255), random(255), random(255)); // Change color on Y edge
  }
}
