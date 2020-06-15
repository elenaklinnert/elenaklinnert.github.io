
class Particle{
	
	constructor(_x, _y, _img){
		this.target = createVector(_x, _y);
        this.pos = createVector(random(-windowWidth, windowWidth*2), random(-windowHeight, windowHeight*2));
        // this.pos = createVector(random(windowWidth/3, windowWidth*2/3), random(windowHeight/3, windowHeight*2/3));
        this.prev = createVector(0, 0);
        this.vel = createVector(0, 0);
        // this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.img = _img;
        this.angle = 0;
        this.angleVel = radians(random(0, 1));
        this.timer = millis();
        this.alpha = 0;
        this.life = parseInt(random(1, 100));

	}

	update(){
        // if(this.alpha < 255){
        //     this.alpha = parseInt(map(millis() - this.timer, 0, this.life*10, 0, 255));
        // }
        this.angle += this.angleVel;
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.acc.mult(0);

		// this.pos += (this.target - this.pos) * 0.09;
		// this.pos = p5.Vector.add(this.pos, p5.Vector.mult(p5.Vector.sub(this.target - this.pos),0.09));
    }
    
    updateTarget(tr){
        this.target = tr;
    }

	easing(){
		let tX = this.target.x;
		let tY = this.target.y;
		let posX = this.pos.x;
		let posY = this.pos.y;

		posX += (tX - posX) * 0.09;
		posY += (tY - posY) * 0.09;
		this.pos.set(posX, posY);
	}

    draw(){        
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        // tint(255, parseInt(this.alpha));
        image(this.img, 0, 0);
        pop();

		// ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    
    attracted(target){
        var force = p5.Vector.sub(target, this.pos);
        // this.angle = force.heading()+radians(-90);
        var d = force.mag();
        
        d = constrain(d, 25, 1000);
        var G = 1;
        var strength = G /  d ;
        force.setMag(strength);

        if(d < 150) {
            force.mult(-8);
        }

        this.acc.add(force);
    }
}