let numLink = 7;

let numberOfImagesPerSolarSystem = [5, 9, 4, 6, 5, 3, 3];
let radiusOfEachSolarSystem = [100, 150, 80, 120, 100, 60, 60];
let imageGroup = [];
let margin;

let marginHeight = 150;	// margin, for center of 7 solarsistem

let imageScale = 0.5;

function preload(){
	for(let i=0; i<numLink; i++){
		imageGroup.push(new SolarSystem((i+1),numberOfImagesPerSolarSystem[i], radiusOfEachSolarSystem[i]));
	}
	bgAlpha = 255;
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('backgroundDiv');
	
	imageMode(CENTER);
}

function draw() {
	background(255);

	margin = (windowHeight - 2*marginHeight) / (numLink-1);

	for(let i=0; i<numLink; i++){
		imageGroup[i].run();
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
	for(let i=0; i<numLink; i++){
		imageGroup[i].checkMouseClicked();
	}
}