int time = 0;

void setup(){
  size(600, 600);
  noFill();
  stroke(255);
  colorMode(HSB, 360); 
}

void draw(){
  background(0);
  for(int i = 0; i < 360; i+= 10){
    float x = cos(radians(i)) * 100 + width / 2;
    float y = sin(radians(i)) * 100 + height / 2;
    float w = cos(radians(time + i)) * 200;
    w = abs(w);
    stroke(i, 360, 360);   //  色をつけた 
    fill(i,360,360,100);
    ellipse(x, y, w, w);
  }
  time++;
}