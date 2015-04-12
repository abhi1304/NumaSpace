
var SpeechMaker = function(){
	var me = this;
	this.callback = null;
	this.listening  = false;
	this.autoRestart = false;
	this.lastStartedAt = 0;
	this.recognition = null;
	var SpeechRecognition = 	window.plugins.speechrecognizer;
	
	this.init = function(mappings){
		
	}
	
	this.Speak = function(text){
		//if(talker){
		//	talker.Speak(text);
		//}
	}

	this.stopRecognition = function(){
		// Do nothing	 

	}
	
	this.startRecognition = function(){
		  try{
		  	  var maxMatches = 1;
		  	  var promptString = "Speak now";
		  	  var language = "en-US";  

		  	  window.plugins.speechrecognizer.startRecognize(function(result){
                     Ext.getCmp("input").setValue(result);
        	 		 mainController.onAskQuestion();
              }, function(errorMessage){
                    console.log("Error message: " + errorMessage);
              }, maxMatches, promptString, language);

		   }catch(e){
		   		alert("Unfortunately, your browser does not support Speech recognition.");
		   }   
	      
	}

}