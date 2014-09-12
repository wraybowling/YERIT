/**
* tag yer it
*/

////

function player(id){
	this.score = 0;
	this.element = document.getElementById('player_'+id);
}

player.prototype.advance = function(x,y){
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

var bullets = [];
for(i=0; i<10; i++){
	var new_bullet = new bullet(i);
	bullets.push(new_bullet);
}

bullet.prototype.advance = function(){
	this.x = Math.random() * 1024;
	this.y = Math.random() * 768;
	return this;
};

bullet.prototype.hitTest = function(){
	var distance = Math.sqrt( 1 );
	return this;
};

bullet.prototype.render = function(){
	this.setAttributeNS(null,'cx',data.r[tickR].x);
}

////

function turret(){
	this.radius = 200;
	return this;
}

turret.prototype.advance = function(){
	return this;
}

////

function token(){

}

////
////

var i;

var redPlayer = new player('red');
var greenPlayer = new player('green');
var bluePlayer = new player('blue');

window.poll = function(data){
	//console.log(data.red);

	redPlayer.advance(data.red.x,data.red.y);
	greenPlayer.advance(data.green.x,data.green.y);
	bluePlayer.advance(data.blue.x,data.blue.y);

}



