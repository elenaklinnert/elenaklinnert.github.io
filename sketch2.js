let numLink = 7;

let numberOfImagesPerSolarSystem = [28, 30, 28, 13, 14, 8, 19];
// let radiusOfEachSolarSystem = [100, 150, 80, 120, 100, 60, 60];
let imageGroup = [];
let margin;
let backLinkImage;

let marginHeight;	// margin, for center of 7 solarsistem

let imageScale =1;

let currentScale = 0.6;
let targetScale = 1;

function preload(){
	for(let i=0; i<numLink; i++){
		imageGroup.push(new SolarSystem((i+1),numberOfImagesPerSolarSystem[i]));
	}
	backLinkImage = loadImage("images/feather.png");
	bgAlpha = 255;
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('backgroundDiv');
	
	imageMode(CENTER);

	
}

function draw() {
	background(255);

	if(windowWidth < 600){
		imageScale = 0.5;
	} else {
		imageScale = 1;
	}

	margin = (windowHeight - 2*marginHeight) / (numLink+1);

	for(let i=0; i<numLink; i++){
		imageGroup[i].run();
	}

	checkBackLinkImage();

	push();
	imageMode(CENTER);
	translate(width/2, marginHeight+ 8*margin);
	rotate(radians(millis()/10));
	scale(currentScale);
	image(backLinkImage, 0, 0);
	pop();

	marginHeight = windowHeight/8;
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function checkBackLinkImage(){
	if( dist(mouseX, mouseY, width/2, marginHeight+7.5*margin) < 50){
		targetScale = 0.8;
	} else {
		targetScale = 0.6;
	}

	currentScale += (targetScale - currentScale)*0.1;
}


function mouseClicked(){
	for(let i=0; i<numLink; i++){
		imageGroup[i].checkMouseClicked();
	}
	if(dist(mouseX, mouseY, width/2, marginHeight+8*margin) < 80){
		window.open("index.html", "_self")
	}
}