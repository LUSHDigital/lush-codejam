/*
Frozen brush

Makes use of a delaunay algorithm to create crystal-like shapes.
I did NOT develop delaunay.js, and not sure who the author really is to give proper credit.

Controls:
	- Drag the mouse.
    - Press any key to toggle between fill and stroke.

Inspired by:
	Makio135's sketch www.openprocessing.org/sketch/385808

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var allParticles = [];
var maxLevel = 5;
var useFill = false;

var data = [];

var lastChime = 0; // milliseconds
var chimeCooldown = 100;
var colours = [217, 34];
var colour = colours[0];

var lastChimeLoop = setInterval(function() {
	lastChime = lastChime > 0 ? lastChime - chimeCooldown : 0;
}, chimeCooldown)

function _playSound() {
	
	var audio = new Audio("sounds/chime_bell 0.mp3");
	audio.play();
	
}

function playChime(sound_id) {
	
	if(lastChime == 0) {
		var audio = new Audio(chimes[sound_id]);
		audio.play();
		lastChime = chimeCooldown * 2;
	}
	
}

// Moves to a random direction and comes to a stop.
// Spawns other particles within its lifetime.
function Particle(x, y, level) {
  this.level = level;
  this.life = 0;
  
  this.pos = new p5.Vector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(map(this.level, 0, maxLevel, 5, 2));
  
  this.move = function() {
    this.life++;
    
    // Add friction.
    this.vel.mult(0.9);
    
    this.pos.add(this.vel);
    
    // Spawn a new particle if conditions are met.
    if (this.life % 10 == 0) {
      if (this.level > 0) {
        this.level -= 1;
        var newParticle = new Particle(this.pos.x, this.pos.y, this.level-1);
        allParticles.push(newParticle);
      }
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight); 
  
  colorMode(HSB, 360);
  
  textAlign(CENTER);
  
  background(0);
} 


function draw() {
  // Create fade effect.
  noStroke();
  fill(0, 30);
  rect(0, 0, width, height);
  
  // Move and spawn particles.
  // Remove any that is below the velocity threshold.
  for (var i = allParticles.length-1; i > -1; i--) {
    allParticles[i].move();
    
    if (allParticles[i].vel.mag() < 0.01) {
      allParticles.splice(i, 1);
    }
  }
  
  if (allParticles.length > 0) {
    // Run script to get points to create triangles with.
    data = Delaunay.triangulate(allParticles.map(function(pt) {
      return [pt.pos.x, pt.pos.y];
    }));
  	
    strokeWeight(0.1);
    
    // Display triangles individually.
    for (var i = 0; i < data.length; i += 3) {
      // Collect particles that make this triangle.
      var p1 = allParticles[data[i]];
      var p2 = allParticles[data[i+1]];
      var p3 = allParticles[data[i+2]];
      
      // Don't draw triangle if its area is too big.
      var distThresh = 75;
      
      if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
        continue;
      }
      
      if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }
      
      if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }
      
      // Base its hue by the particle's life.
        noStroke();
        fill(colour+p1.life*1.5, 360, 360);
      
      triangle(p1.pos.x, p1.pos.y, 
               p2.pos.x, p2.pos.y, 
               p3.pos.x, p3.pos.y);
	  
	  _rand = Math.floor(Math.random() * Math.floor(3));
	  // playChime(_rand)
	  
    }
  }
  
  noStroke();
  fill(255);
  // text("Click and drag the mouse\nPress any key to change to fill/stroke", width/2, height-50);
}

// function mouseDragged() {
  // allParticles.push(new Particle(mouseX, mouseY, maxLevel));
// }

// function mouseClicked() {
	// colour = colours[Math.floor(Math.random() * Math.floor(colours.length))];
// }

setInterval(function() {
	colour = colours[Math.floor(Math.random() * Math.floor(colours.length))];
}, 5000)

/*
 *	Generates the pattern the crystals are formed
*/
var step = 35; // pixels
var stepAllowance = 1000;
var lastDirection = 0;
var posX = window.innerWidth / 2;
var posY = window.innerHeight / 2;

function move(direction) {
	
	switch(direction) {
		case(0):
			lastDirection = "north";
			allParticles.push(new Particle(posX, posY += step, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(1):
			lastDirection = "north-east";
			allParticles.push(new Particle(posX += step, posY += step, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(2):
			lastDirection = "east";
			allParticles.push(new Particle(posX += step, posY, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(3):
			lastDirection = "south-east";
			allParticles.push(new Particle(posX += step, posY -= step, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(4):
			lastDirection = "south";
			allParticles.push(new Particle(posX, posY -= step, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(5):
			lastDirection = "south-west";
			allParticles.push(new Particle(posX -= step, posY -= step, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(6):
			lastDirection = "west";
			allParticles.push(new Particle(posX -= step, posY, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
		case(7):
			lastDirection = "north-west";
			allParticles.push(new Particle(posX -= step, posY += step, maxLevel));
			console.log("direction " + lastDirection + " posX " + posX + " posY " + posY);
			break;
	}
}

function chooseDirection() {
	var _rand = Math.floor(Math.random() * Math.floor(7))
	
	var cantGoNorth	= (posY - step) <= 0,
		cantGoEast	= (posX + step) >= window.innerWidth,
		cantGoWest	= (posX - step) <= 0,
		cantGoSouth	= (posY + step) >= window.innerHeight
		
	console.log(cantGoNorth, cantGoEast, cantGoWest, cantGoSouth);
	
	var x = 1
	
	if(cantGoNorth) {
		posY = window.innerHeight - (step * x);
	}
	else if(cantGoEast) {
		posX = 0 + (step * x);
	}
	else if(cantGoSouth) {
		posY = 0 + (step * x);
	}
	else if(cantGoWest) {
		posX = window.innerWidth - (step * x);
	}
	
	move(_rand);
}

setInterval(function() {
	
	centerY = window.innerHeight / 2;
	centerX = window.innerWidth / 2;
	
	if(stepAllowance > 0) {
		chooseDirection();
		// stepAllowance--;
	}

	
}, 100)
