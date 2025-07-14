function setup() {
  createCanvas(600, 400);
  background(220);
  drawCar(200, 300);
}

function drawCar(x, y) {
  fill(255, 0, 0);
  rect(x, y - 20, 200, 40, 10);
  rect(x + 40, y - 50, 120, 40, 10);

  fill(0);
  ellipse(x + 40, y + 20, 40, 40);
  ellipse(x + 160, y + 20, 40, 40);

  fill(255);
  rect(x + 50, y - 45, 30, 30, 5);
  rect(x + 100, y - 45, 30, 30, 5);

  stroke(100);
  line(0, y + 40, width, y + 40);
}
