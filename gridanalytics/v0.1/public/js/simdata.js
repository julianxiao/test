$(document).ready(function() {

    var feederData = [
        [],
        [],
        []
    ];
    var charts = [];

    var NUMBEROFCOLUMN = 7;

    var dateName = "";
    var dateLegend = Date.UTC(2014, 10, 28);


    var legendNamesColumns = [
        "VA",
        "IA",
        "VB",
        "IB",
        "VC",
        "IC",
        "IG"
    ];


    //$('#loading').hide();


    function populateDate(data) {

        for (var i = 0; i < NUMBEROFCOLUMN; i++) {
            feederData.push([]);
        }

        var lines = data.split('\n');


        $.each(lines, function(lineNo, line) {
            var items = line.split('\t');

            $.each(items, function(itemNo, item) {

                if (itemNo >= NUMBEROFCOLUMN) {
                    //skip
                } else {
                    if (item == "NaN" || item == "Inf") feederData[itemNo].push(null);
                    else {
                        feederData[itemNo].push(Number(item));
                    }
                }
            });


        });

    }

    function createSeriesData(index) {

        var dataSeries = [];
        var feederNumber = index + 1;
        var containerName = 'container4';

        for (var i = 0; i < NUMBEROFCOLUMN; i++) {
            //if (i== 15 || i == 31 || i == 47 ) continue;
            var seriesItem = {
                name: legendNamesColumns[i],
                pointInterval: 1,
                pointStart: 0,
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
                text: 'Current over 30 seconds'
            },

            xAxis: {
                type: 'linear',
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


    $(document).ajaxStart(function() {
        $("#loading").show();
    });
    $(document).ajaxStop(function() {
        $("#loading").hide();
    });



    function loadDateURL(index) {

        //    $('#loading').show();

        // var urlString = 'https://s3-us-west-2.amazonaws.com/eegl.mmm.com/uploads/selected+RMS+data/S02/' + dateIndex;
        //console.log(urlString);

        var urlString = index;
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

    var query = getQueryParams(document.location.search);

    if (query.id) {
        var id = query.id;
        var counter = id.replace('RMS Data\\', 'data/RMS%20Data/');
        counter = counter.replace('waveforms\\', 'data/waveforms/');
        loadDateURL(counter);
    }



    function getQueryParams(qs) {
        qs = qs.split("+").join(" ");

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while ((tokens = re.exec(qs))) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

});