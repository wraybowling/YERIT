/**
* include this svg

<svg id="debug" style="fill:none; stroke-width:2px; width:1024px; height:768px; position:absolute; top:0; left:0; z-index:10">
	<circle id="red" r="2" style="stroke:red" cx="50" cy="50"/>
	<circle id="green" r="7" style="stroke:green" cx="50" cy="50"/>
	<circle id="blue" r="12" style="stroke:blue" cx="50" cy="50"/>
</svg>

* then hold one (or multiple) of the R, G, B keyboard keys to record motions
* playback is automatic and looping
*/

(function(){

	var dataLength = 600;

	var data = {
		r: [{x:0,y:0}]
		,g: [{x:0,y:0}]
		,b: [{x:0,y:0}]
	};

	var tickR = 0
		,tickG = 0
		,tickB = 0;

	var recordingR = false
		,recordingG = false
		,recordingB = false;

	var mysvg = document.querySelector('svg#debug')
		,svgR = mysvg.querySelector('#red')
		,svgG = mysvg.querySelector('#green')
		,svgB = mysvg.querySelector('#blue');

	var mouseX = 0
		,mouseY = 0;

	function keydown(event){
		switch(event.keyCode){
			case 82:
				recordingR = true;
				break;
			case 71:
				recordingG = true;
				break;
			case 66:
				recordingB = true;
				break;
		}
	}

	function keyup(event){
		switch(event.keyCode){
			case 82:
				recordingR = false;
				break;
			case 71:
				recordingG = false;
				break;
			case 66:
				recordingB = false;
				break;
		}
	}

	function mousemove(event){
		mouseX = event.x;
		mouseY = event.y;
	}

	document.body.onkeydown = function(event){ keydown(event); };
	document.body.onkeyup = function(event){ keyup(event); };
	document.body.onmousemove = function(event){ mousemove(event); };

	window.poll = window.poll || function(){};

	function tick(){
		tickR = (tickR + 1) % (data.r.length);
		tickG = (tickG + 1) % (data.g.length);
		tickB = (tickB + 1) % (data.b.length);
		if(recordingR){ data.r.push({x:mouseX, y:mouseY}); }
		if(recordingG){ data.g.push({x:mouseX, y:mouseY}); }
		if(recordingB){ data.b.push({x:mouseX, y:mouseY}); }
		svgR.setAttributeNS(null,'cx',data.r[tickR].x);
		svgR.setAttributeNS(null,'cy',data.r[tickR].y);
		svgG.setAttributeNS(null,'cx',data.g[tickG].x);
		svgG.setAttributeNS(null,'cy',data.g[tickG].y);
		svgB.setAttributeNS(null,'cx',data.b[tickB].x);
		svgB.setAttributeNS(null,'cy',data.b[tickB].y);
		window.poll({
			red:data.r[tickR],
			green:data.g[tickG],
			blue:data.b[tickB],
		});
	}

//	tick();

	var timer = setInterval(tick, 1000/60.0);
})();
