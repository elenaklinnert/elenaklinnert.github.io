let particle = [];
let numParticle = 1200;
let numD = 8;
var images = [];
let bgAlpha;
let lastWidth, lastHeight;

function preload(){
	for(var i=0; i<numD; i++){
		var fileName = "images/p1/"
		if (i+1<10) {
			fileName += "d0" + (i+1) + ".png";
		} else {
			fileName += "d"+ (i+1) + ".png";
		}
		// console.log(fileName);
		images[i] = loadImage(fileName);
		// console.log(images);
	}

	bgAlpha = 255;
}
function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('backgroundDiv');
	imageMode(CENTER);
	// put setup code here
	for(let i=0; i<200; i++){
		let tPos = createVector(random(-400, windowWidth+400), random(-400, windowHeight+400));
		particle.push(new Particle( 
							tPos,
							parseInt(random(numD))
							)
							);
	}
}

function draw() {
	background(255);
	
	for(let i=particle.length-1; i>=0; i--){
		let p = particle[i];

		p.run();
		if(p.isDead()){
			particle.splice(i, 1);
		}
	}
	
	if(bgAlpha > 0){
		bgAlpha--;
		fill(255, bgAlpha);
		rect(0, 0, windowWidth, windowHeight);
	}
	
	fill(0);
	text("frameRate : " + String(int(frameRate())) + "\nnum of images : " + String(particle.length), 20, 20);
	
	if(particle.length < numParticle){
		addParticle();
	}

	lastWidth = windowWidth;
	lastHeight = windowHeight;
}

function windowResized(){
	for(let i=0; i<numParticle; i++){
		let p = particle[i];
		p.pos.x = map(p.pos.x, 0, lastWidth, 0, windowWidth);
		p.pos.y = map(p.pos.y, 0, lastHeight, 0, windowHeight);
		// particle[i].target.set((i % sqrt(numParticle) )*(windowWidth / sqrt(numParticle)) + windowWidth / sqrt(numParticle)/2, (parseInt(i/sqrt(numParticle)))*(windowHeight/sqrt(numParticle)) + windowWidth / sqrt(numParticle)/2);
	}
	resizeCanvas(windowWidth, windowHeight);

	
}

function loadAllImages(){
	for(var i=0; i<numD; i++){
		var img;
		var fileName = "./images/p1/"
		if (i<10) {
			fileName + "d0" + i + ".png";
		} else {
			fileName +"d" + i + ".png";
		}
		
		img.loadImage(fileName);
		images.push(img);
	}
	return images;
}


function addParticle(){
	let pX, pY;
	let t = random(1);
	if(t < 0.25){
		pY = random(-400, -200);
		pX = random(-400, windowWidth + 400);
	} else if(t < 0.5){
		pX = random(windowWidth + 200, windowWidth+400);
		pY = random(-400, windowHeight+400);
	} else if (t < 0.75){
		pX = random(-400, windowWidth + 400);
		pY = random(windowHeight + 200, windowHeight+400);
	} else {
		pX = random(-400, -200);
		pY = random(-400, windowHeight+400);
	}

	let ttPos = createVector(pX, pY);
	particle.push(new Particle(ttPos, parseInt(random(numD))));
}