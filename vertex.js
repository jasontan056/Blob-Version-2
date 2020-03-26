const FRICTION_CONSTANT = 0.1;
const MAX_SPEED = 10;
const MAX_FORCE = 0.5;

class Vertex {
  pos;
  blobId;

  #vel;
  #acc = p5.Vector.random2D().mult(0);

  constructor(blobId, startingPosition, startingVelocity) {
    this.blobId = blobId;
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
    const totalSteer = createVector(0, 0);
    let count = 0;
    for (vertex of nearbyVertexes) {
      const diff = p5.Vector.sub(this.pos, vertex.pos);
      const distance = diff.mag();
      const steer = diff.normalize().div(distance);
      totalSteer.add(steer);
      count++;
    }

    if (count > 0) {
      totalSteer.div(count);
    }

    if (totalSteer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      totalSteer.normalize();
      totalSteer.mult(MAX_SPEED);
      totalSteer.sub(this.velocity);
      totalSteer.limit(MAX_FORCE);
    }
    return totalSteer;
  };
}
