
var INPUT_RES;
function onSensorsMessage(callback, options) {
  var o = options || {
    tick: 1000/60.0
  }; // TODO merge instead of overwrite

  var WIDTH = 150;
  var HEIGHT = 60;
  function handle_ws_message(message) {
    //var INPUT_RES = o.input_res;
    
    input = JSON.parse(message.data);
    if (!INPUT_RES) {
        INPUT_RES = [input.w, input.h];
        INPUT_RES_H = [ INPUT_RES[0] / 2, INPUT_RES[1] / 2];
        //console.log("Set INPUT_RES: " + INPUT_RES);
    }

    console.log("input.red.x=" + input.red.x
		+ " INPUT_RES_H[0]=" + INPUT_RES_H[0]
		+ " INPUT_RES[0]=" + INPUT_RES[0]);
/*
    console.log("input.red.y=" + input.red.y
		+ " INPUT_RES_H[1]=" + INPUT_RES_H[1]
		+ " INPUT_RES[1]=" + INPUT_RES[1]);
*/

    var s = (INPUT_RES[0] / WIDTH);
    var t = (INPUT_RES[1] / HEIGHT);
    input.red.x   =   (INPUT_RES[0] - input.red.x) / s;
    input.red.y   =   input.red.y / t;
    input.green.x   =   (INPUT_RES[0] - input.green.x) / s;
    input.green.y   =   input.green.y / t;
    input.blue.x   =   (INPUT_RES[0] - input.blue.x) / s;
    input.blue.y   =   input.blue.y / t;

/*
    input.red.x   = (input.red.x   - INPUT_RES_H[0]) * 1.75 * WIDTH  / INPUT_RES[0];
    input.red.y   = (input.red.y   - INPUT_RES_H[1]) * 1.75 * HEIGHT / INPUT_RES[1];
    input.green.x = (input.green.x - INPUT_RES_H[0]) * 1.75 * WIDTH  / INPUT_RES[0];
    input.green.y = (input.green.y - INPUT_RES_H[1]) * 1.75 * HEIGHT / INPUT_RES[1];
    input.blue.x  = (input.blue.x  - INPUT_RES_H[0]) * 1.75 * WIDTH  / INPUT_RES[0];
    input.blue.y  = (input.blue.y  - INPUT_RES_H[1]) * 1.75 * HEIGHT / INPUT_RES[1];
*/

    callback(input);
  }

  function setupWebsockets(callback) {
    try {
      // var ip = '10.192.212.90';
      var ip = '127.0.0.1';
      var connection = new WebSocket('ws://' + ip + ':1337');
      connection.onopen = function () {
          console.log("connection established");
          // when connection opens, establish message handler
          connection.onmessage = handle_ws_message;
      };
      return true;
    } catch (e) {
        console.error("Failed to create websocket connection to dimo server.");
        console.error(e);
        return false;
    }
  }

  function runEventsFromArray(a) {
    var i=0;
  
    var ticker = setInterval(function() { // TODO event handler to cancel interval
      callback(a[i]);
      i = (i+1) % a.length;
    }, o.tick);
  }

  if (o.eventsFile) {
    console.log('reading events from local storage', o.eventsFile);
    var retrievedObject = localStorage.getItem('readings');
    var readings = JSON.parse(retrievedObject);
    console.log('retrievedObject: ', readings);
    console.log(readings.length);
    console.log("x=" + readings[0][0] + " y=" + readings[0][1]);
    console.log("x=" + readings[1][0] + " y=" + readings[1][1]);
    runEventsFromArray(readings);
  } else {
    setupWebsockets(callback);
  }
}

