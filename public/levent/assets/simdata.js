$(document).ready(function (){

    var feederData = [[], [], []];
    var charts=[];

    var NUMBEROFCOLUMN = 9;

    var dateName = "";
    var dateLegend = Date.UTC(2014, 10, 28);


     var legendNamesColumns = ["Current A", 
    "Current B", 
    "Current C",
    "Current D",
    "IA", 
    "IB", 
    "IC", 
    "IG", 
    "PA", 
    "PB",
    "PC"
        ];


    //$('#loading').hide();
    

    function populateDate(data) {

        for (var i=0; i< NUMBEROFCOLUMN; i++)
        {
             feederData.push([]);
        }

        var lines = data.split('\n');


        $.each(lines, function(lineNo, line) {
            var items = line.split('\t');
        
                $.each(items, function(itemNo, item) {
                     
                   if (itemNo == 0 || itemNo > NUMBEROFCOLUMN)
                    {
                        //skip
                    } 

                    else 
                    {
                        if (item == "NaN" || item == "Inf") feederData[itemNo-1].push(null);
                        else 
                            {
                                feederData[itemNo-1].push(Number(item));
                            }
                    }
                });
                
                    
                });

    }  

    function createSeriesData(index) {

        var dataSeries = []; 
        var feederNumber = index + 1;
        var containerName = 'container4';

        for (var i = 0; i < 3; i ++)
        {
            //if (i== 15 || i == 31 || i == 47 ) continue;
            var seriesItem = {
                    name: legendNamesColumns[i],
                    pointInterval: 4,
                    pointStart: dateLegend,
                    data: feederData[i],
                    visible: false
                    }
            dataSeries.push(seriesItem);
        }

        dataSeries[0].visible = true;
        //dataSeries[5].visible = true;
        //dataSeries[10].visible = true;


        var options = {
            chart: {
                renderTo: containerName,
                // type: 'line',
               // type: 'spline',
                zoomType: 'x'
            },
            title: {
                text: 'Some visualization'
            },

            xAxis: {
                type: 'datetime',
                minRange: 400 // 400 miliseconds
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            }, 
            scrollbar: {
            enabled: true
            },
            credits: {
            enabled: false
            },
    
            series: dataSeries
        }     

         charts[index] = new Highcharts.Chart(options);
     }


$( document ).ajaxStart(function() {
  $( "#loading" ).show();
});
    $( document ).ajaxStop(function() {
  $( "#loading" ).hide();
});




    function loadDateURL(dateIndex){

    //    $('#loading').show();

       // var urlString = 'https://s3-us-west-2.amazonaws.com/eegl.mmm.com/uploads/selected+RMS+data/S02/' + dateIndex;
        //console.log(urlString);

        var urlString = 'assets/simdata.txt';
        $.get(urlString, function(data) {
            // Split the lines
            console.log("load file success: ", urlString);
      
      //      $('#loading').hide();
      
            feederData = [];
            charts = [];

            populateDate(data);
            createSeriesData(0);
            //createSeriesData(1);
            //createSeriesData(2);
            //createAllData();
         });


    }

    loadDateURL('');


    });

