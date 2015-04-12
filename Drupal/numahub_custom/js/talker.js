
var Talker = function(){
	var me = this;
	var msg;
	
	this.init = function(mappings){
	
		msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.voice = voices[2]; 
		msg.voiceURI = 'native';
		msg.volume = 1; // 0 to 1
		msg.rate = 1; // 0.1 var msg = new SpeechSynthesisUtterance();to 10
		msg.pitch = 2; //0 to 2
		msg.lang = 'en-US';
	}

	this.init();
	
	this.Speak = function(text){
		msg.text=text;
		speechSynthesis.speak(msg);
	}
}