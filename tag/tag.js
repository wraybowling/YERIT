/**
* tag yer it
*/

////

//var players = [];
var turrets = [];
var bullets = [];
var tokens = [];
var i;

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
	this.radius = 80;
	this.it = false;
}

player.prototype.hitTest = function(target){
	circularHitTest(this,target);
};

player.prototype.advance = function(x,y){

	for(i=0; i<turrets.length; i++){

	}
	this.element.setAttributeNS(null,'transform','translate('+x+','+y+')');
};

////

function bullet(id){
	this.angle = 0;
	this.velocity = 5;
	this.element = document.getElementById('bullet_'+id);
	this.x = 0;
	this.y = 0;
}

for(i=0; i<10; i++){
	var new_bullet = new bullet(i);
	bullets.push(new_bullet);
}

bullet.prototype.advance = function(){
	this.x = Math.random() * 1024;
	this.y = Math.random() * 768;
	this.element.setAttributeNS(null,'transform','translate('+x+','+y+')');
	return this;
};

bullet.prototype.hitTest = function(){
	var distance = Math.sqrt( 1  );
	return this;
};

bullet.prototype.render = function(){
	this.setAttributeNS(null,'cx',data.r[tickR].x);
}

////

function turret(id){
	this.element = document.getElementById('turret_'+id);
	this.radius = 200;
	this.x = 1024/2;
	this.y = 768/2;
	return this;
}

turret.prototype.advance = function(){
	this.x += Math.random()*4 - 2;
	this.y += Math.random()*4 - 2;
	this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+')');
	return this;
}

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
var turretA = new turret('a');

for(i=0; i<10; i++){
	newToken = new token(i);
	newToken.advance();
	tokens.push(newToken);
}

window.poll = function(data){
	//console.log(data.red);

	redPlayer.advance(data.red.x,data.red.y);
	greenPlayer.advance(data.green.x,data.green.y);
	bluePlayer.advance(data.blue.x,data.blue.y);

}

function tick(){
	turretA.advance();
}

tick();

var timer = setInterval(tick, 1000/60.0);

