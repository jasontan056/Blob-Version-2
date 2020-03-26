const FRICTION_CONSTANT = 0.01;

class Vertex {
  // Actual p5 vertex instance.
  p5Vertex;

  #pos;
  #vel;
  #acc;
  #frictionConstant;
  #maxSpeed;

  constructor(startingPos, startingVelocity) {
    this.#pos = startingPos;
    this.#vel = startingVelocity;
  }

  update() {
    // !!! calculate and add all the forces.

    
    this.#vel.add(this.#acc);
    this.#vel.limit(this.#maxSpeed);
    this.#pos.add(this.#vel);

    // Reset accelertion to 0 each cycle
    this.#acc.mult(0);
  }

  addForce() {}

  #calcFrictionForce() {}

  // Calculates separation force from other points in others.
  // Others is an array of position vectors.
  #calcSeparationForce(others) {}
}
