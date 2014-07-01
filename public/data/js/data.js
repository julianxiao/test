function DataCtrl($scope) {
  $scope.dataStreams = [
    {guid:'EBE7EB4E-F66E-5EC5-8B72-9EC6C8AAE34A', mean:'40', dev:'15', done:true},
    {guid:'314EC76B-A17B-5E2B-A252-737E7FAC0D1C', mean:'30', dev:'10', done:false},
    {guid:'1CD69122-7D55-5923-AEF0-0C874E17B8C6', mean:'20', dev:'5', done:true}];

  $scope.addDataStream = function() {
    var newGuid = chance.guid();
    $scope.dataStreams.push({guid:newGuid, mean:$scope.dataStreamMean, dev:$scope.dataStreamDev, done:false});
    $scope.dataStreamMean = '';
    $scope.dataStreamDev = '';

  };

  $scope.running = function() {
    var count = 0;
    angular.forEach($scope.dataStreams, function(dataStream) {
      count += dataStream.done ? 0 : 1;
    });
    return $scope.dataStreams.length - count;
  };

  $scope.archive = function() {
    var oldDataStreams = $scope.dataStreams;
    $scope.dataStreams = [];
    angular.forEach(oldDataStreams, function(dataStream) {
      if (dataStream.done) $scope.dataStreams.push(dataStream);
    });
  };

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

    $scope.timerId = setInterval($scope.update, 5000);
    $scope.chart.push($scope.data.next()); 

  };


    var RealTimeData = function(dataStreams) {
        var count = 0;
        this.layers = 0;
        selectedStreams = [];
        angular.forEach($scope.dataStreams, function(dataStream) {
          if (dataStream.done) 
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

    $scope.data = new RealTimeData($scope.dataStreams);

    $scope.chart = $('#real-time-line').epoch({
        type: 'time.line',
        data: $scope.data.history(),
        axes: ['left', 'bottom', 'right']
    });
        $scope.timerId = setInterval($scope.update, 5000);


    //$scope.timerId = setInterval(function() { $scope.chart.push($scope.data.next()); }, 5000);
   $scope.update();  
}

