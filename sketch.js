MIN_STARTING_VELOCITY = 3;
MAX_STARTING_VELOCITY = 4;
VERTEXES_PER_BLOB = 11;

let blob;

function setup() {
  createCanvas(800, 800);

  // !!!
  randomSeed(1);

  const center = createVector(random(width), random(height));
  const blobId = 0;
  blob = new Blob(center, blobId, VERTEXES_PER_BLOB, MIN_STARTING_VELOCITY, MAX_STARTING_VELOCITY)
}

function draw() {
  background(220);

  blob.update();
  blob.draw();
}
