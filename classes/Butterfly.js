// const { timeStamp } = require("console");

class Butterfly{
    constructor(_pos){

        this.pos = _pos;
        this.lastPos = this.pos;
        this.vel = createVector(0);
        this.acc = createVector(0);
        // attracted mag
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

        this.pos = _pos;
        this.animationFrames = [];
        // this.image = loadImage("images/butterfly.png");
        this.targetPos = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.bfPosUpdatedTimer = 0;

        
        this.animationFrames.push(loadImage("images/butterfly/b1.png"));
        this.animationFrames.push(loadImage("images/butterfly/b2.png"));
        this.frameNo = 0;
        this.frameTimer = millis();
    }

    updateBFTarget(){
        this.targetPos.x = random(200, windowWidth - 200);
        this.targetPos.y = random(200, windowHeight - 200);
    }

    update(){
        if(millis() - this.bfPosUpdatedTimer > 3000){
            this.updateBFTarget();
            // console.log("butterfly moved");
            this.bfPosUpdatedTimer = millis();
        }

        // move toward to target
        // this.pos.x += (this.targetPos.x - this.pos.x) * 0.01;
        // this.pos.y += (this.targetPos.y - this.pos.y) * 0.01;

        this.attracted();
        this.pos.add(this.vel);
        this.vel.add(this.acc);

        this.acc.mult(0);

        // flying animation 
        if(millis() - this.frameTimer > 800){
            this.frameNo = parseInt((this.frameNo + 1)) % 2;
            this.frameTimer = millis();
        }

    }

    attracted(){
        var mV = createVector(this.targetPos.x, this.targetPos.y);
        var force = p5.Vector.sub(mV, this.pos);
        var d = force.mag();

        d = constrain(d, this.minForce, this.maxForce);
        var G = 1.2;
        var strength = G/d/2;
        force.setMag(strength);

        this.acc.add(force);
    }

    draw(){
        push();
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);
        // push();
        if(this.vel.x > 0){
            scale(-1 * scaleFactor, 1 * scaleFactor);
        } else {
            scale(1 * scaleFactor, 1 * scaleFactor);
        }
        image(this.animationFrames[this.frameNo], 0, 0);
        // pop();
        pop();
    }
}