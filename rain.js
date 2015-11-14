

function setup(){
	
	rainSystem = new DropSystem();
}

function draw(){
	createCanvas(window.innerWidth, window.innerHeight);
	background(51);
	rainSystem.addDrop(createVector(random(width), random(height/2)));
	rainSystem.run();
}

function mousePressed(){
	rainSystem.addDrop(createVector(mouseX,mouseY));
	rainSystem.run();
}

var Drop = function(position) {
	this.acceleration = createVector(0, 0.05);
	this.velocity = createVector(0,0);
	this.position = position.copy();
	this.lifespan = 350;
}

Drop.prototype.run = function() {
	this.update();
	this.display();
}

Drop.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.lifespan -=2;
}

Drop.prototype.display = function(){
	stroke(200, this.lifespan);
	strokeWeight(2);
	fill(127, this.lifespan);
	ellipse(this.position.x, this.position.y, 12, 12);
}

Drop.prototype.isDead = function(){
	if(this.lifespan<0){
		return true;
	} else {
		return false;
	}
};

var DropSystem = function(){
	this.drops = [];
}

DropSystem.prototype.addDrop = function(position){
	this.drops.push(new Drop(position));
}

DropSystem.prototype.run = function(){
	for(var i=this.drops.length-1; i>=0; i--){
		var p = this.drops[i];
		p.run();
		if(p.isDead()){
			this.drops.splice(i,1);
		}
	}
}
