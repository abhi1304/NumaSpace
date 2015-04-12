/*

{"status":"success","data":{"SCORECL":0.152757970217124,"TAGCL":"qh","STATE":"com.numahub.converse.states.QuestionState","NEXTSTATE":["com.numahub.converse.states.AnswerState","com.numahub.converse.states.DisAgreeState","com.numahub.converse.states.DontKnowState","com.numahub.converse.states.AgreeState","com.numahub.converse.states.NeedMoreInformationState"]}}
*/


var greeting = require("../greeting/greeting.js");
var intent = require("../intent/intent.js");

exports.evaluate = function(inputString, response, callback){
	console.log(response);
	if(response.status=="success"){

		if(response.data.STATE=="GreetingState"){
			greeting.evaluate(inputString, response.data, callback);
		}else{
			intent.evaluate(inputString, response.data, callback);
		}
		
	}else{
		callback("Unable to connect with NumaCore");
	}
}