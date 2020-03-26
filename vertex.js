const FRICTION_CONSTANT = .01;
const MAX_SPEED = 100;

class Vertex {
  pos;

  #vel;
  #acc = p5.Vector.random2D().mult(0);

  constructor(startingPosition, startingVelocity) {
    this.pos = startingPosition;
    this.#vel = startingVelocity;
  }

  update() {
    // Calculate acceleration
    this.#acc.add(this.#calcFrictionForce());
    //!!!this.#acc.add(this.#calcSeparationForce());

    this.#vel.add(this.#acc);
    this.#vel.limit(MAX_SPEED);
    this.pos.add(this.#vel);

    // Reset accelertion to 0 each cycle
    this.#acc.mult(0);
  }

  #calcFrictionForce = () => {
      return this.#vel.copy().normalize().mult(-FRICTION_CONSTANT);
  }

  // Calculates separation force from other points in others.
  // Others is an array of position vectors.
  #calcSeparationForce = (others) => {
        // !!! implement
      return 0;
  }
}
