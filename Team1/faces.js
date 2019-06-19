var nb_r;
var all_diam;
var average_diam;

var r = [];

var img = [];
var pg1;
var pg2;

var current_img;

function preload() { // We have to load image before setup()
  for (var i = 1; i <= 1; i++) {
      img[i] = loadImage("dick.jpg");
  }
}

function setup() {
  createCanvas(1024, 768);
  pixelDensity(1); // Set 1 because it's too slow on firefox
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  nb_r = random(12, 18);
  for (var i = 0; i <= nb_r; i++) {
    r.push(new root());
  }  

  current_img = 1;
  pg1 = createGraphics(1024, 768);
  pg2 = createGraphics(1024, 768);
  pg1.background('#FFFFFF');
}

function draw() {
	//image(img, 0, 0, width, height);

	for (var i = 0; i < r.length; i++) {
    r[i].update();
   }
   
   //pg1.noStroke();
   pg1.noFill();
   for(var j = 0; j < r.length; j++) {
   	//pg1.fill(r[j].c);
    pg1.stroke(r[j].c);
    pg1.strokeWeight(1024/750);
   	//pg1.ellipse(r[j].loc.x, r[j].loc.y, 10, 10);

   	pg1.beginShape();
   	for (var k = 1; k <= 3; k++) {
   		pg1.vertex(r[j].loc.x + sin(r[j].angle+(radians(120)*k)) * r[j].diam, r[j].loc.y + cos(r[j].angle+(radians(120)*k)) * r[j].diam);
   	}
   	pg1.endShape(CLOSE);
   	r[j].angle+=0.1;
   }
  
   //image(pg1, 0, 0, width, height);


  pg2.clear(); // On efface les pixels précédents
  //pg2.blendMode(ADD);
  //pg2.blendMode(LIGHTEST);
  pg2.blendMode(SCREEN);
  pg2.image(img[current_img], 150, 0, 768, 768);
  pg2.image(pg1, 0, 0, 1024, 768);

  image(pg2, 0, 0, 1024, 768);


  for (var j = 0; j < r.length; j++) {
    all_diam += r[j].diam;
  }
  average_diam = all_diam/r.length-1;
  all_diam = 0;

  if (average_diam <= .5) {
    pg1.background('#FFFFFF');


    for (var i = 0; i <= nb_r; i++) {
      r.pop();
    }

    nb_r = random(12, 18);
    for (var j = 0; j <= nb_r; j++) {
      r.push(new root());
    }
    for (var k = 0; k < r.length; k++) {
      r[k].init();
   } 

    /*current_img += 1; 
    if (current_img > 5) {
      current_img = 1;
    }*/
  }
}

function root() {

  this.loc = createVector(width/2, height/2);
  this.speed = createVector();
  this.speed = p5.Vector.random2D();
  this.bam = createVector();
  this.diam = 1024/20;
  this.angle = random(TAU); // TAU = TWO_PI (btw)
  this.c = color(random(360), 100, 50, 30);

  this.init = function() {
    this.loc.set(1024/2, 768/2);
    this.diam = 1024/20;
    this.angle = random(TAU);
    this.c = color(random(360), 100, 50, 30);
  }

  this.update = function() {
  	this.diam -= random(0.01, 0.05);
    this.diam = constrain(this.diam, 0.5, 1024/20); 

    if (this.diam >= .5) {
      this.bam = p5.Vector.random2D(); // movement will be a bit erractic
      this.bam.mult(0.85);
      this.speed.add(this.bam);
      this.speed.normalize();
      this.speed.mult(1.5);
      this.loc = this.loc.add(this.speed);
    }
  } // End of update()
} // End of class

