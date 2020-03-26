const MIN_STARTING_VELOCITY = 4;
const MAX_STARTING_VELOCITY = 7;
const VERTEXES_PER_BLOB = 50;
const CREATE_BLOB_PROB = 0.05;

const QUAD_TREE_CAPACITY = 4;

const blobs = [];
let blobId = 0;
let quadTree;

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

  // Create quadtree
  const boundary = new Rectangle(width / 2, height / 2, width, height);
  quadTree = new QuadTree(boundary, QUAD_TREE_CAPACITY);
  for (let blob of blobs) {
    for (vertex of blob.vertexes) {
      const point = new Point(vertex.pos.x, vertex.pos.y, vertex);
      quadTree.insert(point);
    }
  }

  for (let blob of blobs) {
    blob.update(quadTree);
    blob.draw();
  }
}
