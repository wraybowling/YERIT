/**
* tag yer it
*/

////

var players = [];
var turrets = [];
var bullets = [];
var tokens = [];
var yerit = document.getElementById('yerit');

canvasWidth = 1260;
canvasHeight = 530;

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
	this.id = id;
	this.score = 0;
	this.element = document.getElementById('player_'+id);
	this.radius = 30;
	this.it = false;
	this.px = 0;
	this.py = 0;
}

player.prototype.hitTest = function(target){
	circularHitTest(this,target);
};

player.prototype.advance = function(x,y){
	this.x = x*0.25 + this.px*0.75;
	this.y = y*0.25 + this.py*0.75;
	this.px = this.x;
	this.py = this.y;
	this.element.setAttributeNS(null,'transform','translate('+x+','+y+')');
	if(this.it){
		yerit.setAttributeNS(null,'transform','translate('+x+','+y+')');
		//console.log(circularHitTest(this,tokens[0]))
		for(var q=0; q<tokens.length; q++){
			//console.log( circularHitTest(this,tokens[q]) );

			if(circularHitTest(this,tokens[q])){
				this.score += 7;
				var readout = document.getElementById('score_'+this.id);
				readout.textContent = this.id +':'+ this.score;

				console.log(readout)
				tokens[q].reset();
			}
		}
	}

};

////

function bullet(id){
	this.angle = Math.random() * Math.PI * 2;
	this.velocity = 7;
	this.element = document.getElementById('bullet_'+id);
	this.reset();
	this.owner = undefined; //player who shot this bullet
	this.active = false;
	this.radius = 10;
}

bullet.prototype.reset = function(){
	//this.x = Math.random() * canvasWidth;
	//this.y = Math.random() * canvasHeight;
	this.active = false;
	this.super = false;
};

bullet.prototype.advance = function(){
	if(this.active){
		this.x += Math.cos(this.angle) * this.velocity;
		this.y += Math.sin(this.angle) * this.velocity;

		var outOfBounds = this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight;

		if(outOfBounds){
			//this.reset();
			this.active = false;
		}

		for(var p=0; p<players.length; p++){
			if(players[p].it === true && circularHitTest(this,players[p])){
				players[p].it = false;
				this.owner.it = true;
				this.owner.score += 3;
				console.log(this.owner);
			}
		}

		this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+') rotate('+ this.angle/Math.PI/2*360 +')');
	}
};

bullet.prototype.hitTest = function(){
	//var distance = Math.sqrt( 1 );
};

////

function turret(id){
	//this.angle = Math.random()*Math.PI*2;
	//this.velocity = 0;
	this.element = document.getElementById('turret_'+id);
	this.reset();
	return this;
}

turret.prototype.reset = function(){
	this.radius = 100;
	this.x = Math.random()*(canvasWidth - this.radius*2) + this.radius;
	this.y = Math.random()*(canvasHeight - this.radius*2) + this.radius;
	this.countdown = 500 + Math.random()*2000;
	return this;
}

turret.prototype.advance = function(){
	for(var t=0; t<players.length; t++){
		//not-it players intersecting turret
		if(players[t].it === false && circularHitTest(this,players[t])){
			var bulletSearch = true;
			var b=0;
			var nextBullet = undefined;
			while(bulletSearch === true && b < bullets.length){
				if(bullets[b].active === false){
					nextBullet = b;
					bulletSearch = false;
				}
				b++;
			}

			if(nextBullet !== undefined){
				var angle = Math.atan2((this.y - players[t].y),(this.x - players[t].x));
				bullets[nextBullet].x = this.x;
				bullets[nextBullet].y = this.y;
				bullets[nextBullet].angle = angle;
				bullets[nextBullet].active = true;
				bullets[nextBullet].owner = players[t];
				this.radius -= 0.2;
			}
		}
	}
	this.x += Math.random()*7 - 3.5;
	this.y += Math.random()*7 - 3.5;
	this.radius += Math.random()*2 - 1.1;
	this.element.setAttributeNS(null,'r',this.radius);
	this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+')');
	//console.log(this.countdown);
	if(--this.countdown <= 0 || this.radius <= 10){
		this.reset();
	}
	return this;
};

////

function token(id){
	this.element = document.getElementById('token_'+id);
	this.x = 0;
	this.y = 0;
	this.radius = 10;
	this.reset();
	return this;
}

token.prototype.advance = function(){
	this.x += Math.random()*4 - 2;
	this.y += Math.random()*4 - 2;
	if(this.x < 50 || this.x > (canvasWidth - 100) || this.y < 50 || this.y > (canvasHeight - 100)){
		this.reset();
	}
	this.element.setAttributeNS(null,'transform','translate('+this.x+','+this.y+')');
	return this;
};

token.prototype.reset = function(){
	this.x = Math.random()*canvasWidth;
	this.y = Math.random()*canvasHeight;
};

////
////

var redPlayer = new player('red');
var greenPlayer = new player('green');
var bluePlayer = new player('blue');
players = [redPlayer,greenPlayer,bluePlayer];
redPlayer.it = true;

for(var i=0; i<20; i++){
	var new_bullet = new bullet(i);
	bullets.push(new_bullet);
}

for(var i=0; i<3; i++){
	var new_turret = new turret(i);
	turrets.push(new_turret);
}

for(var i=0; i<10; i++){
	var new_token = new token(i);
	tokens.push(new_token);
}

//debugging faker subscription
window.poll = function(data){
	//console.log(data.red);
	redPlayer.advance(data.red.x,data.red.y);
	greenPlayer.advance(data.green.x,data.green.y);
	bluePlayer.advance(data.blue.x,data.blue.y);
	//console.log(data.red.x,data.red.y);
};

//live sensor subscription
var camWidth = 160;
var camHeight = 30;
var camLeft = 0;
var camTop = 0;

function messageHandler(data) {
	redPlayer.advance(
		(data.red.x - camLeft) / camWidth * canvasWidth,
		(data.red.y - camTop) / camHeight * canvasHeight
	);
	greenPlayer.advance(
		(data.green.x - camLeft) / camWidth * canvasWidth,
		(data.green.y - camTop) / camHeight * canvasHeight
	);
	bluePlayer.advance(
		(data.blue.x - camLeft) / camWidth * canvasWidth,
		(data.blue.y - camTop) / camHeight * canvasHeight
	);
}
var onSensorsMessage = onSensorsMessage || function(){console.error('please load sensor.js');	};
onSensorsMessage(messageHandler, {});

function tick(){
	for(i=0; i<20; i++){ bullets[i].advance(); }
	for(i=0; i<3; i++){ turrets[i].advance(); }
	for(i=0; i<10; i++){ tokens[i].advance(); }
}
tick();

var timer = setInterval(tick, 1000/60.0);

var gameStart = document.getElementById('gameStart');
var gameOver = document.getElementById('gameOver');


