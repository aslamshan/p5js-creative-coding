let bubbles = [];
let baseText = "AMP - Any Means Possible";

function setup() {
  createCanvas(800, 800);
  colorMode(HSL, 360, 100, 100, 1);
  background(10);
  noCursor();
  textAlign(CENTER, CENTER);
  textFont('Orbitron, sans-serif');
}

function draw() {
  background(10, 0.1);

  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  let hue = map(speed, 0, 50, 180, 360);

  bubbles.push(new Bubble(mouseX, mouseY, random(15, 50), hue));

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].show();
    if (bubbles[i].alpha < 0) bubbles.splice(i, 1);
  }

  // Text pulse animation based on speed
  let pulse = map(speed, 0, 50, 24, 72, true);
  let textHue = map(speed, 0, 50, 0, 360);
  
  push();
  translate(width / 2, height / 2);
  fill(textHue, 90, 80);
  noStroke();
  textSize(pulse);
  text(baseText, 0, 0);
  pop();
}

function mousePressed() {
  for (let i = 0; i < 10; i++) {
    let size = random(20, 60);
    let offsetX = random(-50, 50);
    let offsetY = random(-50, 50);
    let speed = random(0, 50);
    let hue = map(speed, 0, 50, 180, 360);
    bubbles.push(new Bubble(mouseX + offsetX, mouseY + offsetY, size, hue));
  }
}

class Bubble {
  constructor(x, y, size, hue) {
    this.pos = createVector(x, y);
    this.size = size;
    this.hue = hue;
    this.alpha = 1;
    this.fadeSpeed = random(0.005, 0.02);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
  }
  
  update() {
    this.pos.add(this.vel);
    this.alpha -= this.fadeSpeed;
  }
  
  show() {
    noStroke();
    fill(this.hue, 90, 70, this.alpha * 0.6);
    ellipse(this.pos.x, this.pos.y, this.size * 1.5);
    fill(this.hue, 100, 80, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
