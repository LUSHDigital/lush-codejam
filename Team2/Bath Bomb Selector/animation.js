let density = 100;
let offset = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noStroke();
}

function draw() 
{
	offset+=0.05;
	for(let i = 0; i<density; i++)
	{
		for(let j = 0; j<density; j++)
		{
			let nR = 255*noise(i*0.02+offset,j*0.02);
			let nG = 255*noise(i*0.02+1,j*0.02+2+offset);
			let nB = 255*noise(i*0.02+offset+3,j*0.02+4);
			fill(nR,nG,nB);
			rect(i*width/density,j*height/density,width/density,height/density);
		}
	}
}