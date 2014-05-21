angular.module('MapCtrl', []).controller('MapController', function($scope) {

	$scope.tagline = 'Show Map!';	


    var locations = [
        [30.274210, -97.742727],
        [30.286829, -97.751875],
        [30.275583, -97.751319],
        [30.274583, -97.753519],
    ];

    var dataPoints = [
    {
        title : 'Sensor 1',
        desc : 'This is the best sensor in the world!',
        lat : 30.274210,
        long : -97.72727
    },
    {
        title : 'Sensor 2',
        desc : 'This sensor is so ...',
        lat : 30.274583,
        long : -97.752675
    },
    {
        title : 'Sensor 3',
        desc : 'This is the second best sensor in the world!',
        lat : 30.275583,
        long : -97.751319
    }
    ];



    var mapOptions = {
        center: new google.maps.LatLng(30.274595, -97.744654),
        zoom: 15,
        disableDefaultUI: true
    };

    var styleArray2 = [{
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
            saturation: 0
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

    var styleArray = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.map.setOptions({
                styles: styleArray
            });


    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.title
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < dataPoints.length; i++){
        createMarker(dataPoints[i]);
    }

});