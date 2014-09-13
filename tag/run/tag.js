/**
* tag yer it
*/

////

var players = [];
var turrets = [];
var bullets = [];
var tokens = [];
var i;
var nextBullet = 0;

canvasWidth = 1200;
canvasHeight = 600;

////

function circularHitTest(circleA,circleB){
	//distance between two centers
	var xDiff = circleB.x - circleA.x;
	var yDiff = circleB.y - circleA.y;
	var d = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
	//if both radius combined can traverse distance between the centers, return true
	return d < circleA.radius + circleB.radius;
}

////

function player(id){
	this.score = 0;
	this.element = document.getElementById('player_'+id);
	this.radius = 30;
	this.it = false;
	this.x = undefined;
	this.y = undefined;
}

player.prototype.hitTest = function(target){
	circularHitTest(this,target);
};

player.prototype.advance = function(x,y){
	this.x = x;
	this.y = y;
	this.element.setAttributeNS(null,'transform','translate('+x+','+y+')');
};

////

function bullet(id){
	this.angle = Math.random() * Math.PI * 2;
	this.velocity = 7;
	this.element = document.getElementById('bullet_'+id);
	this.reset();
}

bullet.prototype.reset = function(){
	//this.x = Math.random() * 1024;
	//this.y = Math.random() * 768;
	this.active = false;
	this.super = false;
};

bullet.prototype.advance = function(){
	if(this.active){
		this.x += Math.cos(this.angle) * this.velocity;
		this.y += Math.sin(this.angle) * this.velocity;

		var outOfBounds = this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 768;

		if(outOfBounds){
			//this.reset();
			this.active = false;
		}

		this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+') rotate('+ this.angle/Math.PI/2*360 +')');
	}
};

bullet.prototype.hitTest = function(){
	//var distance = Math.sqrt( 1 );
};

////

function turret(id){
	this.x = Math.random()*1024;
	this.y = Math.random()*768;
	this.element = document.getElementById('turret_'+id);
	return this;
}

turret.prototype.advance = function(){

	for(var t=0; t<players.length; t++){
		//not it players intersecting turret
		if(players[t].it === false && circularHitTest(this,players[t])){
			//var angle = (this.x - players[t].x) / (this.y - players[t].y);
			bullets[nextBullet].x = this.x;
			bullets[nextBullet].y = this.y;
			//bullets[nextBullet].angle = angle;
			bullets[nextBullet].active = true;
			nextBullet = ++nextBullet % 10;
		}
	}
	this.x += Math.random()*7 - 3.5;
	this.y += Math.random()*7 - 3.5;
	//this.radius += Math.random()*2 - 1;
	//this.element.setAttributeNS(null,'r',this.radius);
	this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+')');
	return this;
};

////

function token(id){
	this.x = Math.random()*1024;
	this.y = Math.random()*768;
	this.element = document.getElementById('token_'+id);
	return this;
}

token.prototype.advance = function(){
	this.x += Math.random()*4 - 2;
	this.y += Math.random()*4 - 2;
	this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+')');
	return this;
};

////
////

var redPlayer = new player('red');
var greenPlayer = new player('green');
var bluePlayer = new player('blue');
players = [redPlayer,greenPlayer,bluePlayer];

for(i=0; i<10; i++){
	var new_bullet = new bullet(i);
	bullets.push(new_bullet);
}

for(i=0; i<3; i++){
	var new_turret = new turret(i);
	turrets.push(new_turret);
}

for(i=0; i<10; i++){
	new_token = new token(i);
	tokens.push(new_token);
}

//debugging faker subscription
window.poll = function(data){
	//console.log(data.red);
	redPlayer.advance(data.red.x,data.red.y);
	greenPlayer.advance(data.green.x,data.green.y);
	bluePlayer.advance(data.blue.x,data.blue.y);

};

//live sensor subscription
function messageHandler(data) {
	redPlayer.advance(data.red.x,data.red.y);
	greenPlayer.advance(data.green.x,data.green.y);
	bluePlayer.advance(data.blue.x,data.blue.y);
}
var onSensorsMessage = onSensorsMessage || function(){console.error('please load sensor.js');	};
onSensorsMessage(messageHandler, {});

function tick(){
	for(i=0; i<10; i++){
		bullets[i].advance();
	}

	for(i=0; i<3; i++){
		turrets[i].advance();
	}

	for(i=0; i<10; i++){
		tokens[i].advance();
	}
}
tick();

var timer = setInterval(tick, 1000/60.0);

