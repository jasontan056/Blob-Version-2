const FRICTION_CONSTANT = 0.3;
const MAX_SPEED = 100;

class Vertex {
  pos;

  #blobId;
  #vel;
  #acc = p5.Vector.random2D().mult(0);

  constructor(blobId, startingPosition, startingVelocity) {
    this.#blobId = blobId;
    this.pos = startingPosition;
    this.#vel = startingVelocity;
  }

  update(nearbyVertexes) {
    // Calculate acceleration
    this.#acc.add(this.#calcFrictionForce());
    this.#acc.add(this.#calcSeparationForce(nearbyVertexes));

    this.#vel.add(this.#acc);
    this.#vel.limit(MAX_SPEED);
    this.pos.add(this.#vel);

    // Reset accelertion to 0 each cycle
    this.#acc.mult(0);
  }

  #calcFrictionForce = () => {
    if (FRICTION_CONSTANT > this.#vel.mag()) {
      return this.#vel.copy().mult(-1);
    }

    return this.#vel
      .copy()
      .normalize()
      .mult(-FRICTION_CONSTANT);
  };

  // Calculates separation force from nearby vertexes.
  #calcSeparationForce = nearbyVertexes => {
    // !!! implement
    return 0;
  };
}
