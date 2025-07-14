let tempData = [
  { year: 1880, change: -0.12 },
  { year: 1900, change: -0.08 },
  { year: 1920, change: -0.07 },
  { year: 1940, change: 0.05 },
  { year: 1960, change: -0.02 },
  { year: 1980, change: 0.18 },
  { year: 2000, change: 0.42 },
  { year: 2020, change: 1.02 }
];

let padding = 80;
let graphWidth, graphHeight;
let maxChange, minChange;

let animationProgress = 0;
let tooltipAlpha = 0;
let hoveredPoint = -1;

function setup() {
  createCanvas(900, 500);
  textAlign(CENTER, CENTER);
  graphWidth = width - padding * 2;
  graphHeight = height - padding * 2;
  maxChange = max(tempData.map(d => d.change));
  minChange = min(tempData.map(d => d.change));
  frameRate(60);
}

function draw() {
  background(20, 30, 50);

  fill(255);
  textSize(24);
  text("Global Temperature Change (1880 - 2020) °C", width / 2, padding / 2);

  stroke(255);
  strokeWeight(2);
  line(padding, padding, padding, height - padding);
  line(padding, height - padding, width - padding, height - padding);

  fill(200);
  textSize(14);

  for (let i = 0; i <= 5; i++) {
    let interVal = lerp(minChange, maxChange, i / 5);
    let y = map(interVal, minChange, maxChange, height - padding, padding);
    text(interVal.toFixed(2) + "°C", padding - 50, y);
    stroke(255, 255, 255, 50);
    line(padding - 10, y, width - padding, y);
    noStroke();
  }

  for (let i = 0; i < tempData.length; i++) {
    let x = map(tempData[i].year, tempData[0].year, tempData[tempData.length - 1].year, padding, width - padding);
    text(tempData[i].year, x, height - padding + 30);
    stroke(255, 255, 255, 50);
    line(x, height - padding + 10, x, padding);
    noStroke();
  }

  noFill();
  stroke(255, 150, 0);
  strokeWeight(3);
  beginShape();
  let totalPoints = tempData.length;
  let pointsToDraw = animationProgress * (totalPoints - 1);
  for (let i = 0; i < totalPoints; i++) {
    if (i > pointsToDraw) break;
    let nextIndex = min(i + 1, totalPoints - 1);
    let x = map(tempData[i].year, tempData[0].year, tempData[totalPoints - 1].year, padding, width - padding);
    let y = map(tempData[i].change, minChange, maxChange, height - padding, padding);
    
    if (i == floor(pointsToDraw) && pointsToDraw % 1 != 0) {
      let nextX = map(tempData[nextIndex].year, tempData[0].year, tempData[totalPoints - 1].year, padding, width - padding);
      let nextY = map(tempData[nextIndex].change, minChange, maxChange, height - padding, padding);
      let interX = lerp(x, nextX, pointsToDraw % 1);
      let interY = lerp(y, nextY, pointsToDraw % 1);
      vertex(x, y);
      vertex(interX, interY);
      break;
    }
    
    vertex(x, y);
  }
  endShape();

  noStroke();
  fill(255, 150, 0);
  hoveredPoint = -1;
  for (let i = 0; i < tempData.length; i++) {
    let x = map(tempData[i].year, tempData[0].year, tempData[tempData.length - 1].year, padding, width - padding);
    let y = map(tempData[i].change, minChange, maxChange, height - padding, padding);
    let d = dist(mouseX, mouseY, x, y);
    let baseSize = 12;
    let pulse = 2 * sin(frameCount * 0.15 + i) + baseSize;
    let size = (d < 15) ? pulse + 6 : pulse;

    ellipse(x, y, size, size);

    if (d < 15) {
      hoveredPoint = i;
    }
  }

  if (hoveredPoint >= 0) {
    tooltipAlpha = lerp(tooltipAlpha, 255, 0.2);
  } else {
    tooltipAlpha = lerp(tooltipAlpha, 0, 0.2);
  }

  if (tooltipAlpha > 5 && hoveredPoint >= 0) {
    let x = map(tempData[hoveredPoint].year, tempData[0].year, tempData[tempData.length - 1].year, padding, width - padding);
    let y = map(tempData[hoveredPoint].change, minChange, maxChange, height - padding, padding);
    fill(255, 255, 255, tooltipAlpha);
    rect(x + 15, y - 45, 160, 60, 10);
    fill(20, 30, 50, tooltipAlpha);
    textSize(14);
    text(`Year: ${tempData[hoveredPoint].year}`, x + 95, y - 30);
    text(`Change: ${tempData[hoveredPoint].change.toFixed(2)}°C`, x + 95, y - 10);
  }

  if (animationProgress < 1) {
    animationProgress += 0.01;
  }
}
