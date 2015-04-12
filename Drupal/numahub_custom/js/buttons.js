var danger = false;

function onRightButtonClick(){
	if(currentItemInView=="map"){
		if(map){
			var center = map.getCenter();
			center[1]=center[1]-20;
			if(center[1]<-180){
				center[1]=360+center[1];
			}
			map.panTo(center, {heading: 90, duration: 0.5});
			//talker.Speak("Moved left");
		}
	}else{
		talker.Speak("Nothing to go Left");
	}
}

function onLeftButtonClick(){
	if(currentItemInView=="map"){
		if(map){
			var center = map.getCenter();
			center[1]=center[1]+20;
			if(center[1]>180){
				center[1]=360-center[1];
			}
			map.panTo(center, {heading: 90, duration: 0.5});
			//talker.Speak("Moved left");
		}
	}else{
		talker.Speak("Nothing to go Right");
	}
}

function onDownButtonClick(){
	if(currentItemInView=="map"){
		if(map){
			var center = map.getCenter();
			center[0]=center[0]+20;
			if(center[0]>90){
				center[0]=180-center[0];
				center[1]=180-center[1];
			}
			map.panTo(center, {heading: 90, duration: 0.5});
			//talker.Speak("Moved left");
		}
	}else{
		talker.Speak("Nothing to go Right");
	}
}

function onUpButtonClick(){
	if(currentItemInView=="map"){
		if(map){
			var center = map.getCenter();
			center[0]=center[0]-20;
			if(center[0]<-90){
				center[0]=180+center[0];
				center[1]=180-center[1];
			}
			map.panTo(center, {heading: 90, duration: 0.5});
			//talker.Speak("Moved left");
		}
	}else{
		talker.Speak("Nothing to go Right");
	}
}

function onZoomoinButtonClick(){
	if(currentItemInView=="map"){
		if(map){
			var zoomLevel = Math.round(map.getZoom())+1;
			map.setZoom(zoomLevel, {duration: 1});
			talker.Speak("Zoom level set to "+zoomLevel);
		}

	}else{
		talker.Speak("Nothing to Zoom");
	}
}

function onZoomoutButtonClick(){
	if(currentItemInView=="map"){
		if(map){
			var zoomLevel = Math.round(map.getZoom())-1;
			map.setZoom(zoomLevel, {duration: 1});
			talker.Speak("Zoom level set to "+zoomLevel);
		}
	}else{
		talker.Speak("Nothing to Zoom");
	}
}

var map;
var currentItemInView;

function onMapButtonClick(speak){
	 $("#earth_div").show();
	$("#earth_div").html("");
	 currentItemInView="map";
	setTimeout(function(){
		var options = {atmosphere: true, center: [0, 0], zoom: 0};
	    map = new WE.map('earth_div', options);
	    
	       /* WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
	          subdomains: '1234',
	          zooming: true,
	          attribution: 'Tiles Courtesy of MapQuest'
	        }).addTo(map);*/

	        var baselayer = WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
          subdomains: '1234',
          attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
          maxZoom: 18
        }).addTo(map);

        var overlay = WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
          subdomains: '1234',
          attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
          maxZoom: 18,
          opacity: 0.5
        }).addTo(map);


	    hideOthers('#earth_div');   
	   
	   
	   
	    $("#earth_div").show();
	    if(speak==undefined || speak==true){
	    	 talker.Speak("Here is your Map");
	 	}
	},500);     
}


var rooms= new Object();
var light_status= new Object();

function initFloorRooms(){
	rooms= new Object();
	rooms["1a"]= "#1A";
	rooms["2a"]= "#2A";
	rooms["3a"]= "#3A";
	rooms["4a"]= "#4A";
	rooms["1b"]= "#1B";
	rooms["2b"]= "#2B";
	rooms["3b"]= "#3C";
	rooms["4b"]= "#4D";
	rooms["winga"]= "#winga";
	rooms["wingb"]= "#wingb";
	rooms["enginea"]= "#enginea";
	rooms["engineb"]= "#engineb";
	rooms["deck"]= "#deck";
	rooms["ignition"]= "#ignition";

	light_status= new Object();
	light_status["1a"]= "Off";
	light_status["2a"]= "On";
	light_status["3a"]= "Off";
	light_status["4a"]= "Off";
	light_status["1b"]= "Off";
	light_status["2b"]= "Off";
	light_status["3b"]= "On";
	light_status["4b"]= "On";
	light_status["winga"]= "Off";
	light_status["wingb"]= "Off";
	light_status["enginea"]= "Off";
	light_status["engineb"]= "Off";
	light_status["deck"]= "On";
	light_status["ignition"]= "Off";
	
		
}

function stopIgnition(){
	$('#midground').stop(true, true)
	$('#foreground').stop(true, true)
	$('#background').stop(true, true)
}

function startIgnition(){
	if(speedLevel==0){
		stopIgnition();
		return;
	}
	stopIgnition();
	  $('#midground').css({backgroundPosition: '0px 0px'});
	  $('#foreground').css({backgroundPosition: '0px 0px'});
	  $('#background').css({backgroundPosition: '0px 0px'});

		$('#midground').animate({
			//backgroundPosition:"(-10000px -2000px)"
			 "background-position-x":"-10000px",
       		 "background-position-y":"-2000px"
		}, 100000000/speedLevel, 'linear');
		
		$('#foreground').animate({
			//backgroundPosition:"(-10000px -2000px)"
			  "background-position-x":"-10000px",
       		 "background-position-y":"-2000px"
		}, 100000000/speedLevel, 'linear');
		
		$('#background').animate({
			//backgroundPosition:"(-10000px -2000px)"
			    "background-position-x":"-10000px",
       		 "background-position-y":"-2000px"
		}, 100000000/speedLevel, 'linear');
}

function takeAction(room, action){
	var key = room.toLowerCase();

	if(room=="all"){

		 for (var key in rooms) {
		  if (rooms.hasOwnProperty(key)) {
		  	if (key!=="ignition"){
		    	if(action){
		    		 var data = $(rooms[key]).mouseout().data('maphilight') || {};
		             data.alwaysOn = true;
		             $(rooms[key]).data('maphilight', data).trigger('alwaysOn.maphilight');
		    	}else{
		    		var data = $(rooms[key]).mouseout().data('maphilight') || {};
		             data.alwaysOn = false;
		             $(rooms[key]).data('maphilight', data).trigger('alwaysOn.maphilight');
		    	}
		    }	
		  }
		}

		 if(action){
		 	talker.Speak("All Lights are now ON");
		 }else{
		 	talker.Speak("All Lights are now OFF");
		 }
	}else{
		var data = $(rooms[key]).mouseout().data('maphilight') || {};
	    data.alwaysOn = action;
	    $(rooms[key]).data('maphilight', data).trigger('alwaysOn.maphilight');

	    if(room=="ignition"){
		    if(action){
		    	if(speedLevel==0){
		    		speedLevel = 300;
		    		drawSpeed();
		    	}
		    	startIgnition();
		    }else{
		    	stopIgnition();
		    }
		 }
	     var roomStr = room=="ignition"?"Ignition":("Lights for Room "+room);
		 if(action){
		 	talker.Speak(roomStr+" is now ON");
		 }else{
		 	talker.Speak(roomStr+" is now OFF");
		 }
	}	 
}

/* ===> create a div with id = idWeathyerCanvas where weather information needs to be displayed */


function msToTime(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var amPM = "AM";
  if(hour>12){
  	hour = hour-12;
  	amPM = "PM";
  }
  var time = hour + ':' + min+" "+amPM;
  return time;
}

function populateWeatherInfo(data){
	try{
		hideOthers('#weather_div');

		var temperature = Math.round(data.main.temp - 273.15) + 'C';
		var description = data.weather[0].description;
		    //description = description.charAt(0).toUpperCase() + description.substring(1);
		var imgw = data.weather[0].icon;
		 console.log(temperature+"--"+description);
		 
		 var html_weather = '<div class="row weatherAreacss">'
			 +'<div class="col-lg-12  weathecontainer">'
		 +'<legend> <h3>'+ data.name+', '+data.sys.country+'</h3></legend>'
		 +'</div>'
		 +'</div>'
		 +'<div class="row weatherAreacss">'
		 +'<div class="col-lg-3 col-lg-offset-1">'
		 +'<img src="/sites/all/modules/numahub_custom/images/climate/'+imgw+'.png" alt="clouds" class="weathericon">'
		 +'<h4>'+description+'</h4>'
		 +'</div>'
		 +'<div class="col-lg-7 col-lg-offset-1">'
		 +'<table class="table">'
		 +'<tbody>'
		 +'<tr>'
		 +'<th scope="row">Temperature</th>'
		 +'<td>'+(temperature)+' C</td>'
		 +'</tr>'
		 +'<tr>'
		 +'<th scope="row">Pressure</th>'
		 +'<td>'+data.main.pressure+' hPa</td>'
		 +'</tr>'
		 +'<tr>'
		 +'<th scope="row">Sea level</th>'
		 +'<td>'+data.main.sea_level+' hPa</td>'
		 +'</tr>'
		 +'<tr>'
		 +'<th scope="row">Ground level</th>'
		 +'<td>'+data.main.grnd_level+' hPa</td>'
		 +'</tr>'
		 +' <tr>'
		 +'<th scope="row">Humididty</th>'
		 +'<td>'+data.main.humidity+'%</td>'
		 +'</tr>'
		 +' <tr>'
		 +'<th scope="row">Wind Speed</th>'
		 +'<td>'+data.wind.speed+' mps</td>'
		 +'</tr>'
		 +' <tr>'
		 +'<th scope="row">Wind Direction</th>'
		 +'<td>'+data.wind.deg+' degrees</td>'
		 +'</tr>'
		 +' <tr>'
		 +'<th scope="row">Sunrise</th>'
		 +'<td>'+msToTime(data.sys.sunrise)+'</td>'
		 +'</tr>'
		 +' <tr>'
		 +'<th scope="row">Sunset</th>'
		 +'<td>'+msToTime(data.sys.sunset)+'</td>'
		 +'</tr>'
		 +'</tbody>'
		 +'</table>'
		 +'</div>'
		 +'</div>' ;
		 //console.log(html_weather);
		 $('#weather_div').html(html_weather);
		 $('#weather_div').show();
		 talker.Speak("Here is the Weather for "+data.name);
	}catch(e){
		 talker.Speak("Unable to fetch Weather.");
	}		 
}


function fecthAndPopulateWeather(cityName){
	URI = "http://api.openweathermap.org/data/2.5/weather?q="+cityName;
	  $.getJSON( URI)
	  .done(function( data ) {
	    populateWeatherInfo(data);
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
}

function fecthAndPopulateWeatherCoordinates(lat, lon){
	URI = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon;
	  $.getJSON( URI)
	  .done(function( data ) {
	    populateWeatherInfo(data);
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	   var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
}

function fecthAndPopulateWeatherZip(zip){
	URI = "http://api.openweathermap.org/data/2.5/weather?zip="+zip;
	  $.getJSON( URI)
	  .done(function( data ) {
	    populateWeatherInfo(data);
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	   var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
}

function onWeatherButtonClick(){
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
        	 hideOthers('#weather_div');
        	 fecthAndPopulateWeatherCoordinates(position.coords.latitude, position.coords.longitude);
        	
        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function onFloorButtonClick(){
	initFloorRooms();
	//$("#floorplan_div").html("<img class='floorplan' src='/sites/all/modules/numahub_custom/images/floor.png' width='800px'>");
	 currentItemInView="floor";
	 hideOthers('#floorplan_div');   
	 $('.floorplan').maphilight({
	 	 fillColor: 'FFFF00',
	 	 fillOpacity: 0.6,
	 	 strokeColor: 'ffffff',
	 	 strokeOpacity: 0.7,
	 });

     /*$('#squidheadlink').mouseover(function(e) {
        $('#squidhead').mouseover();
     }).mouseout(function(e) {
        $('#squidhead').mouseout();
     }).click(function(e) { 
     	e.preventDefault(); 
     });*/

	for (var key in rooms) {
	  if (rooms.hasOwnProperty(key)) {
	    	if(light_status[key]=="On"){
	    		 var data = $(rooms[key]).mouseout().data('maphilight') || {};
	             data.alwaysOn = true;
	             $(rooms[key]).data('maphilight', data).trigger('alwaysOn.maphilight');
	    	}else{
	    		var data = $(rooms[key]).mouseout().data('maphilight') || {};
	             data.alwaysOn = false;
	             $(rooms[key]).data('maphilight', data).trigger('alwaysOn.maphilight');
	    	}
	  }
	}
	 talker.Speak("Here is the Floor Plan");
}



function mapGoTo(lat, lng, address){
	zoom = 5;
	if(address.indexOf("USA")>=0){
		zoom = 8;
	}
	 if(map){
	 	map.panTo([lat, lng], {heading: 90, tilt: 25, duration: 1});
	 	setTimeout(function(){
	 		map.setZoom(zoom);
	 	}, 3000);
		
	}else{
		talker.Speak("You are not seeing a Map");
	}
}


function hideOthers(str){
	var divs = ["#earth_div", "#svg-canvas", "#floorplan_div", "#weather_div"];
	for(var i=0; i<divs.length;i++){
		if(divs[i]==str){
			$(divs[i]).show();
		}else{
			$(divs[i]).hide();
		}
	}
	
}

function initButtons(){
	
	$("#leftButton").click(onLeftButtonClick);
	$("#rightButton").click(onRightButtonClick);
	$("#upButton").click(onUpButtonClick);
	$("#downButton").click(onDownButtonClick);
	$("#zoominButton").click(onZoomoinButtonClick);
	$("#zoomoutButton").click(onZoomoutButtonClick);
	$("#mapButton").click(onMapButtonClick);
	$("#floorButton").click(onFloorButtonClick);
	$("#weatherButton").click(onWeatherButtonClick);

	//$("#floorplan_div").hide();
	//onFloorButtonClick();
	//onWeatherButtonClick();

}


function showGesturePointer(){
	$("#myHand").show();
}

function hideGesturePointer(){
	$("#myHand").hide();
}


function gestureOn(){
	$("#myHand").css("background", "#00ff00");
}

function gestureOff(){
	$("#myHand").css("background", "#444444");
}

function handleIntent(intent){

		console.log(intent);
		
		if(intent.CATEGORY=="Gesture"){

			if(intent.INTENT=="ON" || intent.INTENT=="RAISE"){
				gestureOn();
				talker.Speak("Gesture Identification is now ON");
			}else if(intent.INTENT=="OFF"){
				gestureOff();
				talker.Speak("Gesture Identification is now OFF");
			}	
            return;
		}

		if(intent.CATEGORY=="Weather"){

			if(intent.INTENT=="City"){
				fecthAndPopulateWeather(intent.VAL);
			}else if(intent.INTENT=="Zip"){
				fecthAndPopulateWeatherZip(intent.VAL);
			}	
            return;
		}

		if(intent.ROOM){
			if(currentItemInView!="floor"){
				onFloorButtonClick();
			}

			if(intent.INTENT=="ON" || intent.INTENT=="RAISE" ||  intent.DIRECTION=="Up"){
				takeAction(intent.ROOM, true);
				return;
            }else if(intent.INTENT=="OFF" || intent.INTENT=="LOWER" || intent.DIRECTION=="Down"){
            	takeAction(intent.ROOM, false);
            	return;
            }	
            return;
		}

		if(intent.LEVEL){
			intent.INTENT = "Set";
		}

		if(intent.CATEGORY=="Map"){
			if(currentItemInView!="map"){
				onMapButtonClick(false);
				setTimeout(function(){
					handleIntent(intent);
				},3000);
				return;
			}
		}else if(intent.CATEGORY=="Floor"){
			if(currentItemInView!="floor"){
				onFloorButtonClick();
			}
			return;
		}else if(intent.CATEGORY=="Time"){
			talker.Speak("The Time is "+$("#clock").text().replace(":"," "));
			return;
		}else if(intent.CATEGORY=="Danger"){

			if(intent.INTENT=="Danger"){
				danger = true;
				$("#danger").show();
				talker.Speak("Danger. Emergency Procedure in Progress. ");
			}else{
				$("#danger").hide();
				if(danger){
					talker.Speak("Emergency Resolved. Back to Normal Operations. ");
					danger = false;
				}

			}
			return;
		}else if(intent.CATEGORY=="Oxygen"){
			if(intent.INTENT=="Set"){
				if(intent.LEVEL && !isNaN(intent.LEVEL)){
					oxygenLevel=intent.LEVEL;
					drawOxygen();
					talker.Speak("Oxygen level is now "+oxygenLevel+" percent");
					return;
				}else{
					talker.Speak("The Oxygen level should be a number ");
					return;
				}
			}else{
				talker.Speak("Oxygen level is "+oxygenLevel+" percent");
				return;
			}
			return;
		}else if(intent.CATEGORY=="Pressure"){
			if(intent.INTENT=="Set"){
				if(intent.LEVEL && !isNaN(intent.LEVEL)){
					pressureLevel=intent.LEVEL;
					drawPressure();
					talker.Speak("Pressure level is now "+pressureLevel+" mm");
					return;
				}else{
					talker.Speak("The Pressure level should be a number ");
					return;
				}
			}else{
				talker.Speak("Pressure level is "+pressureLevel+" mm");
				return;
			}
			return;
		}else if(intent.CATEGORY=="Speed"){
			if(intent.INTENT=="Set"){
				if(intent.LEVEL && !isNaN(intent.LEVEL)){
					speedLevel=intent.LEVEL;
					drawSpeed();
					startIgnition();
					talker.Speak("Speed level is now "+speedLevel+" miles/hour");
					return;
				}else{
					talker.Speak("The Speed level should be a number ");
					return;
				}
			}else{
				talker.Speak("Speed level is "+speedLevel+" miles/hour");
				return;
			}
			return;
		}else if(intent.CATEGORY=="Temperature"){
			if(intent.INTENT=="Set"){
				if(intent.LEVEL && !isNaN(intent.LEVEL)){
					tempLevel=intent.LEVEL;
					drawTemperature();
					talker.Speak("Temperature level is now "+tempLevel+" degrees Farenheit");
					return;
				}else{
					talker.Speak("The Temperature level should be a number ");
					return;
				}
			}else{
				talker.Speak("Temperature level is "+tempLevel+" degrees Farenheit");
				return;
			}
			return;
		}else if(intent.CATEGORY=="Stats"){
			 talker.Speak("Oxygen level is "+oxygenLevel+". Pressure level is "+pressureLevel+". Speed level is "+speedLevel+". Temperature level is "+tempLevel);
			 return;
		}

			

		if(intent.INTENT=="Move"){

			if(currentItemInView==null){
				onMapButtonClick();
				setTimeout(function(){
					handleIntent(intent);
				},3000);
				return;
			}
			if(intent.DIRECTION=="Left"){
				onLeftButtonClick();
				talker.Speak("Moved Left");
				return;
			}else if(intent.DIRECTION=="Right"){
				onRightButtonClick();
				talker.Speak("Moved Right");
				return;
			}else if(intent.DIRECTION=="Up"){
				onUpButtonClick();
				talker.Speak("Moved Up");
				return;
			}else if(intent.DIRECTION=="Down"){
				onDownButtonClick();
				talker.Speak("Moved Down");
				return;
			}else if(intent.DIRECTION=="Forward"){
				onZoomoutButtonClick();
				return;
			}else if(intent.DIRECTION=="Backward"){
				onZoomoinButtonClick();
				return;
			}
			return;
		}


		if(intent.INTENT=="Zoom"){

			if(currentItemInView==null){
				onMapButtonClick(false);
				setTimeout(function(){
					handleIntent(intent);
				},3000);
				return;
			}
			if(intent.ZOOMLEVEL=="-1" ||intent.ZOOMLEVEL==-1){
				onZoomoutButtonClick();
				talker.Speak("Zoomed Out");
				return;
			}else{
				onZoomoinButtonClick();
				talker.Speak("Zoomed In");
				return;
			}
			return;
		}	

		if(intent.LOCATIONS && intent.CATEGORY!="Floor"){
			if(currentItemInView==null || currentItemInView!="map"){
				onMapButtonClick(false);
				setTimeout(function(){
					handleIntent(intent);
				},3000);
				return;
			}
			var l = intent.LOCATIONS[0]
			mapGoTo(l.LATITUDE, l.LONGITUDE, l.ADDRESS);
			talker.Speak("Showing "+l.ADDRESS);
			return;
		}
}