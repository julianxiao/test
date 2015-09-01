var urlBase = 'https://ebams.firebaseio.com/assets';


angular.module('project', ['restangular', 'ngRoute', 'flash', 'firebase']).
config(function($routeProvider, RestangularProvider) {
  $routeProvider.
  when('/', {
    controller: ListCtrl,
    templateUrl: 'list.html'
  }).
  when('/map/:assetID', {
    controller: MapCtrl,
    templateUrl: 'map.html'
  }).
  when('/edit/:assetID', {
    controller: EditCtrl,
    templateUrl: 'detail.html'
  }).
  when('/new', {
    controller: CreateCtrl,
    templateUrl: 'detail.html'
  }).
  otherwise({
    redirectTo: '/'
  });

  RestangularProvider.setBaseUrl('/');

});



function MapCtrl($scope, Restangular, $firebaseArray, $firebaseObject, $route) {

  /*  var ref = new Firebase(urlBase);
    $scope.items = $firebaseArray(ref);
    var geoLocation = $route.current.params.geoID; */
  var id = $route.current.params.assetID;
  var ref = new Firebase(urlBase + "/" + id);
  var syncObject = $firebaseObject(ref);
  $scope.item = syncObject;

  $scope.item.$loaded()
    .then(function() {
      var geoLocation = $scope.item.geo;

      var commaPos = geoLocation.indexOf(',');
      var coordinatesLat = parseFloat(geoLocation.substring(0, commaPos));
      var coordinatesLong = parseFloat(geoLocation.substring(commaPos + 1, geoLocation.length));

      L.mapbox.accessToken = 'pk.eyJ1IjoianVueGlhbyIsImEiOiJndVE0ZmFFIn0.03lKIcO8ZCNinJs_StooUQ';
      var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([coordinatesLat, coordinatesLong], 15);

      //var coordinates = document.getElementById('coordinates');

      var marker = L.marker([coordinatesLat, coordinatesLong], {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f86767'
        }),
        draggable: true
      }).addTo(map);

      // every time the marker is dragged, update the coordinates container
      marker.on('dragend', ondragend);

      // Set the initial marker coordinate on load.
      ondragend();

      function ondragend() {
        var m = marker.getLatLng();

        $scope.item.geo = '' + m.lat + ',' + m.lng;

        $scope.item.$save().then(function() {

        });
        // coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
      }

    })
    .catch(function(err) {
      console.error(err);
    });


}


function ListCtrl($scope, Restangular, Flash, $firebaseArray) {
  var ref = new Firebase(urlBase);
  $scope.items = $firebaseArray(ref);

  var handleCallback = function(msg) {

    var data = JSON.parse(msg.data);

    // console.log(message);

    var message = '<strong>Alert! </strong> User ' + data.user + ' attempt to ' + data.action + ' at asset ' + data.asset + ' on ' + data.createdAt;  
      //  var message = '<strong>Well done!</strong> You successfully read this important alert message.';
    Flash.create('warning', message, 'custom-class');

  };

  var source = new EventSource('/api/statusUpdate');
  source.addEventListener('message', handleCallback, false);

}

function CreateCtrl($scope, $location, Restangular, $firebaseArray) {


  $scope.item = {
    'uiud': null,
    'status': 'locked',
    'description': null,
    'geo': '30.267153, -97.74306079999997]'
  };

  var ref = new Firebase(urlBase);
  var list = $firebaseArray(ref);

  $scope.save = function() {
    console.log($scope.item);
    list.$add($scope.item)
      .then(function(item) {
        $location.path('/list');
      });
  };
}


function EditCtrl($scope, $location, Restangular, $firebaseObject, $route) {
  var id = $route.current.params.assetID;

  var ref = new Firebase(urlBase + "/" + id);
  var syncObject = $firebaseObject(ref);
  $scope.item = syncObject;


  $scope.destroy = function() {
    $scope.item.$remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.item.$save().then(function() {
      $location.path('/');
    });
  };
}