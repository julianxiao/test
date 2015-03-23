var client = new Keen({
  projectId: "5368fa5436bf5a5623000000",
  readKey: "3f324dcb5636316d6865ab0ebbbbc725224c7f8f3e8899c7733439965d6d4a2c7f13bf7765458790bd50ec76b4361687f51cf626314585dc246bb51aeb455c0a1dd6ce77a993d9c953c5fc554d1d3530ca5d17bdc6d1333ef3d8146a990c79435bb2c7d936f259a22647a75407921056"
});

Keen.ready(function(){

});

  function getParams(selector) {
    var params = Keen.utils.parseParams(document.location.search);
    return (selector) ? params[selector] : params;
  }


angular.module('faultApp', ['simplePagination'])
  .controller('FaultController', ['$scope', 'Pagination', 'filterFilter', function($scope, Pagination, filterFilter) {

    $scope.faultEvents = [];

    var i;

    for (i = 0; i < 100; i++)
    {

      var formattedTime = moment().subtract(Math.round(Math.random() * 30), 'days')
      .add(Math.round(Math.random() * 10), 'hours').add(Math.round(Math.random() * 60), 'minutes')
      .add(Math.round(Math.random() * 60), 'second').format();

      var temperatureData = chance.integer({min: 50, max: 90});
      var deviceIDData = 'Sensor ' + chance.integer({min: 1, max: 4});
      var currentreadingData = chance.floating({min: 10, max: 100, fixed: 2});

      var methaneData = chance.integer({min: 10, max: 100});
      var CO2Data = chance.integer({min: 10, max: 100});
      var H2SData = chance.integer({min: 10, max: 100});
      var waterData = chance.floating({min: 0, max: 10, fixed: 1});
      var humidityData = chance.integer({min: 10, max: 100});
      var currentreadingDataA = chance.floating({min: 10, max: 100, fixed: 2});
      var currentreadingDataB= chance.floating({min: 10, max: 100, fixed: 2});
      var currentreadingDataC = chance.floating({min: 10, max: 100, fixed: 2});

      $scope.faultEvents.push({deviceID: deviceIDData, status: 'On', timestamp:formattedTime, temperature:temperatureData, currentreading:currentreadingData,
        currentreadingA:currentreadingDataA,currentreadingB:currentreadingDataB,currentreadingC:currentreadingDataC,
        humidity:humidityData, CO2:CO2Data, H2S:H2SData, water:waterData,humidity:humidityData, methane: methaneData });
    }

    $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    $scope.pagination = Pagination.getNew(10);
    $scope.pagination.numPages = Math.ceil($scope.faultEvents.length/$scope.pagination.perPage);


    $scope.$watch('filterDevice', function(term) {  
        // Create filtered 
        $scope.filtered = filterFilter($scope.faultEvents, term);  

        // Then calculate noOfPages
        $scope.pagination.numPages = Math.ceil($scope.filtered.length/$scope.pagination.perPage);

    })

    var params = getParams();

    if (params.device) {
      $scope.filterDevice = 'Sensor ' +  params.device;
    }



  }]);