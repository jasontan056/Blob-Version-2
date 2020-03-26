MIN_STARTING_VELOCITY = 4;
MAX_STARTING_VELOCITY = 7;
VERTEXES_PER_BLOB = 50;
CREATE_BLOB_PROB = 0.05;

const blobs = [];
let blobId = 0;

function setup() {
  createCanvas(800, 800);

  // !!!
  randomSeed(1);
}

function draw() {
  background(220);

  if (random() < CREATE_BLOB_PROB) {
    const center = createVector(random(width), random(height));
    const startingVelocityMag = random(
      MIN_STARTING_VELOCITY,
      MAX_STARTING_VELOCITY
    );
    blobs.push(
      (blob = new Blob(center, blobId, VERTEXES_PER_BLOB, startingVelocityMag))
    );

    blobId++;
  }

  for (let blob of blobs) {
    blob.update();
    blob.draw();
  }
}
