
class SolarSystem{
	constructor(_ID, _n){
        this.ID = _ID;
        this.num = _n;
        this.images = [];
        this.positions = [];
        // this.distance = _r;
        this.angle = random(0, 60);
        this.scaleFactor = 1;
        this.targetScaleFactor = 1;
        this.speed = random(0.1, 0.7);
        this.mHover = 1;

        // console.log("SS" + _ID + "-" + _n + ":");
        

        // load all images for solarSystem
        for(let j=0; j<_n; j++){
            var fileName;
            if(j < 9){
                fileName = "images/p2/0" + _ID + "/0" + (j+1) + ".png";
            } else {
                fileName = "images/p2/0" + _ID + "/" + (j+1) + ".png";
            }
            var pV = createVector(0,0); // generate Empty PVector
            
            // console.log(fileName);
            var img = loadImage(fileName);
            this.images.push(img);
            this.positions.push(pV);
        }

        shuffle(this.images, true);

        this.minX;
        this.maxX;
        this.minY;
        this.maxY;
    } 
    

	update(){
        if(this.mHover){
            if(parseInt(this.ID) % parseInt(2) == 0) {
                this.angle += this.speed;
            } else {
                this.angle -= this.speed;
            }
        }

        this.minX = width/2 - width/8;
        this.maxX = width/2 + width/8;
        this.minY = marginHeight + (this.ID-1)*margin - 25;
        this.maxY = marginHeight + (this.ID-1)*margin + 25;

        for(let i=0; i<this.num; i++){
            let pX, pY;
            let finalAngle = this.angle + i * (360/this.num);

            pX = (windowWidth*0.3) * this.num/20 * cos(radians(finalAngle));      // solarSystem radius width
            pY = windowHeight/80 * sin(radians(finalAngle));      // solarSystem radius Height

            this.positions[i].x = pX;
            this.positions[i].y = pY;
        }

        this.scaleFactor += (this.targetScaleFactor - this.scaleFactor) * 0.1;
    }

    run(){
        this.checkMouseOver();
        this.update();
        
        this.draw();
    }

    checkMouseOver(){
        if(
            mouseX < this.maxX && 
            mouseX > this.minX &&
            mouseY < this.maxY &&
            mouseY > this.minY
            ) {
            // this.targetScaleFactor = constrain(map(dist(mouseX, mouseY, width/2, marginHeight + (this.ID-1)*margin), 150, 0, 1, 1.7), 1, 1.7);
            this.mHover = false;
        } else {
            // this.targetScaleFactor= 1;
            this.mHover = true;
        }
    }
    
    draw(){
        // draw all images on page
        for(let i=0; i<this.num; i++){
            push();
            imageMode(CENTER);
            translate(width/2, windowHeight/8 + (this.ID-1)*margin);
            translate(this.positions[i].x, this.positions[i].y);
            scale(imageScale * this.scaleFactor);
            image(this.images[i], 0, 0 );
            pop();
        }
    }

    checkMouseClicked(){
        if(
            mouseX < this.maxX && 
            mouseX > this.minX &&
            mouseY < this.maxY &&
            mouseY > this.minY
            )   {
                console.log(this.ID);
                return this.ID;
        }
    }
}