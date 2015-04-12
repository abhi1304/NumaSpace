
var App = function(){

    this.receivedEvent = function(acceleration) {
        var element = document.getElementById('accelerometer');
         /*element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
            'Acceleration Y: ' + acceleration.y         + '<br />' +
            'Acceleration Z: ' + acceleration.z         + '<br />' +
            'Timestamp: '      + acceleration.timestamp + '<br />'; */
         this.getDelta(acceleration.x, acceleration.y, acceleration.z);   

    }
    
    this.counter = 0;

    this.lastX = [0,0,0,0,0];
    this.lastY = [0,0,0,0,0];
    this.lastZ = [0,0,0,0,0];

    this.thresholdX = 4;
    this.thresholdY = 4;
    this.thresholdZ = 4;

    this.thresholdXMax = 12;
    this.thresholdYMax = 12;
    this.thresholdZMax = 12;
       
    this.latch = 0;

    this.fireEvent  = function(event){
           this.latch = 10;
           //var element =  document.getElementById('label');
           //element.innerHTML = event;

           // call the mainControllerMethod

           if(event == "UP"){
                mainController.onMoveBtn("Move","Up","Moving Up","right");
           }else if(event == "DOWN"){
                mainController.onMoveBtn("Move","Down","Moving Down","right");
           }else if(event == "RIGHT"){
                mainController.onMoveBtn("Move","Right","Moving Right","right");
           }else{
                mainController.onMoveBtn("Move","Left","Moving Left","right");
           }

           setTimeout(function(){
                 element.innerHTML = '';
           }, 1500);
            
    }   

    this.printGesture  = function(direction, value){
         if(direction == "X" && Math.abs(value)>this.thresholdX && Math.abs(value)<this.thresholdXMax){
                if(value>0){
                   this.fireEvent('LEFT');
                }else{
                    this.fireEvent('RIGHT');
                }
            }else if (direction == "Y"  && Math.abs(value)>this.thresholdY && Math.abs(value)<this.thresholdYMax){
                if(value>0){
                    this.fireEvent('DOWN');
                }else{
                    this.fireEvent('UP');
                }
            }else if (direction == "Z"  && Math.abs(value)>this.thresholdZ && Math.abs(value)<this.thresholdZMax){
                /*if(value>0){
                    this.fireEvent('BACKWARD');
                }else{
                    this.fireEvent('FORWARD');
                }*/
            }

            
    }   

    this.getDelta = function(ax1, ay1, az1){

            if(this.latch==0){
                    // Collect
                    ax = ax1 - this.lastXAcc;
                    ay = ay1 - this.lastYAcc;
                    az = az1 - this.lastZAcc;

                    console.log("A X "+ax);
                    console.log("A Y "+ay);
                    console.log("A Z "+az);

                    this.lastXAcc = ax1;
                    this.lastYAcc = ay1;
                    this.lastZAcc = az1;

                    if(Math.abs(ax)<1){
                        ax = 0;
                    }
                    if(Math.abs(ay)<1){
                        ay = 0;
                    }
                    if(Math.abs(az)<1){
                        az = 0;
                    }

                    this.lastX.shift();
                    this.lastY.shift();
                    this.lastZ.shift();

                    this.lastX[this.lastX.length] = ax==0?0:(ax>0?1:-1);
                    this.lastY[this.lastX.length] = ay==0?0:(ay>0?1:-1);
                    this.lastZ[this.lastX.length] = az==0?0:(az>0?1:-1);
                    
                    var deltaX =  this.lastX.reduce(function(a, b) { return a + b });
                    var deltaY =  this.lastY.reduce(function(a, b) { return a + b });
                    var deltaZ =  this.lastZ.reduce(function(a, b) { return a + b });

                    deltaX = deltaX*deltaX*deltaX;
                    deltaY = deltaY*deltaY*deltaY;
                    deltaZ = deltaZ*deltaZ*deltaZ;
                    
                    console.log("Delta X "+deltaX);
                    console.log("Delta Y "+deltaY);
                    console.log("Delta Z "+deltaZ);
                    
                    var absX = Math.abs(deltaX);
                    var absY = Math.abs(deltaY);
                    var absZ = Math.abs(deltaZ);
                    // Bigger wins

                    if(absX>absY){
                        if(absX>absZ){
                            this.printGesture('X', deltaX);
                        }else{
                            this.printGesture('Z', deltaZ);
                        }
                    }else{
                        if(absY>absZ){
                             this.printGesture('Y', deltaY);
                        }else{
                            this.printGesture('Z', deltaZ);
                        }
                    }
                    
                   
                    
            }else{
                this.latch--;
                if(this.latch==0){
                    this.lastX = [0,0,0,0,0];
                    this.lastY = [0,0,0,0,0];
                    this.lastZ = [0,0,0,0,0];
                }
            }        
    
    }

};


var State = function(){
    this.name = "";

    this.getNextState = function(){
        if(this.name = ""){

        }

    }

}
