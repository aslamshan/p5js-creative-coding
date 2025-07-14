let trail = [];
const maxTrailLength = 50;

function setup() {
  createCanvas(800, 600);
  background(20);
  noStroke();
  colorMode(HSL, 360, 100, 100, 1);
}

function draw() {
  background(20, 20, 30, 0.1);

  trail.push({
    x: mouseX,
    y: mouseY,
    life: 1,
    hue: frameCount % 360
  });

  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    fill(t.hue, 80, 60, t.life);
    let size = map(i, 0, trail.length, 5, 30);
    ellipse(t.x, t.y, size);
    t.life -= 0.02;
  }
}
