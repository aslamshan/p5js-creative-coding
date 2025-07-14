function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  noFill();
  strokeWeight(2);
  background(0);
}

function draw() {
  background(0, 0, 0, 20); // fade for trailing effect
  
  translate(width / 2, height / 2);
  
  let total = 120;
  let maxRadius = 250;
  let time = frameCount * 0.02;
  
  for (let i = 0; i < total; i++) {
    let angle = map(i, 0, total, 0, TWO_PI * 5) + time; // spiral spins
    
    // Radius oscillates with sine waves for pulsating effect
    let radius = map(sin(time * 3 + i * 0.3), -1, 1, maxRadius * 0.3, maxRadius);
    
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    
    let hue = (angle * 180 / PI + frameCount) % 360;
    
    stroke(hue, 90, 100);
    
    // Draw pulsating circles on the spiral
    let size = map(sin(time * 5 + i), -1, 1, 5, 20);
    ellipse(x, y, size, size);
  }
}
