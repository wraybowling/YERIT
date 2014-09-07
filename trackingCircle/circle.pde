/* 
  PROCESSINGJS.COM - BASIC EXAMPLE
  Delayed Mouse Tracking  
  MIT License - Hyper-Metrix.com/F1LT3R
  Native Processing compatible 
*/  

// Global variables
float radius = 50.0;
int X, Y;
int nX, nY;
int delay = 16;
int flag=0;

/* @pjs preload="dsc_0085a.jpg"; */
PImage b;

// Setup the Processing Canvas
void setup(){
  size( 800, 800 );

  strokeWeight( 4 );
  frameRate( 15 );

  X = width / 2;
  Y = width / 2;
  nX = X;
  nY = Y;
  
  b = loadImage("dsc_0085a.jpg");
}

// Main draw loop
void draw(){

  if (flag==0) image(b, 0, 0);
  flag=1;

  rgb=poll();
  nX = rgb.blue.x;
  nY = rgb.blue.y;

  // radius = radius + sin( frameCount / 4 ); // throbbing effect
  // Smoothly change radius based on the distance between the red and green coordinates
  delta = sin(sqrt( 
    abs(rgb.red.x - rgb.green.x) * abs(rgb.red.x - rgb.green.x)
    + abs(rgb.red.y - rgb.green.y) * abs(rgb.red.y - rgb.green.y)
  ) ) * 8;

  radius = radius + delta;
  // keep radius within some sane bounds
  if ( radius < 0 ) { radius = 10; }

  // Track circle to new destination
  X+=(nX-X)/delay;
  Y+=(nY-Y)/delay;
  
  // Fill canvas grey
  // background( 100 );

  noStroke();
  fill( 255, 108, 108, 150);
  ellipse( X, Y, radius+40, radius+40 );

  // Set fill-color to blue
  fill( 255, 255, 184 );

  // Set stroke-color white
  stroke(255); 

  // Draw circle
  ellipse( X, Y, radius, radius );

  if ( radius > 100 ) { 
    radius = 100; 
    stroke(0);
    strokeWeight(2);
    fill( 255, 255, 255, 200);
    ellipse( X, Y, radius+20, radius-30 );
    noStroke();
    fill( 155, 155, 155, 200);
    ellipse( X, Y, radius-65, radius-65 );
    fill( 0, 0, 0, 200);
    ellipse( X, Y, radius-80, radius-80 );
    strokeWeight(10);
  }


}


// Set circle's next destination
void mouseMoved(){
  nX = mouseX;
  nY = mouseY;  
}
