function setup() {
  createCanvas(600, 600);
  background(20);
  noLoop();
}

function draw() {
  background(20);
  translate(width / 2, height / 2);

  push();
  rotate(radians(-10));
  scale(1.2, 1.4);
  drawAlienBody();
  pop();

  push();
  translate(0, -150);
  rotate(radians(5));
  drawAlienHead();
  pop();

  push();
  translate(-120, 20);
  rotate(radians(sin(frameCount * 0.1) * 20));
  drawAlienArm();
  pop();

  push();
  translate(120, 20);
  rotate(radians(-sin(frameCount * 0.1) * 20));
  drawAlienArm();
  pop();

  push();
  translate(-40, -200);
  drawAntenna();
  pop();

  push();
  translate(40, -200);
  drawAntenna();
  pop();
}

function drawAlienBody() {
  fill(50, 200, 100);
  stroke(0, 150, 50);
  strokeWeight(3);

  beginShape();
  vertex(-80, 100);
  bezierVertex(-120, 50, -120, -100, 0, -120);
  bezierVertex(120, -100, 120, 50, 80, 100);
  endShape(CLOSE);

  fill(30, 150, 70);
  noStroke();
  ellipse(0, 20, 100, 140);
}

function drawAlienHead() {
  fill(70, 255, 140);
  stroke(0, 180, 70);
  strokeWeight(3);

  beginShape();
  vertex(-60, 0);
  bezierVertex(-90, -40, -50, -90, 0, -80);
  bezierVertex(50, -90, 90, -40, 60, 0);
  bezierVertex(40, 20, -40, 20, -60, 0);
  endShape(CLOSE);

  fill(0);
  ellipse(-25, -30, 30, 40);
  ellipse(25, -30, 30, 40);

  fill(255);
  ellipse(-25, -30, 15, 20);
  ellipse(25, -30, 15, 20);

  fill(0);
  let pupilOffset = sin(frameCount * 0.05) * 5;
  ellipse(-25 + pupilOffset, -30, 8, 12);
  ellipse(25 + pupilOffset, -30, 8, 12);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(0, 10, 50, 20, 0, PI);
}

function drawAlienArm() {
  fill(40, 180, 90);
  stroke(0, 130, 60);
  strokeWeight(3);
  beginShape();
  vertex(0, 0);
  bezierVertex(20, 40, 60, 60, 10, 80);
  bezierVertex(-40, 80, -30, 40, 0, 0);
  endShape(CLOSE);

  fill(30, 160, 80);
  noStroke();
  ellipse(10, 80, 15, 15);
  ellipse(0, 90, 15, 15);
  ellipse(-15, 85, 15, 15);
}

function drawAntenna() {
  stroke(100, 255, 150);
  strokeWeight(4);
  line(0, 0, 0, -50);
  fill(0, 255, 150);
  noStroke();
  ellipse(0, -55, 15, 15);
}
