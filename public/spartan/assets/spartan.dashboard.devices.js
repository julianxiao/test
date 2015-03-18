var client = new Keen({
  projectId: "5368fa5436bf5a5623000000",
  readKey: "3f324dcb5636316d6865ab0ebbbbc725224c7f8f3e8899c7733439965d6d4a2c7f13bf7765458790bd50ec76b4361687f51cf626314585dc246bb51aeb455c0a1dd6ce77a993d9c953c5fc554d1d3530ca5d17bdc6d1333ef3d8146a990c79435bb2c7d936f259a22647a75407921056"
});

Keen.ready(function(){

});

angular.module('devicesApp', [])
  .controller('DevicesController', ['$scope', function($scope) {

    $scope.deviceList = [];

    var i;

    for (i = 0; i < 4; i++)
    {
/*
      var date = new Date(chance.timestamp()*1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds(); */



      var formattedTime = moment().subtract(Math.round(Math.random() * 30), 'second').format('MMMM Do YYYY, h:mm:ss a');

      var temperatureData = chance.integer({min: 80, max: 90});
      var currentreadingData = chance.floating({min: 10, max: 100, fixed: 2});


      $scope.deviceList.push({deviceID: i+1, status: 'On', timestamp:formattedTime, temperature:temperatureData, currentreading:currentreadingData });
    }

    $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

  }]);