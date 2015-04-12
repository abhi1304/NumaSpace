var request = require('request');

exports.evaluate = function(inputString, data, callback){
	console.log(inputString);
	request.post('http://localhost:9090/numa/space/nasa', {form:{apiKey:'58bee9651515e85e2f80889dbcabd780', apiPass:'83bb954275029d2a7849fb24e549643f', input: inputString, date: new Date()}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	console.log(body);
        	callback(JSON.parse(body));
         }
    });
}
