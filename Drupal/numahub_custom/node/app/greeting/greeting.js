var pattern = require("matches").pattern;

exports.evaluate = function(inputString, data, callback){
	console.log(data);
	var possibleResponses = ["Hi", "Hello","Hey What's up","Hello there"];
	var responseString = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
	
	if(data.responseString){
		responseString = data.responseString;
	}	
	callback(responseString);
}