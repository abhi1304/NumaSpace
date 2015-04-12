
var FormMaker = function(){
	var me = this;
	var msg;
	this.formid = "";
	this.apiKey = "";
	this.apiPass = "";
	this.url = "";
	this.listening  = false;
	this.autoRestart = false;
	this.lastStartedAt = 0;
	this.recognition = null;
	this.mappings = {};
	var SpeechRecognition = 	window.SpeechRecognition ||
	 						 	window.webkitSpeechRecognition ||
		 						window.mozSpeechRecognition ||
		 						window.msSpeechRecognition ||
		 						window.oSpeechRecognition;
	
	this.init = function(mappings){
		this.mappings = mappings;

		msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.voice = voices[2]; 
		msg.voiceURI = 'native';
		msg.volume = 1; // 0 to 1
		msg.rate = 1; // 0.1 var msg = new SpeechSynthesisUtterance();to 10
		msg.pitch = 2; //0 to 2
		msg.lang = 'en-US';
		
		
		$("#loader").hide();
		//this.startRecognition();
		
		$("#startListening").on("click", function(){
			me.startListening();
		});
		
		$("#teststrings li").on("click", function(){
			$("#input").val($(this).html());
			$("#submitButton").click();
		});
		
	}
	
	this.Speak = function(text){
		msg.text=text;
		speechSynthesis.speak(msg);
	}

	this.startLoader = function(){
		try{
			$("#loader").show();
		}catch(e){
			
		}
	}
	
	this.hideLoader = function(){
		try{
			$("#loader").hide();
		}catch(e){
			
		}
	}
	
	this.foundSomething = function(){
		try{
			//$("#loader").css("background", "#ff0000");
			setTimeout(function(){
				me.clearfoundSomething();
			},4000);
		}catch(e){
			
		}
	}
	
	this.clearfoundSomething = function(){
		try{
			//$("#loader").css("background", "transparent");
		}catch(e){
			
		}
	}
	
	this.doneFoundSomething = function(){
		me.listening = false;
		try{
			// TBD
			$("#loader").html("Done ...");
			setTimeout(function(){
				$("#loader").hide();
			},2000);  	
		}catch(e){
			
		}
		me.listening = true;
	}
	
	
	this.startRecognition = function(){
		  var recognition = new SpeechRecognition();
		  recognition.maxAlternatives = 2;
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
        	  me.checkWithServer(resultsString);
          }
          
    },
    
    this.testWithServer = function(){
    	me.listening = true;
    	var resultString = $("#tester").val();
    	this.checkWithServer(resultString);
    }
	
	this.checkWithServer = function(resultsString){
    	me.foundSomething();
    	$("#inpit").val(resultsString);

		$.ajax({
		    url: this.url,
		 	dataType: "json",
		 	data: {
		        date: new Date(),
		        apiKey: me.apiKey,
		        apiPass: me.apiPass,
		        input: resultsString
		    },
		 	success: function( results ) {
		 		console.log(results);
		 		me.processContextResponse(results);
		    }
		});
	}

	this.startListening = function(){
		setTimeout(function(){
			me.startLoader();
		}, 1000);
		if(me.listening){
			me.Speak('Yup, I am listening');
		}else{
			me.listening = true;
		}	
	}
	
	this.stopListening = function(){
		me.listening = false;
		me.hideLoader();
		me.Speak('OK. Let me know if you need anything.');
	}
	
	this.processContextResponse=function(results){
		$("#loader").html("<center><h2>Got Some Values...</h2></center>");
			  	
		if(results.data!=undefined && results.data!=null){
			console.log("In");
			console.log(results.data);
			var updates=0;
			var p = results.data;
			for (var key in p) {
			  if (p.hasOwnProperty(key)) {
			    commandText = p[key];
				try{
					var selector = me.mappings[key];
					me.processField(selector, commandText);
					updates++;
				}catch(e){
					console.log(e);
				}
			  }	
			}
			me.doneFoundSomething();
			
		}	
	}
	
	this.submitform = function(){
		if(me.listening){
			me.Speak('Form submitted.');
			setTimeout(function(){
				$(me.formid).submit();
				
			}, 2000);
		}
	}
	
	this.clearform = function(){
		if(me.listening){
			$(me.formid)[0].reset();
			me.Speak('Form Cleared.');
			me.substitutions = new Object();
		}
	}
	
	this.processField = function(fieldselector, val){
		//if(me.listening){
			var ctrl = $(fieldselector);
			if(ctrl.prop('type') == 'select-one' ) {
				var notFound = true;
				$(fieldselector+" option").each(function(){
						   if(val==$(this).attr("value")){
							   ctrl.val($(this).attr("value"));
							   notFound = false;
						   }
				});
			}else{
				ctrl.val(val);
				 notFound = false;
			}
			
			$(fieldselector).trigger("change");
			
			$(fieldselector).css("border", "4px solid #ff0000");
			setTimeout(function(){
				$(fieldselector).css("border", "1px solid #cccccc");
			},4000);	
			
		//}	
	}
	
}