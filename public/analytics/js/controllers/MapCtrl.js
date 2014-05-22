angular.module('MapCtrl', []).controller('MapController', function ($scope, $http) {

    $scope.tagline = 'Show Map!';


    var locations = [
        [30.274210, -97.742727],
        [30.286829, -97.751875],
        [30.275583, -97.751319],
        [30.274583, -97.753519],
    ];

    var dataPoints = [{
        title: 'Sensor 1',
        desc: 'This is the best sensor in the world!',
        lat: 30.274210,
        long: -97.72727
    }, {
        title: 'Sensor 2',
        desc: 'This sensor is so ...',
        lat: 30.274583,
        long: -97.752675
    }, {
        title: 'Sensor 3',
        desc: 'This is the second best sensor in the world!',
        lat: 30.275583,
        long: -97.751319
    }];



    var mapOptions = {
        center: new google.maps.LatLng(30.274595, -97.744654),
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false
    };


    var styleArray = [{
        "featureType": "administrative",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "water",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "transit",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "landscape",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "water",
        "stylers": [{
            "color": "#84afa3"
        }, {
            "lightness": 52
        }]
    }, {
        "stylers": [{
            "saturation": -17
        }, {
            "gamma": 0.36
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
            "color": "#3f518c"
        }]
    }]

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.map.setOptions({
        styles: styleArray
    });

    // Create a div to hold the control.
var controlDiv = document.createElement('div');

// Set CSS styles for the DIV containing the control
// Setting padding to 5 px will offset the control
// from the edge of the map.
controlDiv.style.padding = '5px';

// Set CSS for the control border.
var controlUI = document.createElement('div');
controlUI.style.backgroundColor = 'white';
controlUI.style.borderStyle = 'solid';
controlUI.style.borderWidth = '2px';
controlUI.style.cursor = 'pointer';
controlUI.style.textAlign = 'center';
controlUI.title = 'Click to set the map to Home';
controlDiv.appendChild(controlUI);

// Set CSS for the control interior.
var controlText = document.createElement('div');
controlText.style.fontFamily = 'Arial,sans-serif';
controlText.style.fontSize = '12px';
controlText.style.paddingLeft = '4px';
controlText.style.paddingRight = '4px';
controlText.innerHTML = '<strong>Home</strong>';
controlUI.appendChild(controlText);

// Setup the click event listener: simply set the map to center on Chicago
var Austin = new google.maps.LatLng(30.274595, -97.744654);

google.maps.event.addDomListener(controlUI, 'click', function() {
  $scope.map.setCenter(Austin);
  $scope.map.setZoom(15);

});

  controlDiv.index = 1;
  $scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);


    // This event listener will call addMarker() when the map is clicked.
    google.maps.event.addListener($scope.map, 'click', function (event) {
        addMarker(event.latLng);
    });


    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: $scope.map
        });
        $scope.markers.push(marker);
        $scope.counter++;
        var newSensorContent = '';
        $http.get("/analytics/infowindow.html")
            .success(function (data, status, headers, config) {
                newSensorContent = data.replace(/sensor id/i, 'Sensor id: 00<span id=sensorID>' + $scope.counter + '</span>');
            }).error(function (data, status, headers, config) {
                $scope.status = status;
            });

        marker.setAnimation(google.maps.Animation.BOUNCE);
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(newSensorContent);
            infoWindow.open($scope.map, marker);
        });

    }


    $scope.markers = [];
    $scope.counter = 0;

    var infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(infoWindow, 'domready', function () {

        document.getElementById("okButton").addEventListener('click', function (e) {
            var idName = document.getElementById("sensorID").innerHTML;
            var marker = $scope.markers[parseInt(idName) - 1];
            marker.setAnimation(null);
            infoWindow.close();
            e.preventDefault();

        }, false);

        document.getElementById("cancelButton").addEventListener('click', function (e) {
            var idName = document.getElementById("sensorID").innerHTML;
            var marker = $scope.markers[parseInt(idName) - 1];
            marker.setMap(null);
            marker = null;
            infoWindow.close();
            e.preventDefault();

        }, false);
    });

    /*
    var createMarker = function (info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            draggable: true,
            animation: google.maps.Animation.DROP,

            title: info.title
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < dataPoints.length; i++) {
        setTimeout(function (marker) {
            createMarker(marker);
        }, i * 500, dataPoints[i]);

    }
*/

});