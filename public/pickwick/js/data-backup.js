$(document).ready(function (){

    var feederData = [[], [], []];
    var charts=[];

    var NUMBEROFCOLUMN = 48;


     var legendNames = ["Phase A: V RMS mean", 
    "V RMS max", 
    "V RMS min",
    "V Peak mean", 
    "V Peak max", 
    "V Peak min", 
    "I RMS mean", 
    "I RMS max", 
    "I RMS min",
    "I Peak mean", 
    "I Peak max", 
    "I Peak min", 
    "Phase",
    "V Distortion",
    "V Frequency",
    "Ave. point per cycle",
    "Phase B: V RMS mean", 
    "V RMS max", 
    "V RMS min",
    "V Peak mean", 
    "V Peak max", 
    "V Peak min", 
    "I RMS mean", 
    "I RMS max", 
    "I RMS min",
    "I Peak mean", 
    "I Peak max", 
    "I Peak min", 
    "Phase",
    "V Distortion",
    "V Frequency",
    "Ave. point per cycle",
    "Phase c: V RMS mean", 
    "V RMS max", 
    "V RMS min",
    "V Peak mean", 
    "V Peak max", 
    "V Peak min", 
    "I RMS mean", 
    "I RMS max", 
    "I RMS min",
    "I Peak mean", 
    "I Peak max", 
    "I Peak min", 
    "Phase",
    "V Distortion",
    "V Frequency",
    "Ave. point per cycle" 
    ];

     var legendNamesOnePhase = ["V RMS mean", 
    "V RMS max", 
    "V RMS min",
    "V Peak mean", 
    "V Peak max", 
    "V Peak min", 
    "I RMS mean", 
    "I RMS max", 
    "I RMS min",
    "I Peak mean", 
    "I Peak max", 
    "I Peak min", 
    "Phase",
    "V Distortion",
    "V Frequency",
    "Ave. point per cycle",

    var titleText = ['Feeder 1', 'Feeder 2', 'Feeder 3'];

    //$('#loading').hide();
    

    function populateDate(data, index) {

        for (var i=0; i< NUMBEROFCOLUMN; i++)
        {
             feederData[index].push([]);
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
                        if (item == "NaN" || item == "Inf") feederData[index][itemNo-1].push(null);
                        else 
                            {
                                feederData[index][itemNo-1].push(Number(item));
                            }
                    }
                });
                
                    
                });

    }  

    function createSeriesData(index) {

        var dataSeries = []; 
        var feederNumber = index + 1;
        var containerName = 'container' + feederNumber;

        for (var i = 0; i < NUMBEROFCOLUMN; i ++)
        {
            if (i== 15 || i == 31 || i == 47 ) continue;
            var seriesItem = {
                    name: legendNames[i],
                    pointInterval: 30 * 1000,
                    pointStart: Date.UTC(2014, 9, 14),
                    data: feederData[index][i],
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
                text: titleText[index]
            },

            xAxis: {
                type: 'datetime',
                minRange: 600000 // 1 minute
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

    function loadDateFile(dateIndex){

        var fileName = 'data/feeder' + dateIndex +'.dat';
        $.get(fileName, function(data) {
            // Split the lines
            console.log("load file success: ", fileName);
            feederData = [[], [], []];
            charts = [];

            populateDate(data, dateIndex);
            createSeriesData(dateIndex);
         });
    }

$( document ).ajaxStart(function() {
  $( "#loading" ).show();
});
    $( document ).ajaxStop(function() {
  $( "#loading" ).hide();
});

/* $("#loading").ajaxStart(function () {
    $(this).show();
 });

 $("#loading").ajaxStop(function () {
   $(this).hide();
 }); */

    function loadDateURL(dateIndex, feederNumber){

    //    $('#loading').show();

        var urlString = 'https://s3-us-west-2.amazonaws.com/eegl.mmm.com/uploads/process+data/' + dateIndex;
        console.log(urlString);
        $.get(urlString, function(data) {
            // Split the lines
            console.log("load file success: ", urlString);
      
      //      $('#loading').hide();
      
            feederData = [[], [], []];
            charts = [];

            populateDate(data, feederNumber);
            createSeriesData(feederNumber);
         });


    }

    $( "#datepicker" ).datepicker({
        onSelect: function( selectedDate ) {

//            var testDate = moment("2014 10 01", "YYYY MM DD"); 
//            if( testDate.isSame(selectedDate) )

            console.log(selectedDate);

           // var momentDate = moment(selectedDate);


            //var dateString = $('#datepicker').datepicker({ dateFormat: 'yy mm dd' }).val();
            //  https://s3-us-west-2.amazonaws.com/eegl.mmm.com/uploads/process+data/F03Day008

            var startDate = moment("2014 09 25", "YYYY MM DD"); 
            var daysDifference = -1 * startDate.diff(selectedDate, 'days');
            var pad = "000";
            var fileName1 = 'F01Day' + (pad+daysDifference).slice(-pad.length);
            var fileName2 = 'F02Day' + (pad+daysDifference).slice(-pad.length);
            var fileName3 = 'F03Day' + (pad+daysDifference).slice(-pad.length);

            console.log(fileName1);

            var hintText = document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Pinch the chart to zoom in';
            $( "#hint" ).html(hintText);

    /*        loadDateFile(0);
            loadDateFile(1);
            loadDateFile(2); */
            loadDateURL(fileName1, 0);
            loadDateURL(fileName2, 1);
            loadDateURL(fileName3, 2);


        }
    })





});