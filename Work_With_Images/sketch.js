let img;
let imgCopy;
let step = 10;
let effect = 1;

function preload() {
  loadImage(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/600px-Sunflower_sky_backdrop.jpg',
    loadedImage => {
      img = loadedImage;
    },
    err => {
      console.error('Image failed to load, using fallback background');
      img = null;
    }
  );
}

function setup() {
  if (img) {
    createCanvas(img.width, img.height);
    imgCopy = createImage(img.width, img.height);
    imgCopy.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  } else {
    createCanvas(400, 400);
  }
  noStroke();
  imageMode(CORNER);
  noLoop();
  drawEffect();
}

function draw() {
  // no continuous redraw
}

function drawEffect() {
  background(255);

  if (!img) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Image failed to load', width / 2, height / 2);
    return;
  }

  if (effect === 1) {
    image(img, 0, 0);
  } else if (effect === 2) {
    pointillismEffect();
  } else if (effect === 3) {
    posterizeEffect();
  }
}

function pointillismEffect() {
  img.loadPixels();
  for (let y = 0; y < img.height; y += step) {
    for (let x = 0; x < img.width; x += step) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      fill(r, g, b);
      ellipse(x, y, step, step);
    }
  }
}

function posterizeEffect() {
  imgCopy.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  imgCopy.loadPixels();
  for (let i = 0; i < imgCopy.pixels.length; i += 4) {
    imgCopy.pixels[i] = floor(imgCopy.pixels[i] / 64) * 64;
    imgCopy.pixels[i + 1] = floor(imgCopy.pixels[i + 1] / 64) * 64;
    imgCopy.pixels[i + 2] = floor(imgCopy.pixels[i + 2] / 64) * 64;
  }
  imgCopy.updatePixels();
  image(imgCopy, 0, 0);
}

function keyPressed() {
  if (!img) return;

  if (key === '1') {
    effect = 1;
  } else if (key === '2') {
    effect = 2;
  } else if (key === '3') {
    effect = 3;
  }
  drawEffect();
}
