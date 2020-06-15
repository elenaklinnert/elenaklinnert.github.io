let particle = [];
let numParticle = 800;
var images = [];
let bgAlpha;

function preload(){
	for(var i=0; i<15; i++){
		var fileName = "images/"
		if (i+1<10) {
			fileName += "0" + (i+1) + ".png";
		} else {
			fileName += (i+1) + ".png";
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
	for(let i=0; i<numParticle; i++){
		particle.push(new Particle( 
							(i % sqrt(numParticle) )*(windowWidth / sqrt(numParticle)) + windowWidth / sqrt(numParticle)/2,
							(parseInt(i/sqrt(numParticle)))*(windowHeight/sqrt(numParticle)) + windowWidth / sqrt(numParticle)/2,
							images[parseInt(random(15))]
							)
							);
	}
}

function draw() {
	// put drawing code here
	background(255);

	var mTarget = createVector(mouseX, mouseY);
	for(let i=0; i<numParticle; i++){
		particle[i].attracted(mTarget);
		particle[i].update();
		// particle[i].updateTarget(mTarget);
		// particle[i].easing();
		particle[i].draw();
	}

	
	if(bgAlpha > 0){
		bgAlpha--;
		fill(255, bgAlpha);
		rect(0, 0, windowWidth, windowHeight);
	}
	
	fill(0);
	text("num Of images : " + String(numParticle), 20, 20);
	
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);

	for(let i=0; i<numParticle; i++){
		particle[i].target.set((i % sqrt(numParticle) )*(windowWidth / sqrt(numParticle)) + windowWidth / sqrt(numParticle)/2, (parseInt(i/sqrt(numParticle)))*(windowHeight/sqrt(numParticle)) + windowWidth / sqrt(numParticle)/2);
	}
}

function loadAllImages(){
	for(var i=0; i<16; i++){
		var img;
		var fileName = "./images/"
		if (i<10) {
			fileName + "0" + i + ".png";
		} else {
			fileName + i + ".png";
		}
		
		img.loadImage(fileName);
		images.push(img);
	}
	return images;
}
