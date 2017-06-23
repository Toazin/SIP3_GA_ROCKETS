/*
    Modified from excercices of "http://natureofcode.com/".
    By:
        Toatzin Padilla Arias
        Mario Ivan Figueroa
    For: Inteligent Systems
*/

var lifetime;  // How long should each generation live

var population;  // Population

var lifeCounter;   // Timer for cycle of generation

var target;        // Target position

var info;

function setup() {
  createCanvas(640, 360);
  // The number of cycles we will allow a generation to live
  lifetime = height;

  // Initialize variables
  lifeCounter = 0;

  target = createVector(width/2, 24);

  // Create a population with a mutation rate, and population max
  var mutationRate = 0.05;
  population = new Population(mutationRate, 10);
  info = createP("");
  info.position(10,10);
}

function draw() {
  background(255);

  // Draw the start and target positions
  fill(255,0,0);
  stroke(0);
  ellipse(target.x,target.y,24,24);


  // If the generation hasn't ended yet
  if (lifeCounter < lifetime) {
    population.live();
    lifeCounter++;
    // Otherwise a new generation
  }
  else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  // Draw the start and target positions
  var rocket = population.getFitestRocket();
  if(rocket){
      fill(rocket.color[0],rocket.color[1], rocket.color[2]);
  }else{
      fill(255);
  }
  stroke(0);
  rect(5,90,24,24);


  // Display some info
  fill(0);
  if(rocket){
      info.html("Generation #: " + population.getGenerations() + "<br>" +
                "Cycles left: " + (lifetime-lifeCounter) + "<br>"+
                "Max Fitness: " + rocket.getFitness() + "<br>"+
                " From Rocket: " + rocket.id);
  }else{
      info.html("Generation #: " + population.getGenerations() + "<br>" +
                "Cycles left: " + (lifetime-lifeCounter) + "<br>");
  }

}
