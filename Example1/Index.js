const lines = [];
let colors = []; // Declare colors array
 
function setup() {
  createCanvas(400, 400);
 
  // Initialize colors
  colors = [
	color(255, 0, 0),   // Red
	color(0, 255, 0),   // Green
	color(0, 0, 255),   // Blue
	color(255, 255, 0), // Yellow
	color(255, 0, 255)  // Magenta
  ];
 
  lines.push(new LineDrawer(25, height - 25, 0, 275));
  strokeWeight(2);
  background(32);
}
 
function draw() {
  for (const line of lines) {
	line.step();
  }
}
 
class LineDrawer {
  constructor(x, y, heading, length) {
	this.startX = x;
	this.startY = y;
	this.currentX = x;
	this.currentY = y;
	this.heading = heading;
	this.length = length;
	this.speed = random(1, 5);
	this.spawned25 = false;
	this.spawned50 = false;
	this.spawned75 = false;
	this.colorIndex = floor(random(colors.length)); // Pick a random color from the palette
  }
 
  step() {
	if (this.length < 10) {
  	return;
	}
 
	const currentLength = dist(this.startX, this.startY, this.currentX, this.currentY);
 
	if (currentLength >= this.length) {
  	return;
	}
 
	if (!this.spawned25 && currentLength >= this.length * 0.25) {
  	lines.push(
    	new LineDrawer(this.currentX, this.currentY,
      	this.heading + random(-PI / 4, PI / 4), this.length * random(0.2, 0.3)));
  	this.spawned25 = true;
	}
 
	if (!this.spawned50 && currentLength >= this.length * 0.5) {
  	lines.push(
    	new LineDrawer(this.currentX, this.currentY,
      	this.heading + random(-PI / 4, PI / 4), this.length * random(0.4, 0.5)));
  	this.spawned50 = true;
	}
 
	if (!this.spawned75 && currentLength >= this.length * 0.75) {
  	lines.push(
    	new LineDrawer(this.currentX, this.currentY,
      	this.heading + random(-PI / 4, PI / 4), this.length * random(0.6, 0.75)));
  	this.spawned75 = true;
	}
 
	const prevX = this.currentX;
	const prevY = this.currentY;
	this.currentX += cos(this.heading) * this.speed;
	this.currentY += sin(this.heading) * this.speed;
 
	stroke(colors[this.colorIndex]); // Use the color from the palette
	line(prevX, prevY, this.currentX, this.currentY);
  }
}
