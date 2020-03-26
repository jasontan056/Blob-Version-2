class Blob {
  #blobId;
  #vertexes = [];
  #color = [random(255), random(255), random(200)];

  constructor(centerPosition, blobId, numVertexes, startingVelocityMag) {
    this.#blobId = blobId;

    let angle = 0;
    const angleInc = TWO_PI / numVertexes;
    for (let i = 0; i < numVertexes; i++) {
      const startingVelocity = p5.Vector.fromAngle(angle).setMag(
        startingVelocityMag
      );
      this.#vertexes.push(new Vertex(centerPosition.copy(), startingVelocity));

      angle += angleInc;
    }
  }

  // !!! will have a vertexes array that is a quadtree filled with all vertexes on the screen.
  update() {
    this.#vertexes.forEach(vertex => {
      vertex.update();
    });
  }

  draw() {
    stroke(...this.#color);
    strokeWeight(3);
    noFill();
    beginShape();
    this.#vertexes.forEach(vertex => curveVertex(vertex.pos.x, vertex.pos.y));
    endShape(CLOSE);

    // Draw a point at each vertex for debugging purposes.
    stroke("red");
    strokeWeight(3);
    this.#vertexes.forEach(vertex => point(vertex.pos.x, vertex.pos.y));
  }
}
