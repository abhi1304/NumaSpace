<!doctype html>

<meta charset="utf-8">
<title>NumaHub Space</title>
<link rel="stylesheet" href="/sites/all/modules/numahub_custom/libraries/dagre/tipsy.css">
<link rel="stylesheet" href="/sites/all/modules/numahub_custom/css/custom.css">
<link rel="stylesheet" href="/sites/all/modules/numahub_custom/libraries/c3/c3.min.css">
<!-- <link href='http://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'> -->
<script src="/sites/all/modules/numahub_custom/libraries/jquery/jquery.backgroundPosition.js"></script>
<script src="/sites/all/modules/numahub_custom/libraries/d3/scripts/d3.min.js"></script>
<script src="/sites/all/modules/numahub_custom/libraries/c3/c3.min.js"></script>
<script src="/sites/all/modules/numahub_custom/libraries/dagre/dagre-d3.js"></script>
<script src="/sites/all/modules/numahub_custom/libraries/dagre/tipsy.js"></script>
<script src="/sites/all/modules/numahub_custom/libraries/maphilight/jquery.maphilight.min.js"></script>
<script src="/sites/all/modules/numahub_custom/js/buttons.js"></script>
<script src="/sites/all/modules/numahub_custom/js/talker.js"></script>
<script src="/sites/all/modules/numahub_custom/js/speech.js"></script>
<script src="/sites/all/modules/numahub_custom/js/chart.js"></script>
<script src="/sites/all/modules/numahub_custom/js/chat.js"></script>



<script src="/sites/all/modules/numahub_custom/js/core.js"></script>
 <script src="http://www.webglearth.com/v2/api.js"></script>
<script src="http://<?php print $_SERVER['SERVER_ADDR'] ?>:8180/socket.io/socket.io.js"></script>

<style>

.page-header{
  display: none;
}

#navbar{
   background: rgba(0,0,0,0.3);
}

.screengraph{
  background: rgba(0,0,0,0.3);
}

.main-container{
  width: 100%;
  padding: 0px;
  margin-top: -20px;
}

#navbar{
  margin-bottom: 0px !important;
  padding-bottom: 0px;
}

.mybutton{
  background: rgba(0,0,0,0.3);
  color: #ffffff;
  border: none;
  padding: 5px;
  font-size: 20px;
}

.videopanel{
  padding: 0px;
  margin: 0px;

}

.mypanel{
  background: rgba(0,0,0,0.3);
  color: #ffffff;
  border: none;
  padding: 0px;
  margin: 0px;
   text-align: center;
}
.mypanel .panel-heading{
  background: rgba(0,0,0,0.3);
  color: #ffffff;
  font-size: 16px;
  padding: 2px;
  text-align: center;
}

.statscontainer .col-md-3{
  margin: 0px !important;
  padding: 0px !important;
  text-align: center;
}

.temp,.miles{
  font-size: 50px;
  clear: both;
  display: block;
  text-align: center;
  width: 100%;
}

#background {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 100;
}

#midground {
  background: url(/sites/all/modules/numahub_custom/images/midground.png) repeat 20% 20%;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 100;
}

#foreground {
  background: url(/sites/all/modules/numahub_custom/images/foreground.png) repeat 90% 110%;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 200;
}

td.on, td.off{
  width: 10px;
  height: 1px;
  border-right: 1px solid rgba(230,255,200,0.3);
}

td.on{
  background: rgba(230,255,200,0.7);

}

.gTable{
  border: rgba(230,255,200,0.3) !important;
}

.gTable td{
  height: 40px;
}
.mylabel{
  width: 80px !important;
  font-size: 14px !important;
  margin-top: 25px !important;
  color: rgba(230,255,200,0.7);
}

#myHand{
  width: 60px;
  height: 60px;
  padding-right: 10px;
  margin-left: -10px;
  background: rgba(255,255,255,0.3);
  border-radius: 100px;
   margin-top: 25px !important;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
   
}


#clock{
  z-index: 999;
}

.weatherAreacss{
  color: #ffffff;
  width: 700px;
  margin: auto;
  background: rgba(0,0,0,0.4);
}

.weatherAreacss td, .weatherAreacss tr, .weatherAreacss table, .weatherAreacss th{
  border: none !important;
}
.weatherAreacss h3{
   color: #ffffff;
}

.weathericon{
  -webkit-filter: invert(100%);
  width: 150px;
  height: 150px;
  margin-top: 10px;
}

.weathericon.img-rounded{
  -webkit-filter: invert(100%);
  width: 40px;
  height: 40px;
}
</style>
<div style="width: 100%">
<input type="hidden" id="server_name" value="http://<?php print $_SERVER['SERVER_ADDR'] ?>:8180">

<?php
  global $user;

?>
<input type="hidden" id="user" value="<?php print $user->name ?>">


<div class="container mainContainer">
   <div class="col-md-9 viewport-container"  style="padding: 0px;">
    <div>
     
    </div>
     
        <div class="svg-container" style="margin-top: 10px;">
          <center>
             <a class="navbar-brand col-md-3" id="clock" href="#"></a>
             <div id="danger"><img src="/sites/all/modules/numahub_custom/images/danger.gif"></div>
            <div id="earth_div"></div>
            <div id="weather_div"></div>
            <div id="floorplan_div">
          <br><br>
           <div id="background"></div>
  <div id="midground"></div>
  <div id="foreground"></div>

        <img class="floorplan" src="/sites/all/modules/numahub_custom/images/floorpl.png" border="0" width="1024" height="640" orgWidth="1024" orgHeight="640" usemap="#simple" alt="" />
        <map name="simple" id="simpleMap">
        <area  id="1A" title="Room 1A" href="#" shape="rect" coords="556,228,651,284" style="outline:none;" target="_self"     />
        <area  id="2A" title="Room 2A" shape="rect" coords="463,227,555,283" style="outline:none;" target="_self"     />
        <area  id="3A" title="Room 3A" shape="rect" coords="368,226,462,283" style="outline:none;" target="_self"     />
        <area  id="4A" title="Room 4A" shape="rect" coords="286,227,366,283" style="outline:none;" target="_self"     />
        <area  id="1B" title="Room 1B" shape="rect" coords="554,283,651,340" style="outline:none;" target="_self"     />
        <area  id="2B" title="Room 2B" shape="rect" coords="464,285,556,340" style="outline:none;" target="_self"     />
        <area  id="3C" title="Room 3B" shape="rect" coords="367,284,462,339" style="outline:none;" target="_self"     />
        <area  id="4D" title="Room 4B" shape="rect" coords="285,285,369,340" style="outline:none;" target="_self"     />
        <area  id="winga" title="Wing A" href="#" shape="poly" coords="246,52,274,59,403,187,429,197,469,201,533,214,640,225,278,224,247,211" style="outline:none;" target="_self"     />
        <area  id="wingb" title="Wing B"  href="#" shape="poly" coords="246,355,276,341,640,341,532,354,475,368,423,371,403,380,278,505,246,514" style="outline:none;" target="_self"     />
        <area  id="enginea" title="Engine A"  href="#" shape="poly" coords="174,204,227,210,272,226,267,262,194,268,174,271" style="outline:none;" target="_self"     />
        <area  id="engineb" title="Engine B" href="#" shape="poly" coords="174,296,266,303,275,343,244,355,200,363,172,363" style="outline:none;" target="_self"     />
        <area  id="deck" title="Deck"  href="#" shape="poly" coords="650,227,753,246,753,321,649,340" style="outline:none;" target="_self"     />
        <area  id="ignition" title="Ignition"  href="#" shape="poly" coords="105,224,15,193,25,222,13,239,26,254,17,269,28,281,16,293,30,303,18,320,32,330,20,341,32,353,19,369,35,375,21,389,107,356,130,283" style="outline:none;" target="_self"     />
        </map>


            </div>
            <svg id="svg-canvas" width="100%" height="100%"></svg>
            <div style="clear:both;"></div>
            <br>


           
        </center>
      </div>

    </div>
    
  <div class="col-md-3" style="padding: 0px;">
        <div class="panel-body videopanel">
            <iframe width="100%" height="200px" src="https://www.youtube.com/embed/iBU6oskkNEc" frameborder="0" allowfullscreen></iframe>
            <!-- <iframe width="100%" height="200" src="http://www.ustream.tv/embed/6540154?v=3&amp;wmode=direct" scrolling="no" frameborder="0" style="border: 0px none transparent;"> </iframe> -->
        </div>
        <div class="panel-body chatpanel">
                    <ul class="chat">
                        
                    </ul>

                </div>
               
               
            </div>

    </div>

   
</div>  
<nav class="navbar navbar-fixed-bottom left-side-panel" style="margin-bottom: 124px; background: none">
<div class="" role="group" aria-label="..." style="width: 300px; float: left;">
      
        
      <button type="button" class="btn btn-default  mybutton" id="leftButton"><i class="glyphicon glyphicon-circle-arrow-left"></i></button>
      <button type="button" class="btn btn-default  mybutton" id="rightButton"><i class="glyphicon glyphicon-circle-arrow-right"></i></button>
      <button type="button" class="btn btn-default  mybutton" id="upButton"><i class="glyphicon glyphicon-circle-arrow-up"></i></button>
       <button type="button" class="btn btn-default mybutton" id="downButton"><i class="glyphicon glyphicon-circle-arrow-down"></i></button>
        <button type="button" class="btn btn-default  mybutton" id="zoominButton"><i class="glyphicon glyphicon-plus-sign"></i> </button>
         <button type="button" class="btn btn-default mybutton" id="zoomoutButton"><i class="glyphicon glyphicon-minus-sign"></i> </button>
         <button type="button" class="btn btn-default mybutton" id="mapButton"><i class="glyphicon  glyphicon-globe"></i> </button>
       <button type="button" class="btn btn-default mybutton" id="floorButton"><i class="glyphicon  glyphicon-plane"></i> </button>
        <button type="button" class="btn btn-default mybutton" id="weatherButton"><i class="glyphicon glyphicon-cloud"></i> </button>
   
   </div>
</nav>  
<div id="myHand"><img src="/sites/all/modules/numahub_custom/images/hand.png"></div>

<nav class="navbar navbar-default navbar-fixed-bottom screengraph">
    <div id="measurements" class="statscontainer" style="margin-bottom: 0px;">
              <div class="col-md-2">
                <div class="panel panel-default mypanel">
                
                  <div class="panel-body">
                    <div id="oxygen"></div>
                  </div>
                  
                </div>
              </div>
              <div class="col-md-2">
                  <div class="panel panel-default mypanel">
                   
                    <div class="panel-body">
                       <div id="pressure"></div>
                    </div>
                    
                  </div>

              </div>
              <div class="col-md-2">
                  <div class="panel panel-default mypanel">
                    
                      <div class="panel-body">
                         <div id="speed"></div>
                      </div>
                    </div>

              </div>
              <div class="col-md-3">
                  <div class="panel panel-default mypanel">
                    
                      <div class="panel-body">
                          <div id="temperature"></div>
                      </div>
                    </div>

              </div>
              

              <div class="col-md-3">
                  <div class="panel panel-default mypanel">
                      <div class="panel-body">
        <div class="input-group">
            <textarea id="input" type="text" class="form-control input-sm" placeholder="Type your message here..." >Hi</textarea>
            <span class="input-group-btn">
                <button class="btn btn-warning btn-sm" id="submitButton">
                    Send</button>

            </span>
            <div style="clear:both;"></div>

      
    </div> <br>
             <button type="button" id="startListening" class="btn btn-sm btn-info">Start Listening</button>
            <button type="button" id="stopListening" class="btn btn-sm btn-danger">Stop Listening</button>
      
                      </div>
                    </div>

              </div>




         </div>  
    
</nav>
  
 
 <script>
 jQuery(function($) {
  window.$ = $;
    initialize($);
     var speechMaker = new SpeechMaker();
    speechMaker.init();
    $("#danger").hide();
 });



 </script>
</div>
</html>