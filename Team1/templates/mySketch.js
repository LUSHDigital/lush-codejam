// global settings - mess with these to alter sketch behaviour
var FRAME_ALPHA = 5; // background applied per frame with X% alpha
var SPAWN_MIN_X = 0; // minimum x pos of drop spawn (set in setup())
var SPAWN_MAX_X = 0; // maximum x pos of drop spawn (set in setup())
var MAX_X_SPEED = 0.5; // max speed that drops can "wander" left or right
var MAX_X_ACCEL = 0.025; // max rate that drops can accelerate left or right
var MAX_Y_SPEED = 7.5; // maximum speed of drops in pixels per frame
var GRAVITY = 0.0375; // gravity that moderates acceleration of drops
var FRICTION = 0.9925; // friction multiplier that slows drops in all directions
var MIN_RAD = 3; // minimum drop radius in pixels
var MAX_RAD = 6; // maximum drop radius in pixels
var MIN_RG = 64; // minimum red & green values for drops
var MAX_RG = 255; // maximum red & green values for drops
var EXPLODE_RAD = 250; // radius of explosion that pushes drops on click
var EXPLODE_STR = 5; // strength of click explosion

var drops = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(RGB, 255, 255, 255, 100);
	ellipseMode(RADIUS);
	noStroke();
	background(0);
	
	// non-static globals. Have drops spawn in the middle 80% of the screen
	SPAWN_MIN_X = windowWidth / 10;
	SPAWN_MAX_X = SPAWN_MIN_X * 9;
}

function draw() {
	// draw over the image with a certain amount of alpha
	background(0, 0, 0, FRAME_ALPHA);
	drops.push(new drop()); // add a new drop each frame
	
	// run all the drops! Splish Splash!
	for (var i = drops.length - 1; i >= 0; i--) {
		drops[i].Run();
		// remove drops that have fallen off the screen
		if (!drops[i].isAlive()) {
			drops.splice(i, 1);
		}
	}
}

// drop object
function drop() {
	this.x = random(SPAWN_MIN_X, SPAWN_MAX_X); // x pos of drop
	this.y = 0; // y pos of drop
	this.rad = random(MIN_RAD, MAX_RAD); // drop radius
	this.xSpeed = 0; // drop wander speed
	this.ySpeed = 0; // drop fall speed
	this.rg = random(MIN_RG, MAX_RG); // red & green colour of drop
	this.b = 255; // blue is always max
	
	this.Run = function() {
		this.Update();
		this.Display();
	};
	
	// animated the drop
	this.Update = function() {
		// apply gravity to drop
		this.ySpeed += GRAVITY;
		
		// make drop "wander" left & right
		var a = random(-MAX_X_ACCEL, MAX_X_ACCEL);
		this.xSpeed += a;
		
		// apply friction and movement
		this.xSpeed *= FRICTION;
		this.ySpeed *= FRICTION;
		this.y += this.ySpeed;
		this.x += this.xSpeed;
	};
	
	// draw the drop
	this.Display = function() {
		fill(this.rg, this.rg, this.b, 100);
		ellipse(this.x, this.y, this.rad, this.rad);
	};
	
	// check if drop is still alive or not
	this.isAlive = function() {
		return this.y < windowHeight + this.rad;
	};
}

// when mouse is clicked it pushes nearby drops away
function mouseClicked() {
	for (var i = 0; i < drops.length; i++) {
		// ignore drops that aren't close enough to mouse
		var dist = sqrt(sq(drops[i].x - mouseX) + sq(drops[i].y - mouseY));
		if (dist > EXPLODE_RAD) { continue; }
		
		// push drops away from mouse, depending on how close they are
		var v = createVector(drops[i].x - mouseX, drops[i].y - mouseY);
		var str = EXPLODE_STR * (EXPLODE_RAD - dist) / EXPLODE_RAD;
		v.normalize();
		v.mult(str);
		drops[i].xSpeed += v.x;
		drops[i].ySpeed += v.y;
	}
}