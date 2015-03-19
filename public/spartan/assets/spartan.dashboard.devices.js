var client = new Keen({
  projectId: "5368fa5436bf5a5623000000",
  readKey: "3f324dcb5636316d6865ab0ebbbbc725224c7f8f3e8899c7733439965d6d4a2c7f13bf7765458790bd50ec76b4361687f51cf626314585dc246bb51aeb455c0a1dd6ce77a993d9c953c5fc554d1d3530ca5d17bdc6d1333ef3d8146a990c79435bb2c7d936f259a22647a75407921056"
});

Keen.ready(function(){



  function initialize() {
        var mapCanvas = document.getElementById('map-canvas');

        var mapOptions = {
        center: new google.maps.LatLng(30.274595, -97.744654),
        zoom: 13,
        streetViewControl: false,
        mapTypeControl: false,
        disableDefaultUI: true
        };

        var map = new google.maps.Map(mapCanvas, mapOptions);

        var locations = [
        [30.274210, -97.742727, 'Sensor 1'],
        [30.286829, -97.751875, 'Sensor 2'],
        [30.275583, -97.751319, 'Sensor 3'],
        [30.274583, -97.753519, 'Sensor 4'],
        ];

        var marker, i;

        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][0], locations[i][1]),
          title: locations[i][2],
          map: map
          });
        }

      }

  initialize();

});

angular.module('devicesApp', [])
  .controller('DevicesController', ['$scope', function($scope) {

    $scope.deviceList = [];

    var i;

    for (i = 0; i < 4; i++)
    {

      var formattedTime = moment().subtract(Math.round(Math.random() * 30), 'second').format('MMMM Do YYYY, h:mm:ss a');

      var temperatureData = chance.integer({min: 80, max: 90});
      var currentreadingData = chance.floating({min: 10, max: 100, fixed: 2});


      $scope.deviceList.push({deviceID: i+1, status: 'On', timestamp:formattedTime, temperature:temperatureData, currentreading:currentreadingData });
    }

    $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

  }]);