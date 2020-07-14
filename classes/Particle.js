
class Particle{
	
	constructor(_pos, _img){
        this.pos = _pos;
        this.prev = createVector(0, 0);
        this.vel = createVector(0, 0);
        // this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.img = _img;
        this.angle = 0;
        this.angleVel = radians(random(0, 1));
        this.isActivated = false;
        
        let tmp = random(1);
        this.minForce;
        this.maxForce;
        
        if(tmp < 0.5)   {
            this.minForce = 50;
            this.maxForce = 400;
        } else {
            this.minForce = 100;
            this.maxForce = 1000;
        }

	}

	update(){
        // if(this.alpha < 255){
        //     this.alpha = pint(this.life, 5000, this.life*10, 0, 255));
        // }

        this.attracted();
        this.angle += this.angleVel;
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.acc.mult(0);

		// this.pos += (this.target - this.pos) * 0.09;
		// this.pos = p5.Vector.add(this.pos, p5.Vector.mult(p5.Vector.sub(this.target - this.pos),0.09));
    }

    run(){
        this.update();
        this.draw();
    }
    
    updateTarget(tr){
        this.target = tr;
    }

    draw(){        
        push();
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        scale(scaleFactor);
        // tint(255, this.life);
        image(images[this.img], 0, 0);
        pop();

		// ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    
    attracted(){
        var mV = createVector(tMouseX, tMouseY);
        var force = p5.Vector.sub(mV, this.pos);
        // this.angle = force.heading()+radians(-90);
        var d = force.mag();
        
        d = constrain(d, this.minForce, this.maxForce);
        var G = 1.2;
        var strength = G /d /2  ;
        force.setMag(strength);

        if(d < height/5) {
            force.mult(-6);
            this.isActivated = true;
        }

        this.acc.add(force);
    }

    isOutRanged(){
        if(this.pos.x <= -200 || this.pos.x >= windowWidth + 200 || this.pos.y <=-200 || this.pos.y >= windowHeight+200){
            return true;
        }
    }

    isDead(){
        return this.isActivated && this.isOutRanged();
    }
}