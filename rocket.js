/*
    Modified from excercices of "http://natureofcode.com/".
    By:
        Toatzin Padilla Arias
        Mario Ivan Figueroa
    For: Inteligent Systems
*/

//constructor
function Rocket(l, dna_, id) {
  // All of our physics stuff
  this.acceleration = createVector();
  this.velocity = createVector();
  this.position = l.copy();
  // Size
  this.r = 4;
  // Fitness and DNA
  this.fitness = 0;
  this.dna = dna_;
  // To count which force we're on in the genes
  this.geneCounter = 0;
  this.color = (function () {
      var arr = [];
      arr.push(random(0, 255));
      arr.push(random(0, 255));
      arr.push(random(0, 255));
      return arr;
  })();
  this.id = id;

  this.hitTarget = false;   // Did I reach the target

  // Fitness function
  // fitness = one divided by distance squared
  this.calcFitness = function() {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = pow(1/d, 2);
  };

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  this.run = function() {
    this.checkTarget(); // Check to see if we've reached the target
    if (!this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
    }
    this.display();
  };

  // Did I make it to the target?
  this.checkTarget = function() {
    var d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 12) {
      this.hitTarget = true;
    }
  };

  this.applyForce = function(f) {
    this.acceleration.add(f);
  };

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function() {
    var theta = this.velocity.heading() + PI/2;
    var r = this.r;
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Thrusters
    rectMode(CENTER);
    fill(0);
    rect(-r/2, r*2, r/2, r);
    rect(r/2, r*2, r/2, r);

    // Rocket body
    fill(this.color[0],this.color[1],this.color[2]);
    beginShape(TRIANGLES);
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);

    pop();
  };

  this.getFitness = function() {
    return this.fitness;
  };

  this.getDNA = function() {
    return this.dna;
  };
}
