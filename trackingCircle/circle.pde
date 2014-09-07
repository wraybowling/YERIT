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

// Setup the Processing Canvas
void setup(){
  size( 800, 800 );
  strokeWeight( 10 );
  frameRate( 15 );

  X = width / 2;
  Y = width / 2;
  nX = X;
  nY = Y;  
}

// Main draw loop
void draw(){

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
  if ( radius < 0 ) { radius = 100; }
  if ( radius > 200 ) { radius = 100; }

  // Track circle to new destination
  X+=(nX-X)/delay;
  Y+=(nY-Y)/delay;
  
  // Fill canvas grey
  background( 100 );
  
  // Set fill-color to blue
  fill( 0, 121, 184 );
  
  // Set stroke-color white
  stroke(255); 
  
  // Draw circle
  ellipse( X, Y, radius, radius );                  
}


// Set circle's next destination
void mouseMoved(){
  nX = mouseX;
  nY = mouseY;  
}
