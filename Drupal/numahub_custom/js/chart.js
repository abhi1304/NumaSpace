var oxygenLevel = 20;
var pressureLevel = 76;
var tempLevel = 70;
var speedLevel = 0;

function drawCharts(){
    drawOxygen();
    drawPressure();
    drawSpeed();
    drawTemperature();
}


function drawOxygen(){

        var chart = c3.generate({
            bindto: "#oxygen",
            data: {
                // iris data from R
                columns: [
                    ['Nitrogen', 100-oxygenLevel],
                    ['Oxygen', oxygenLevel],
                ],
                type : 'pie',
                labels: false,
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            legend: {
              show: false
            },

            color: {
                pattern: ['rgba(230,255,200,0.2)', 'rgba(230,255,200,0.4)']
            },
            size: {
                height: 100
            }
        });

        /*setTimeout(function () {
            chart.load({
                columns: [
                    ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                    ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                    ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                ]
            });
        }, 1500);

        setTimeout(function () {
            chart.unload({
                ids: 'data1'
            });
            chart.unload({
                ids: 'data2'
            });
        }, 2500);*/
}


function drawPressure(){
    var chart = c3.generate({
          bindto: "#pressure",
    data: {
        columns: [
            ['pressure', pressureLevel]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
            gauge: {
        //        label: {
        //            format: function(value, ratio) {
        //                return value;
        //            },
        //            show: false // to turn off the min/max labels.
        //        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        //    max: 100, // 100 is default
        //    units: ' %',
        //    width: 39 // for adjusting arc thickness
            },
            color: {
                pattern: ['rgba(0,255,0,0.6)', 'rgba(255,100,0,0.6)', 'rgba(0,0,255,0.6)', 'rgba(255,0,0,1)'], // the three color levels for the percentage values.
                threshold: {
        //            unit: 'value', // percentage is default
        //            max: 200, // 100 is default
                    values: [30, 60, 90, 100]
                }
            },
            size: {
                height: 100
            }
        });

       /* setTimeout(function () {
            chart.load({
                columns: [['data', 10]]
            });
        }, 1000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 50]]
            });
        }, 2000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 70]]
            });
        }, 3000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 0]]
            });
        }, 4000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 100]]
            });
        }, 5000); */
}


function drawSpeed(){
    var chart = c3.generate({
          bindto: "#speed",
    data: {
        columns: [
            ['speed', speedLevel]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
            gauge: {
        //        label: {
        //            format: function(value, ratio) {
        //                return value;
        //            },
        //            show: false // to turn off the min/max labels.
        //        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        //    max: 100, // 100 is default
        //    units: ' %',
        //    width: 39 // for adjusting arc thickness
            min: 0,
            max: 1000,
            },
            
            color: {
                pattern: ['rgba(0,255,0,0.6)', 'rgba(255,100,0,0.6)', 'rgba(0,0,255,0.6)', 'rgba(255,0,0,1)'], // the three color levels for the percentage values.
                threshold: {
        //            unit: 'value', // percentage is default
        //            max: 200, // 100 is default
                    values: [300, 600, 900, 1000]
                }
            },
            size: {
                height: 100
            }
        });

       /* setTimeout(function () {
            chart.load({
                columns: [['data', 10]]
            });
        }, 1000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 50]]
            });
        }, 2000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 70]]
            });
        }, 3000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 0]]
            });
        }, 4000);

        setTimeout(function () {
            chart.load({
                columns: [['data', 100]]
            });
        }, 5000); */
}


/*function drawSpeed(){
     $("#speed").html("<span class='miles'>"+getSpeed(speedLevel, 1000)+"</span>");
}*/

function getTemperature(value, max){
    var str = "<table class='gTable'>";
    var valueScore = (value*100)/max;
     str+="<td class='mylabel'>Temp &nbsp;</td>";
    for(var i=0; i<100;i+=5){

        if(i<=valueScore){
            str+="<td class='on'></td>";
        }else{
            str+="<td class='off'></td>";
        }
    }
    str+="<td class='mylabel'>"+value+" F</td>";
    return str+"</table>";
}
function getSpeed(value, max){
    var str = "<table class='gTable'>";
    var valueScore = (value*100)/max;
      str+="<td class='mylabel'>Speed </td>";
    for(var i=0; i<100;i+=5){

        if(i<=valueScore){
            str+="<td class='on'></td>";
        }else{
            str+="<td class='off'></td>";
        }
    }
    str+="<td class='mylabel'>"+value+" Miles/Hour</td>";
    return str+"</table>";
}

function drawTemperature(){
    $("#temperature").html("<span class='temp'>"+getTemperature(tempLevel, 100)+"</span>");

}