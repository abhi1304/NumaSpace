var http = require('http').createServer(handler)
  , io   = require('socket.io').listen(http).set('log level', 1);

var request = require('request');
var numahubcore = require("./app/core/numahubcore.js");

http.listen(8180);

console.log('Chatserver listening on port 8180');

var log = {};

function handler(req, res) {
  res.writeHead(200);
  res.end();
}

function tstamp() {
  var currentTime = new Date();
  var days = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat');
  var day = currentTime.getDay();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours > 11) {
    var ap = 'p';
  }
  else {
    var ap = 'a';
  }
  if (hours > 12) {
    hours = hours - 12;
  }

  return days[day] + " " + hours + ":" + minutes + ap + "m ";
}

function linkify(inputText) {
  //URLs starting with http://, https://, or ftp://
  var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with www. (without // before it, or it'd re-link the ones done above)
  var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links
  var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
  var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText
}

function updateLog(type, nick, msg) {
  var curTime = new Date();
  if (typeof 'type' != 'undefined') {
    log[curTime.getTime()] = {'type': type, 'nick': nick, 'msg': msg};
  }
  var i;
  for (i in log) {
    // Cull the log, removing entries older than a half hour.
    if (i < (curTime.getTime() - 1800000)) {
      delete log[i];
    }
  }
}

var device = {};
var portal = {};
var deviceSockets = {};
var portalSockets = {};

io.sockets.on('connection', function (socket) {

    socket.on('connect', function(){
        console.log("Connected");
    });

    socket.on('authresponse', function(token){
        if(token.type=="portal"){
           portal[token.user]=socket;
           portalSockets[socket.id]=token.user;
          console.log("Added "+token.user+" to portal");
        }else{
           device[token.user]=socket;
           deviceSockets[socket.id]=token.user;
           console.log("Added "+token.user+" to devices");
        }

        socket.emit('authsuccess', tstamp(), "Numa", "authentication successful");
    });

    socket.on('user message', function (msg) {
      //socket.broadcast.emit('user message', tstamp(), socket.nickname, linkify(msg));
        request.post('http://localhost:9090/numa/dialog/tag', {form:{apiKey:'58bee9651515e85e2f80889dbcabd780', apiPass:'83bb954275029d2a7849fb24e549643f', input: msg, date: new Date()}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            numahubcore.evaluate(msg, JSON.parse(body), function(evaluatedResponse){
              socket.emit("user message", tstamp(), "Numa", evaluatedResponse);
            });
         }
           });
    });

    socket.on('remote message', function (msg) {

      if(typeof msg == "string"){
          request.post('http://localhost:9090/numa/dialog/tag', {form:{apiKey:'58bee9651515e85e2f80889dbcabd780', apiPass:'83bb954275029d2a7849fb24e549643f', input: msg, date: new Date()}}, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  numahubcore.evaluate(msg, JSON.parse(body), function(evaluatedResponse){
                    var portalUser = deviceSockets[socket.id];
                    console.log("portal user is "+portalUser);
                    if(portalUser){
                        var portalSocket = portal[portalUser];
                        if(portalSocket){
                            portalSocket.emit("user message", tstamp(), "Numa", evaluatedResponse);
                        }
                    }        
                  });
               }
          });
       }else{
          var portalUser = deviceSockets[socket.id];
          if(portalUser){
              var portalSocket = portal[portalUser];
              if(portalSocket){
                  portalSocket.emit("user message", tstamp(), "Numa", msg);
              }
          }      
       }
     });

  socket.on('get log', function () {
    updateLog(); // Ensure old entries are cleared out before sending it.
    io.sockets.emit('chat log', log);
  });

  
  socket.on('disconnect', function () {
    if (!socket.nickname) return;
  });

});
