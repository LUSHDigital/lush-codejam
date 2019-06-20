var circles = []
var total = 100
var img;

//Array to hold file names of different images
//var random_images_array = ["honeycomb.jpg", "sweet-shop.jpg", "washing-line.jpg"];

function setup() {
	createCanvas(830, 600);
	
	loadImage('../images/honeycomb.jpg', function(img2) {
	    background(0)
        img = img2

		for(var i = 0; i < total; i++){
			circles[i] = {};
			circles[i].prevPos = {x: width/2, y: height/2}
			circles[i].pos = {x: width/2, y: height/2}
			circles[i].dir = random() > 0.5 ? 1 : -1
			circles[i].radius = random(3, 10)
			circles[i].angle = 0
		}
    });
}

function draw() {
	//image loading
  if(!img){
	 background(0);
   if(frameCount%2) text("loading", width/2, height/2);
   return;
  }
	
	for(var i = 0; i < total; i++){
		var circle = circles[i]
		circle.angle += 1/circle.radius*circle.dir

		circle.pos.x += cos(circle.angle) * circle.radius
		circle.pos.y += sin(circle.angle) * circle.radius
		if(brightness(img.get(round(circle.pos.x), round(circle.pos.y))) > 70 || circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height){
			circle.dir *= -1
			circle.radius = random(3, 10)
			circle.angle += PI
		}
		stroke(img.get(circle.pos.x, circle.pos.y))
		line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)

		circle.prevPos.x = circle.pos.x
		circle.prevPos.y = circle.pos.y
	}
}

//Function to choose a random image from the array and return a string with the path to the file

/*function randomImage(imgAr, path) {
	path = path || '/images/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    var imgStr = path + img;
    return imgStr;
}*/