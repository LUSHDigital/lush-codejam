/*
Below is using the TweenMax library.
I am also using the perlin library to help with the automovement of the animation when no mouse or touch is detected 
*/
function createParticle (x, y) {
	
  var size = Math.random() * 50 + 10;
  
  x -= (size / 2);
  y -= (size / 2);
  
  var particle = document.createElement('div');
  document.body.appendChild(particle);
  
  TweenMax.set(particle, {
    x: x, 
    y: y,
    width: size,
    height: size,
    background: function () {
      return `hsl(${Math.random() *90+200}, 50%, 50%)`
    }
  });
  
  TweenMax.to(particle, Math.random() * 2 + 1, {
    x: x + (Math.random() - 0.5) * 200,
    y: y + (Math.random() - 0.5) * 200,
    opacity: 0,
    scale:0,
    ease: Power2.easeOut,
    onComplete: function () {
      document.body.removeChild(particle);
    }
  })
}

function changeBackground(x,y){	
	
	var r = 255 * (x / screen.width);
    var g = 255 * (y / screen.height);
    var b = 255 * Math.abs(Math.cos(Math.PI * y / screen.width));
	
	TweenLite.to('body', 1, {backgroundColor:'rgb(' + Math.round(r) + ', ' + Math.round(g) + ', ' + Math.round(b) + ')', opacity: 0.69, ease:Power3.easeOut});
	
}

let lastMove = 0;

function render (a) {

let random = 0;	
	
	const speed = document.querySelector('#speed');
	const randomness = document.querySelector('#randomness');
	
	
	//If you stop moving for 500ms, the fake mouse will start moving again.
	if (Date.now() - lastMove > 500) {

	    const s = 0.001 * (speed.value / 100);
	
		const noiseX = (noise.simplex3(1, 0, a * s) + 1) / 2;
		const noiseY = (noise.simplex3(11, 0, a * s) + 1) / 2;
		
		random += randomness.value / 1000;
		const randX = noise.simplex3(1, 0, random) * window.innerWidth * 0.1;
		const randY = noise.simplex3(3, 0, random) * window.innerHeight * 0.1;
		const x = noiseX * innerWidth + randX;
		const y = noiseY * innerHeight + randY;
		
		createParticle(x, y);
		
		//change background colours 
		changeBackground(x,y);	
		
	}
	requestAnimationFrame(render);
}


function onMouseMove(e) {
 var x = e.clientX;
 var y = e.clientY;
  createParticle(x, y);
  changeBackground(x,y);
  lastMove = Date.now();

  
}

function ontouchmove(e){

 var x = event.touches[0].clientX;
 var y = event.touches[0].clientY;
 
 createParticle(x, y);
 changeBackground(x,y);
 lastMove = Date.now();	
	
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', ontouchmove);
requestAnimationFrame(render);










