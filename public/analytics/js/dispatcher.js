$(document).ready(function (){

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
        lat: 30.274533,
        long: -97.752275
    }, {
        title: 'Sensor 2',
        desc: 'This sensor is so ...',
        lat: 30.272583,
        long: -97.752175
    }, {
        title: 'Sensor 2',
        desc: 'This sensor is so ...',
        lat: 30.273583,
        long: -97.748675
    }, {
        title: 'Sensor 2',
        desc: 'This sensor is so ...',
        lat: 30.271563,
        long: -97.758675
    }, {
        title: 'Sensor 2',
        desc: 'This sensor is so ...',
        lat: 30.277183,
        long: -97.722075
    }, {
        title: 'Sensor 2',
        desc: 'This sensor is so ...',
        lat: 30.278583,
        long: -97.742675
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

    var map = new google.maps.Map(document.getElementById('google_map'), mapOptions);

    map.setOptions({
        styles: styleArray
    });

  var currentMark = null;

    var markers = [];
    var counter = 0;

    /*

    var infoWindow = new google.maps.InfoWindow({ maxWidth: 800 });

    $.get("infowindow.html", function (data)
        {
                infoWindow.setContent(data);
        }); */



    
    var createMarker = function (info) {

        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(info.lat, info.long),
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: info.title
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        

     /*   google.maps.event.addListener(marker, 'click', function () {
            currentMark = marker;
            infoWindow.open(map, marker);
        }); */

        google.maps.event.addListener(marker, 'click', function () {
            currentMark = marker;
/*
            var pinColor = "FE7569";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(0,0), 
                map: map,
                icon: pinImage,
                shadow: pinShadow
            }); 

           // marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

        */
            $('#readingsModal').modal('show');
        }); 

        markers.push(marker);

    }

    for (i = 0; i < dataPoints.length; i++) {
        setTimeout(function (marker) {
            createMarker(marker);
        }, i * 100, dataPoints[i]);

    }

    $( "#linkSettings" ).click(function(e) {
        $('#readingsModal').modal('hide');
            $('#settingsModal').modal('show');
            e.preventDefault();
    });


    var pollServerForNewMail = function () {
    $.getJSON('/api/checkTrigger', function (response) {
    if (response.trigger) {
        bootbox.dialog({
  message: "Power failure reported at sensor node 29a8c!",
  title: "Fault incident",
  buttons: {

    danger: {
      label: "Ok",
      className: "btn-danger",
      callback: function() {
         window.location.href = "inspector.html";
      }
    }
  }
});
     }
    });
    };

// setInterval(pollServerForNewMail, 3000);





});