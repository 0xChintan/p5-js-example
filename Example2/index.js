let branches = []; // Array to store branches
const maxBranches = 500; // Maximum number of branches to draw
let currentBranch = 0; // Index of the current branch to draw
 
function setup() {
  createCanvas(800, 600);
  background(255);
  strokeWeight(2);
  frameRate(20); // Control the drawing speed
 
  // Initialize branches array with the starting branch
  branches.push({
	x: width / 2,
	y: height,
	angle: -PI / 2,
	length: 120,
	parent: null
  });
 
  // Start the animation
  drawNextBranch();
}
 
function draw() {
  if (currentBranch < branches.length) {
	// Draw the current branch
	const branch = branches[currentBranch];
	drawBranch(branch.x, branch.y, branch.angle, branch.length);
 
	// Move to the next branch
	currentBranch++;
  } else {
	// Stop drawing when all branches are done
	noLoop();
  }
}
 
function drawBranch(x, y, angle, length) {
  if (length < 10) {
	// Draw leaves when branches are very small
	drawLeaves(x, y);
	return;
  }
 
  const xEnd = x + cos(angle) * length;
  const yEnd = y + sin(angle) * length;
 
  stroke(139, 69, 19); // Brown color for branches
  line(x, y, xEnd, yEnd);
 
  // Add new branches to the array
  if (branches.length < maxBranches) {
	branches.push({
  	x: xEnd,
  	y: yEnd,
  	angle: angle - random(0.2, 0.4),
  	length: length * random(0.6, 0.8),
  	parent: branches[branches.length - 1]
	});
	
	branches.push({
  	x: xEnd,
  	y: yEnd,
  	angle: angle + random(0.2, 0.4),
  	length: length * random(0.6, 0.8),
  	parent: branches[branches.length - 1]
	});
  }
}
 
function drawLeaves(x, y) {
  noStroke();
  fill(0, 255, 0); // Green color for leaves
  ellipse(x, y, 10, 10);
}
 
// Function to draw the next branch in the animation
function drawNextBranch() {
  // Drawing will be handled in the draw() loop
}
