
var App = function(){

    this.receivedEvent = function(acceleration) {
        var element = document.getElementById('accelerometer');
        this.getDelta(acceleration);   

    }
    
    this.counter = 0;

    this.lastX = [0,0,0,0,0];
    this.lastY = [0,0,0,0,0];
    this.lastZ = [0,0,0,0,0];

    this.latch = 0;

    this.stopChat = function(){
        this.chatStarted  = false;
        mainController.gestureOff();
    }    

    this.startChat = function(){
        this.chatStarted  = true;
        this.latchCount = 5; // Ignore first two events
        mainController.gestureOn();
    }

    this.latchCount = 0;

    this.fireEvent  = function(event){
           if(this.latchCount>0){
                this.latchCount--;
                return;
           }
           this.latch = 10;
           if(this.chatStarted){
                mainController.onMoveBtn("Move", event, event, event);
           }
    }   

    this.thresholdX = 5;
    this.thresholdY = 7;
    this.thresholdZ = 6;

    this.thresholdXMax = 12;
    this.thresholdYMax = 12;
    this.thresholdZMax = 12;

    this.printGesture  = function(direction, value){
     if(direction == "X" && Math.abs(value)>this.thresholdX){
            if(value>0){
               this.fireEvent('Left');
            }else{
                this.fireEvent('Right');
            }
        }else if (direction == "Z"  && Math.abs(value)>this.thresholdZ){
            if(value>0){
                this.fireEvent('Backward');
            }else{
                this.fireEvent('Forward');
            }
        }else if (direction == "Y"  && Math.abs(value)>this.thresholdY){
            if(value>0){
                this.fireEvent('Up');
            }else{
                this.fireEvent('Down');
            }
        }
            
    }   

    this.firstTime = true;
    this.filterConstant = 0;
    this.smoothing = 1000;
    this.acceleration  = {x:0, y:0, z:0};       // or whatever is desired
    
    this.lastUpdate = new Date;

    this.smoothedValue = function(acceleration){
      var now = new Date;
      var elapsedTime = (now - this.lastUpdate);

      this.acceleration.x += elapsedTime * ( acceleration.x - this.acceleration.x ) / this.smoothing;
      this.acceleration.y += elapsedTime * ( acceleration.y - this.acceleration.y ) / this.smoothing;
      this.acceleration.z += elapsedTime * ( acceleration.z - this.acceleration.z ) / this.smoothing;
      
      this.lastUpdate = now;
      return this.acceleration;
    }
    this.accthereshold = 0.2;
    this.getDelta = function(acceleration){

            if(this.latch==0){
                    // Collect

                    var accelerationUpdated = this.smoothedValue(acceleration);
                    console.log(accelerationUpdated);

                    if(this.firstTime){
                        this.lastXAcc = accelerationUpdated.x;
                        this.lastYAcc = accelerationUpdated.y;
                        this.lastZAcc = accelerationUpdated.z;
                        this.firstTime = false;
                    }

                    ax = accelerationUpdated.x-this.lastXAcc;
                    ay = accelerationUpdated.y-this.lastYAcc;
                    az = accelerationUpdated.z-this.lastZAcc;

                    console.log("A X "+ax);
                    console.log("A Y "+ay);
                    console.log("A Z "+az);

                    this.lastXAcc = accelerationUpdated.x;
                    this.lastYAcc = accelerationUpdated.y;
                    this.lastZAcc = accelerationUpdated.z;

                    if(Math.abs(ax)<this.accthereshold){
                        ax = 0;
                    }
                    if(Math.abs(ay)<(this.accthereshold)){
                        ay = 0;
                    }
                    if(Math.abs(az)<this.accthereshold){
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