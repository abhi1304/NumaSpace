
function updateStatusMessage(msg){
	var msgDiv ='<div class="chat-body clearfix">'
                        +'<small class="text-muted">'
                                +'<span class="glyphicon glyphicon-time"></span>'+msg+' : 12 mins ago</small>'
                    +'</div>';
               
    $(".chat").append("<li class='left clearfix'>" + msgDiv + '</li>');    
     $(".chatpanel").scrollTop($(".chat").outerHeight());    
}

function updateMessage(msg_time, from, msg, align){

		var msgDiv ='<div class="chat-body clearfix">'
                        +'<p>'+msg+'</p><div style="clear:both;"></div>'
                        +'<small class="text-muted">'
                                +'<span class="glyphicon glyphicon-time"></span>By <b>'+from+"</b> on "+msg_time+'</small>'
                    +'</div>';
               
        var new_item = $("<li class='"+align+" clearfix' style='margin-"+align+": -200px; width: 100%;'>" + msgDiv + '</li>');       
        $(".chat").append(new_item);  
        $(".chatpanel").scrollTop($(".chat").outerHeight());   
        var css = {marginLeft: '0'};
        console.log(align);
        if(align=="right"){
        	css = {marginRight: '0'};
        } 
        
        $(new_item).css("background-color", "rgba(255,255,255,0.2)");
		setTimeout(function(){
			$(new_item).css("background-color", "none");
		},1000);	

        $(new_item).animate(css, 200, function(){
			
		});
}

function updateMessageViewPort(msg_time, from, msg, align){
	var msgDiv ='<h1>'+msg+'</h1><small>From '+from+" at "+msg_time+'</small>';
    $("#response-container").html(msgDiv);      
    talker.Speak(msg);
}

function updateMessageObject(msg_time, from, msg, align){
	//var msgDiv ='<h1>'+msg+'</h1><small>From '+from+" at "+msg_time+'</small>';
    //$("#response-container").html(msgDiv);      
    //talker.Speak(msg);
    handleIntent(msg.data);
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

function tstamp(stamp) {
  var currentTime = new Date(); 
  if (typeof stamp != 'undefined') {
    currentTime.setTime(stamp);
  }
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
  return days[day] + " " + hours + ":" + minutes + ap + "m";
}

function startChat(){

		var user = $("#user").val();
	    var newlyJoined = true;
	    var server_url = $("#server_name").val();
	    var socket = io.connect(server_url);

	    socket.on('connect', function(){
	      	updateStatusMessage("Connected.");
	      	socket.emit('authresponse', {type: "portal", user: user});	
	    });

	    socket.on('authsuccess', function(mg){
	      	updateStatusMessage("Connected. Authentication Successfull");
	    });
	 
	    socket.on('user message', function(msg_time, from, msg){
	    	if(typeof msg == "string"){
		    	updateMessage(msg_time, from, linkify(msg), "left");
		    	updateMessageViewPort(msg_time, from, linkify(msg), "left");
		    }else{
		    	updateMessageObject(msg_time, from, msg, "left");
		    }	
	    	
	    });

	    socket.on('reconnect', function () {
	      	updateStatusMessage("Reconnected");
	    });

	    socket.on('reconnecting', function () {
	     	updateStatusMessage('Attempting to re-connect to the server');
	    });

	    socket.on('announcement', function (msg) {
	      	updateStatusMessage(msg);
	    });

	    socket.on('error', function (e) {
	     	updateStatusMessage(e ? e : 'A unknown error occurred');
	    });

	    
	    $("#submitButton").click(function(){
			var msg = $("#input").val();
			updateMessage(tstamp(), user, msg, "right");
			socket.emit('user message', msg);	
			$("#input").val("");
		});

		$("#input").keypress(function(e){
			if(e.which == 13) {
				var msg = $("#input").val();
				updateMessage(tstamp(), user, msg, "right");
				socket.emit('user message', msg);	
				$("#input").val("");
			}
		});

}		