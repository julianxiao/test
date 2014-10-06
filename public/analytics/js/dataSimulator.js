function DataCtrl($scope) {

  

  var LIST_MAX = 15;

  $scope.dataStreams = [];

  $scope.addDataStream = function() {
    var newGuid = chance.guid();
    var accidentBool = chance.bool({likelihood: 30}); 
    var meanValue, devValue, priorityValue;
    if (accidentBool)
    {
        meanValue = chance.integer({min: 50, max: 100});
        priorityValue = chance.integer({min: 1, max: 4});
    }
    else
    {
        meanValue = chance.integer({min: 4, max: 50});        
    }

    devValue = chance.integer({min: 1, max: meanValue/4});

    $scope.dataStreams.push({guid:newGuid, mean:meanValue, dev:devValue, accident:accidentBool, priority: priorityValue, show:false});

  };

 $scope.increase = function (dataStream) {
   var meanValue, devValue, accidentBool, priorityValue; 
   meanValue = dataStream.mean + chance.integer({min: 10, max: 30});
   devValue = chance.integer({min: 1, max: meanValue/4});
   accidentBool = dataStream.accident;
   if (meanValue > 50 && accidentBool == false )
   {
    accidentBool = true;
    dataStream.priority = chance.integer({min: 1, max: 4});
  
   }

   dataStream.mean = meanValue;
   dataStream.dev = devValue;
   dataStream.accident = accidentBool;
 }

 $scope.decrease = function (dataStream) {
   var meanValue, devValue, accidentBool; 
   meanValue = dataStream.mean - chance.integer({min: 10, max: 30});
   meanValue = meanValue > 4 ? meanValue : 4;
   devValue = chance.integer({min: 1, max: meanValue/4});
   accidentBool = dataStream.accident;

   if (meanValue < 50 && accidentBool == true)
   {
    accidentBool = false;
    dataStream.priority = null;
  
   }

   dataStream.mean = meanValue;
   dataStream.dev = devValue;
   dataStream.accident = accidentBool;
 }

 $scope.update = function(){
     $scope.chart.push($scope.data.next()); 
 }

  $scope.chartSelectionChange = function () {

    if($scope.timerId)
    {
      clearInterval($scope.timerId);
    }
    $("#real-time-line").remove();
    $("#graphCanvas").append('<div id="real-time-line"  class="epoch category10 graph-canvas"></div>');
 
    $scope.data = new RealTimeData($scope.dataStreams);
    if (!$scope.data.layers) return;

    $scope.chart = $('#real-time-line').epoch({
        type: 'time.line',
        data: $scope.data.history(),
        axes: ['left', 'bottom', 'right']
    });

    $scope.timerId = setInterval($scope.update, 3000);
    $scope.chart.push($scope.data.next()); 

  };


    var RealTimeData = function(dataStreams) {
        var count = 0;
        this.layers = 0;
        selectedStreams = [];
        angular.forEach($scope.dataStreams, function(dataStream) {
          if (dataStream.show) 
          {
              selectedStreams.push(dataStream);
              count ++;
          }
        });
        this.dataStreams = selectedStreams;
        this.layers = count; 
        this.timestamp = ((new Date()).getTime() / 1000)|0;
    };

    RealTimeData.prototype.rand = function() {
      var values = [];
      var value, mean, dev;
      for (var i = 0; i < this.layers; i++)
      {
        
        meanValue = parseInt(this.dataStreams[i].mean);
        devValue = parseInt(this.dataStreams[i].dev)
        value = chance.normal({mean: meanValue, dev: devValue});
        values.push(value);
      }
        return values;
    };

    RealTimeData.prototype.history = function(entries) {
        if (typeof(entries) != 'number' || !entries) {
            entries = 60;
        }

        var history = [];
        for (var k = 0; k < this.layers; k++) {
            history.push({ values: [] });
        }

        for (var i = 0; i < entries; i++) {
          var values = this.rand();

          for (var j = 0; j < this.layers; j++) {
                history[j].values.push({time: this.timestamp, y: values[j]});
          }
          this.timestamp++;
        }

        return history;
    };

    RealTimeData.prototype.next = function() {
        var entry = [];
        var values = this.rand();
        for (var j = 0; j < this.layers; j++) {
          entry.push({ time: this.timestamp, y: values[j]});
        }

        this.timestamp++;
        return entry;
    }

    for (var i = 0; i < LIST_MAX; i++)
    {
      $scope.addDataStream();
    }

    var item1 = $scope.dataStreams[0];
    var item2 = $scope.dataStreams[1];

    item1.show = true;
    item2.show = true;




    $scope.data = new RealTimeData($scope.dataStreams);

    $scope.chart = $('#real-time-line').epoch({
        type: 'time.line',
        data: $scope.data.history(),
        axes: ['left', 'bottom', 'right']
    });
   $scope.timerId = setInterval($scope.update, 3000);
   $scope.update();  


}

