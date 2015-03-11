$(document).ready(function (){

    var feederData = [[], [], []];
    var charts=[];

    var NUMBEROFCOLUMN = 48;

    var dateName = "";
    var dateLegend = Date.UTC(2014, 10, 28);


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
    "Ave. point per cycle"
    ];

    var titleText = ['Phase A', 'Phase B', 'Phase C', 'All phases'];

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
        var containerName = 'container' + feederNumber;

        for (var i = 0; i < NUMBEROFCOLUMN/3; i ++)
        {
            if (i== 15 || i == 31 || i == 47 ) continue;
            var seriesItem = {
                    name: legendNamesOnePhase[i],
                    pointInterval: 30 * 1000,
                    pointStart: dateLegend,
                    data: feederData[i + index * 16],
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

    function createAllData() {

        var dataSeries = []; 
        var containerName = 'container4';

        for (var i = 0; i < NUMBEROFCOLUMN; i ++)
        {
            if (i== 15 || i == 31 || i == 47 ) continue;
            var seriesItem = {
                    name: legendNames[i],
                    pointInterval: 30 * 1000,
                    pointStart: dateLegend,
                    data: feederData[i],
                    visible: false
                    }
            dataSeries.push(seriesItem);
        }

        dataSeries[0].visible = true;
        dataSeries[15].visible = true;
        dataSeries[30].visible = true;


        var options = {
            chart: {
                renderTo: containerName,
                // type: 'line',
               // type: 'spline',
                zoomType: 'x'
            },
            title: {
                text: titleText[3]
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

         charts[3] = new Highcharts.Chart(options);
     }

 /*   function loadDateFile(dateIndex){

        var fileName = 'data/feeder' + dateIndex +'.dat';
        $.get(fileName, function(data) {
            // Split the lines
            console.log("load file success: ", fileName);
            feederData = [[], [], []];
            charts = [];

            populateDate(data, dateIndex);
            createSeriesData(dateIndex);
         });
    } */

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

    function loadDateURL(dateIndex){

    //    $('#loading').show();

        var urlString = 'https://s3-us-west-2.amazonaws.com/eegl.mmm.com/uploads/process+data/' + dateIndex;
        //console.log(urlString);
        $.get(urlString, function(data) {
            // Split the lines
            console.log("load file success: ", urlString);
      
      //      $('#loading').hide();
      
            feederData = [];
            charts = [];

            populateDate(data);
            createSeriesData(0);
            createSeriesData(1);
            createSeriesData(2);
            createAllData();
         });


    }

    $( "#datepicker" ).datepicker({

        dateFormat: "yy-mm-dd",
        onSelect: function( selectedDate ) {

//            var testDate = moment("2014 10 01", "YYYY MM DD"); 
//            if( testDate.isSame(selectedDate) )

            //console.log(selectedDate);

            var hintText = document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Pinch the chart to zoom in';
            $( "#hint" ).html(hintText);

           // var momentDate = moment(selectedDate);


            //var dateString = $('#datepicker').datepicker({ dateFormat: 'yy mm dd' }).val();
            //  https://s3-us-west-2.amazonaws.com/eegl.mmm.com/uploads/process+data/F03Day008

          //  dateLegend = selectedDate;

          // $( "#datepicker" ).datepicker( "option", "dateFormat", "yy-mm-dd" );


           var selectedDateMoment = moment($(this).val());

            dateLegend = Date.UTC(selectedDateMoment.year(), selectedDateMoment.month(), selectedDateMoment.date());

            var startDate = moment("2014 09 25", "YYYY MM DD"); 
            var daysDifference = -1 * startDate.diff(selectedDateMoment, 'days');
            var pad = "000";

            dateName = "" + (pad+daysDifference).slice(-pad.length);

            /*

            var fileName1 = 'F01Day' + (pad+daysDifference).slice(-pad.length);
            var fileName2 = 'F02Day' + (pad+daysDifference).slice(-pad.length);
            var fileName3 = 'F03Day' + (pad+daysDifference).slice(-pad.length); */

            //console.log(fileName1);

    /*        loadDateFile(0);
            loadDateFile(1);
            loadDateFile(2); */

            //var myselect = $("#feederSelect");
            //myselect[0].selectedIndex = 0;

            var selectedValues = $('#feederSelect').val();

            var fileName = 'F0' + selectedValues[0] + 'Day' + dateName;
           loadDateURL(fileName);

     //       myselect.selectmenu('refresh');


    /*
            loadDateURL(fileName1, 0);
            loadDateURL(fileName2, 1);
            loadDateURL(fileName3, 2); */


        }
    })

    $('#feederSelect').change(function() {
        if(dateName == '') return;

         var feederNumber = $(this).val();

         var fileName = 'F0' + feederNumber + 'Day' + dateName;

         //console.log(fileName);
         loadDateURL(fileName);


    });





});