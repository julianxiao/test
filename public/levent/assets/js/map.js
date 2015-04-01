$(document).ready(function (){

L.mapbox.accessToken = 'pk.eyJ1IjoianVueGlhbyIsImEiOiJndVE0ZmFFIn0.03lKIcO8ZCNinJs_StooUQ';
var map = L.mapbox.map('map', 'junxiao.lk1a3ok2')
    .setView([35.163274, -88.582644], 12);

 var popup = new L.Popup({ autoPan: false });

// GeoJSON data: see http://geojson.org/ for the full description of this format.
//
// In these lines, we create some random points. This, of course, you can change:
// instead, your data can be hardcoded as a Javascript object, or pulled in
// from an external file with AJAX, or loaded from Mapbox automatically.
var geoJsonData = {
  type: "FeatureCollection",
  features: []
};
for (var i = 0; i < 30; i++) {
    geoJsonData.features.push({
        type: 'Feature',
        properties: {
            // The important part is here: that each feature has some property
            // that we refer to later on, in `pointToLayer`, that determines
            // the size of the scaled circle.
            count: Math.random() * 18,
            name: 'component' + i
        },
        geometry: {
            type: 'Point',
            coordinates: [-88.582644 + (Math.random() -0.5)/5, 35.163274 + (Math.random() -0.5)/5]
        }
    });
}

var geoJson = L.geoJson(geoJsonData, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            // Here we use the `count` property in GeoJSON verbatim: if it's
            // to small or two large, we can use basic math in Javascript to
            // adjust it so that it fits the map better.
            radius: feature.properties.count
        })
    },
    onEachFeature: onEachFeature,
    style: getStyle
}).addTo(map);

function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }

function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'red',
          fillColor: getColor(feature.properties.count),
          fillOpacity: 0.5
       };
  }

function getColor(d) {
      return d > 16 ? '#8c2d04' :
          d > 14  ? '#cc4c02' :
          d > 12  ? '#ec7014' :
          d > 10  ? '#fe9929' :
          d > 8   ? '#fec44f' :
          d > 6   ? '#fee391' :
          d > 4   ? '#fff7bc' :
          '#ffffe5';
  }

 var closeTooltip;

  function mousemove(e) {
      var layer = e.target;

      popup.setLatLng(e.latlng);
      popup.setContent('<div class="marker-title">' + layer.feature.properties.name + '</div>' +
          Math.floor(layer.feature.properties.count) + ' incidents during the last 30 days');

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 3,
          opacity: 0.3,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      geoJson.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      //map.fitBounds(e.target.getBounds());
      var layer = e.target;
      window.location.href  = 'events.html?device=1';
  }

});