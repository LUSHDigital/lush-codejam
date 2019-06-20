var x, y; 
var ellipse_x = [];
var ellipse_y = [];
var ellipse_width = [];
var ellipse_height = [];

var ellipse_colour = [];
var ellipse_speed = [];

var amount_of_ellipse = 20; // Amount of eclipse shapes
 
function setup() {
	createCanvas(1540, 750);
	colorMode(HSB, 255, 255, width); // Set colour to HSB
	
	for (var i=0; i<amount_of_ellipse; i++) {
	ellipse_width[i]=random(20,30); //set random value for initial width of each ellipse
    ellipse_height[i]=random(20,30); //set random value for initial height of each ellipse
    ellipse_x[i]=random(ellipse_width[i],width-ellipse_width[i]); //randomly set an initial horizontal position for each ellipse, with padding on each side
    ellipse_y[i]=ellipse_height[i]; //all ellipses start at the bottom of the canvas with extra padding below based on ellipse height value
    ellipse_colour[i]=random(255); //set the hue for each ellipse
    ellipse_speed[i]=random(5,14); //set the verticle speed for each ellipse
  }
}

function draw() {
  background(0); //reset the background every frame to prevent trails
  
  // Draw all circles in array
	for (var i=0; i<amount_of_ellipse; i++) { //cycle through all instances of ellipses based on the value of amount_of_ellipse
		ellipse_width[i] = ellipse_width[i] + random(-6, 6); //make it randomly wider or more thin
		ellipse_height[i] = ellipse_height[i] + random(-6, 6); //make it randomly taller or shorter
		ellipse_x[i] = ellipse_x[i] + random(-3, 3); //move it randomly left or right
	
		ellipse_y[i] = ellipse_y[i] + ellipse_speed[i]; //move it vertically to the top of the canvas, based on its set speed
	
		if (ellipse_y[i] > (750+ellipse_height[i])) { //if the ellipse reaches the bottom of the canvas (with the ellipse height included as padding)...
     
		ellipse_y[i] = 0; //...move it back to the top (plus ellipse height for padding) to start rising again

		ellipse_speed[i] = random(5,8); //change the speed for the next cycle of rising to the top
		}
	
	
		//ELLIPSE
		noStroke(); //no outline for the shapes
		fill(ellipse_colour[i], 255, ellipse_y[i]); //fill each ellipse with its pre-determined color, full saturation, brightness decreases as the shape moves closer to the top of the canvas
		ellipse(ellipse_x[i], ellipse_y[i], ellipse_width[i], ellipse_height[i]); //draw each ellipse shape
	}
		if (mouseIsPressed)
		{ 
		background(0); //reset the background every frame to prevent trails
  
		// Draw all circles in array
		for (var i=0; i<amount_of_ellipse; i++) { //cycle through all instances of ellipses based on the value of amount_of_ellipse
			ellipse_width[i] = ellipse_width[i] + random(-3, 3); //make it randomly wider or more thin
			ellipse_height[i] = ellipse_height[i] + random(-3, 3); //make it randomly taller or shorter
			ellipse_x[i] = ellipse_x[i] + random(-3, 3); //move it randomly left or right
	
			ellipse_y[i] = ellipse_y[i] + ellipse_speed[i]; //move it vertically to the top of the canvas, based on its set speed
	
			if (ellipse_y[i] > (750+ellipse_height[i])) { //if the ellipse reaches the bottom of the canvas (with the ellipse height included as padding)...
     
			ellipse_y[i] = 0; //...move it back to the top (plus ellipse height for padding) to start rising again

			ellipse_speed[i] = random(5,8); //change the speed for the next cycle of rising to the top
			}
	
	
		//ELLIPSE
		noStroke(); //no outline for the shapes
		fill(ellipse_colour[i], 255, ellipse_y[i]); //fill each ellipse with its pre-determined color, full saturation, brightness decreases as the shape moves closer to the top of the canvas
		ellipse(ellipse_x[i], ellipse_y[i], ellipse_width[i], ellipse_height[i]); //draw each ellipse shape
		}
		}
}
