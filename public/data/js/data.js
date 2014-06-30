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
      if (!dataStream.done) $scope.dataStreams.push(dataStream);
    });
  };


    var RealTimeData = function(layers) {
        this.layers = layers;
        this.timestamp = ((new Date()).getTime() / 1000)|0;
    };

    RealTimeData.prototype.rand = function(meanValue, devValue) {
      var value = chance.normal({mean: meanValue, dev: devValue}); 
        return value;
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

                history[0].values.push({time: this.timestamp, y: this.rand(30, 15)});
                history[1].values.push({time: this.timestamp, y: this.rand(20, 5)});


            this.timestamp++;
        }

        return history;
    };

    RealTimeData.prototype.next = function() {
        var entry = [];

          entry.push({ time: this.timestamp, y: this.rand(30, 15) });
          entry.push({ time: this.timestamp, y: this.rand(20, 5) });

        this.timestamp++;
        return entry;
    }

    var data = new RealTimeData(2);

    var chart = $('#real-time-line').epoch({
        type: 'time.line',
        data: data.history(),
        axes: ['left', 'bottom', 'right']
    });

    setInterval(function() { chart.push(data.next()); }, 1000);
    chart.push(data.next());
}

