angular.module('MapCtrl', []).controller('MapController', function($scope) {

	$scope.tagline = 'Show Map!';	




    var mapOptions = {
        center: new google.maps.LatLng(30.274595, -97.744654),
        zoom: 15,
        disableDefaultUI: true
    };

    var styleArray = [{
        featureType: "all",
        stylers: [{
            saturation: -80
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            hue: "#00ffee"
        }, {
            saturation: 50
        }]
    }, {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road.local",
        stylers: [{
            color: '#9999aa'
        }]
    }];

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);


});