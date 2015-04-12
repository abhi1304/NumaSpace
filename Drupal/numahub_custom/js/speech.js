
var SpeechMaker = function(){
	var me = this;
	this.callback = null;
	this.listening  = false;
	this.autoRestart = false;
	this.lastStartedAt = 0;
	this.recognition = null;
	var SpeechRecognition = 	window.SpeechRecognition ||
	 						 	window.webkitSpeechRecognition ||
		 						window.mozSpeechRecognition ||
		 						window.msSpeechRecognition ||
		 						window.oSpeechRecognition;
	
	this.init = function(mappings){
		
		$("#startListening").on("click", function(){
			me.startRecognition();
		});

		$("#stopListening").on("click", function(){
			me.stopRecognition();
			
		});
		
	}
	
	this.Speak = function(text){
		if(talker){
			talker.Speak(text);
		}
	}

	this.stopRecognition = function(){
		try{
			me.recognition.stop();
		}catch(e){

		}		 

	}
	
	this.startRecognition = function(){
		  try{
			  var recognition = new SpeechRecognition();
			  recognition.maxAlternatives = 1;
		      recognition.interimResults = false;
		      recognition.continuous = window.location.protocol === 'http:';
		      recognition.lang = 'en-US';
		      
		      recognition.onstart = function(){ 
		    	  me.lastStartedAt = new Date().getTime();
		       };

		      recognition.onerror = function(event) {
				        switch (event.error) {
					        case 'network':
					          alert("Network error occured");
					          break;
					        case 'not-allowed':
					        case 'service-not-allowed':
					          alert("Voice capability Disabled.");	
					          me.autoRestart = false;
					          break;
				        }
		      };

		      recognition.onend     = function() {
		        if (me.autoRestart) {
		          var timeSinceLastStart = new Date().getTime()-me.lastStartedAt;
		          if (timeSinceLastStart < 1000) {
		            setTimeout(me.startRecognition, 1000-timeSinceLastStart);
		          } else {
		        	  me.startRecognition();
		          }
		        }
		      };
		      
		      recognition.onresult  = function(event) {
		        	me.check(event);
		            return false;
		      };
		      
		      recognition.start();
		      me.recognition = recognition;
		      me.Speak('Hi. How can I help you?.');
		      me.startListening();
		   }catch(e){
		   		alert("Unfortunately, your browser does not support Speech recognition. Try using Google Chrome.");
		   }   
	      
	}
	
	this.check  = function(event) {
          var results = event.results[event.resultIndex];
          var commandText;
          var resultsString="";
          for (var i = 0; i<results.length; i++) {
            commandText = results[i].transcript.trim();
            resultsString=resultsString+commandText+". ";
            
            if(commandText.indexOf("start listening")>-1){
            	me.startListening();
            	return false;
            }else if(commandText.indexOf("stop listening")>-1){
            	me.stopListening();
            	return false;
            }else if(me.listening){
          	  if(commandText.indexOf("clear form")>-1){
                	me.clearform();
                	return false;
                }else if(commandText.indexOf("submit form")>-1){
                	me.submitform();
                	return false;
                }
            }  
          }  
          
          if(me.listening){
          	  $("#input").val(resultsString);
        	  $("#submitButton").click();
          }
          
    },
    
    this.startListening = function(){
		if(me.listening){
			//me.Speak('Yup, I am listening');
		}else{
			me.listening = true;
		}	
	}
	
	this.stopListening = function(){
		me.listening = false;
		me.hideLoader();
		me.Speak('OK. Let me know if you need anything.');
	}

}