
class SolarSystem{
	constructor(_ID, _n, _r){
        this.ID = _ID;
        this.num = _n;
        this.images = [];
        this.positions = [];
        this.distance = _r;
        this.angle = random(0, 60);
        this.scaleFactor = 1;
        this.targetScaleFactor = 1;

        // console.log("SS" + _ID + "-" + _n + ":");
        

        // load all images for solarSystem
        for(let j=0; j<_n; j++){
            var fileName = "images/p2/0" + _ID + "/0" + (j+1) + ".png";
            var pV = createVector(0,0); // generate Empty PVector
            
            // console.log(fileName);
            var img = loadImage(fileName);
            this.images.push(img);
            this.positions.push(pV);
        }


        this.minX;
        this.maxX;
        this.minY;
        this.maxY;
    } 
    

	update(){
        if(parseInt(this.ID) % parseInt(2) == 0) {
            this.angle += 1;
        } else {
            this.angle -= 1;
        }

        this.minX = width/2 - 200;
        this.maxX = width/2 + 200;
        this.minY = marginHeight + (this.ID-1)*margin - 25;
        this.maxY = marginHeight + (this.ID-1)*margin + 25;

        for(let i=0; i<this.num; i++){
            let pX, pY;
            let finalAngle = this.angle + i * parseInt((360/this.num));

            pX = this.distance * 3 * cos(radians(finalAngle));      // solarSystem radius width
            pY = this.distance / 3 * sin(radians(finalAngle));      // solarSystem radius Height

            this.positions[i].x = pX;
            this.positions[i].y = pY;
        }

        this.scaleFactor += (this.targetScaleFactor - this.scaleFactor) * 0.1;
    }

    run(){
        this.update();
        this.checkMouseOver();
        this.draw();
    }

    checkMouseOver(){
        if(
            mouseX < this.maxX && 
            mouseX > this.minX &&
            mouseY < this.maxY &&
            mouseY > this.minY
            ) {
            this.targetScaleFactor = constrain(map(dist(mouseX, mouseY, width/2, marginHeight + (this.ID-1)*margin), 150, 0, 1, 1.7), 1, 1.7);
        } else {
            this.targetScaleFactor= 1;
        }
    }
    
    draw(){
        // draw all images on page
        for(let i=0; i<this.num; i++){
            push();
            imageMode(CENTER);
            translate(width/2, marginHeight + (this.ID-1)*margin);
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