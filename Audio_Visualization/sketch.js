let song;
let fft;
let amplitude;
let canvasSize = 600;
let isPlaying = false;
let soundLoaded = false;
let soundLoadError = false;

function preload() {
  song = loadSound(
    'https://p5js.org/assets/beat.mp3',
    () => { soundLoaded = true; },
    () => { soundLoadError = true; }
  );
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  noFill();
  fft = new p5.FFT(0.8, 64);
  amplitude = new p5.Amplitude();
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  noStroke();
}

function draw() {
  background(20, 20, 40, 150);

  if (soundLoadError) {
    fill(255, 0, 0);
    text("Error: Audio failed to load 😞", width / 2, height / 2);
    return;
  }

  if (!soundLoaded) {
    fill(255);
    text("Loading audio... ⏳", width / 2, height / 2);
    return;
  }

  if (!isPlaying) {
    fill(255);
    text("Click to Play Music 🎵", width / 2, height / 2);
    return;
  }

  let level = amplitude.getLevel();
  let circleSize = map(level, 0, 0.5, 50, 400);

  stroke(255, 150, 0);
  strokeWeight(4);
  ellipse(width / 2, height / 2, circleSize);

  let spectrum = fft.analyze();

  noStroke();
  fill(255, 150, 0);

  let barWidth = width / spectrum.length;

  for (let i = 0; i < spectrum.length; i++) {
    let h = map(spectrum[i], 0, 255, 0, height / 2);
    rect(i * barWidth, height, barWidth - 2, -h);
  }
}

function mousePressed() {
  if (!soundLoaded || soundLoadError) return;

  if (!isPlaying) {
    song.play();
    isPlaying = true;
  } else {
    song.pause();
    isPlaying = false;
  }
}
