
var talker;

function initialize($){
  talker = new Talker();
  startTime();
  function realign(){
  		var heightToFill = $(window).height()-$(".screenheader").height();
  		$(".mainContainer").height(heightToFill-80);
    	$(".chatpanel").height(heightToFill-400);
    	$(".svg-container").height(heightToFill-300);
    	$("viewport-container").height(heightToFill);
    	$("#earth_div").height(heightToFill-100);
    	$("#earth_div").width("100%");
    //	$(".response-container").height(heightToFill)*0.1;
    	
  }  	
    
  $(window).resize(function(){  
    	realign();
  });  

  realign();

  function resolve(input){
      
      $.getJSON("http://localhost:8080/numahubapi/neo/story?callback=", {
          apiKey: "58bee9651515e85e2f80889dbcabd780".trim(),
          apiPass: "83bb954275029d2a7849fb24e549643f".trim(),
          input: input

        }, function( data ) {
             	console.log(data);
             	var g = getG(data.data.NODES, data.data.EDGES);
			  	drawGraph(g);
			  	setTimeout(function(){
			  		$("#loader").hide();
			  	}, 2000);
  		
       });
  } 

  function resolveEntities(input){
      
      $.getJSON("http://localhost.com:9090/numahubapi/core/all?callback=", {
          apiKey: "f589a6959f3e04037eb2b3eb0ff726ac".trim(),
          apiPass: "d5b43cd0b03d5a5e47a5613be9d9dc6d".trim(),
          input: input

        }, function( data ) {
             	console.log(data);
             	drawNamed(data);
  				
       });
  }   
 startChat();
 initButtons();
 drawCharts();

// $("#submitButton").click();


  /*$("#submitButton").on("click", function(){
  	   var val = $("#input").val();
  	   if(val==undefined || val.length==0){
  	   		alert("Please enter your command and try again.");
  	   }else{
  			$("#loader").show();
  			resolve($("#input").val());
  			resolveEntities($("#input").val());
  			$("#response-container").html($("#input").val());
  		}
  			
  });

  $('#input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $("#submitButton").click();
    }
	});
  $("#submitButton").click();

  */
};


function drawNamed(results){
	
	if(results.data && results.data.length>0){
		var str = "";		
		for (var i = 0; i < results.data.length; i++) {
			str+="<table class='table table-responsive'><tr><th>#</th><th>Word</th><th>Lemma</th><th>Part of Speech</th><th>Named Entity</th></tr>";
			for (var j = 0; j < results.data[i].length; j++) {
				var item = results.data[i][j];
				str+="<tr><td>"+item.index+"</td><td>"+item.word+"</td><td>"+item.lemma+"</td><td>"+item.pos+"</td><td>"+item.ner+"</td></tr>";
			
			}
			str+="</table><br><br>";
		}
		
		$("#entities").html(str);
	}else{
		alert("Oops. Something went wrong. Please try again.");
	}

}

function getIconAndLabel(label, cl){
	if(label==undefined){
		label = "?";
	}
	if(cl!="other" && cl!="O" && cl!="OTHER"){
		return "<div class='ner'><img src='images/"+cl.toLowerCase()+".png'></div>";
	}
	return "<div class='text'>"+label+"</div>";
}

function getColor(cl){
	var cl = cl.toLowerCase();
	if(cl=="person"){
		return "#E96D63";
	}else if(cl=="organization"){
		return "#7FCA9F";
	}else if(cl=="money"){
		return "#F4BA70";
	}else if(cl=="location"){
		return "#666699";
	}else if(cl=="duration"){
		return "#41AAC4";
	}else if(cl=="date"){
		return "#BDB69C";
	}else if(cl=="time"){
		return "#717D8C";
	}else if(cl=="misc"){
		return "#6d3571";
	}else if(cl=="set"){
		return "#6d3571";
	}else if(cl=="percentage"){
		return "#6d3571";
	}
	return "#6d3571";
}

function getG(nodes, edges){
	d3.select("svg").select("g")
       .remove();

	var g = new dagreD3.graphlib.Graph()
		  .setGraph({})
		  .setDefaultEdgeLabel(function() { return {}; });

	for (var key in nodes) {
 		if (nodes.hasOwnProperty(key)) {
	  		var n = nodes[key];
	  		var label = getIconAndLabel(n.label, n.class);
	  		var description = n.description;
	  		if(description == undefined){
	  			description = "No Description";
	  		}
	  		var fill = "rgba(255,255,255,0.2)";
	  			
			g.setNode(key,  { labelType:"html", label: label, rawLabel:n.label, description: description,  style: "fill: "+fill, shape: "circle",   class: n.class });
		}	
	}

    g.graph().ranksep = 15;
	g.graph().nodesep = 15;
	g.nodes().forEach(function(v) {
		  var node = g.node(v);
		  // Round the corners of the nodes
		  node.rx = node.ry = 10;
		});

	for (var key in edges) {
 		if (edges.hasOwnProperty(key)) {
	  		var e = edges[key];
	  		if(e.source!=undefined && e.target!=undefined){
				g.setEdge(e.source, e.target, { label: e.DATA.label,  lineInterpolate: 'basis', labelStyle: "font-size: 13px; font-weight: normal; color: #ffffff; fill: rgba(255,255,255,0.7);", arrowheadStyle: "fill: rgba(255,255,255,0.7);", class: e.DATA.class});
			}
		}
	}  
	
	
	return g;

}

function drawGraph(g){
		
		console.log(g);

		// Create the renderer
		var render = new dagreD3.render();

		// Set up an SVG group so that we can translate the final graph.
		var svg = d3.select("svg"),
		    svgGroup = svg.append("g");

		/*var zoom = d3.behavior.zoom().on("zoom", function() {
		    svgGroup.attr("transform", "translate(" + d3.event.translate + ")" +
		                                "scale(" + d3.event.scale + ")");
		  }); */
		//svg.call(zoom);

		var styleTooltip = function(name, description) {
		  return "<p class='name'>" + name + "</p><p class='description'>" + description + "</p>";
		};

		//g.graph().rankdir = "LR";
		// Run the renderer. This is what draws the final graph.
		render(d3.select("svg g"), g);

		

		// Center the graph
		//var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
		
		//svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
		svg.attr("height", g.graph().height + 40);
		svg.attr("width", g.graph().width + 40);


		svgGroup.selectAll("g.node")
		  .attr("title", function(v) { 
		  		return styleTooltip(g.node(v).rawLabel, g.node(v).description) 
		  })
		  .each(function(v) { 
		  		$(this).tipsy({ gravity: "w", opacity: 1, html: true }); 
		});



}

var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var dd = today.getDate();
	var mm = months[today.getMonth()]; //January is 0!
	var yyyy = today.getFullYear();

    m = checkTime(m);
    s = checkTime(s);
    dd = checkTime(dd);
    document.getElementById('clock').innerHTML = "<div class='time'>"+h+":"+m+":"+s+"</div><div class='date'>"+mm+" "+dd+", "+yyyy+"</date>";
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}