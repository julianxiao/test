$(document).ready(function() {

    L.mapbox.accessToken = 'pk.eyJ1IjoianVueGlhbyIsImEiOiJndVE0ZmFFIn0.03lKIcO8ZCNinJs_StooUQ';
    var map = L.mapbox.map('map', 'junxiao.lk1a3ok2')
        .setView([35.163274, -88.582644], 12);



    var popup = new L.Popup({
        autoPan: false
    });

    // GeoJSON data: see http://geojson.org/ for the full description of this format.
    //
    // In these lines, we create some random points. This, of course, you can change:
    // instead, your data can be hardcoded as a Javascript object, or pulled in
    // from an external file with AJAX, or loaded from Mapbox automatically.
    var geoJsonData = {
        type: "FeatureCollection",
        features: []
    };

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var componentTypes = ['bank', 'entrance', 'industrial', 'rail'];
    var componentTypesNames = ['capacity bank', 'entrance', 'industrial', 'rail'];

    var i;
    for (i = 1; i < 10; i++) {
        geoJsonData.features.push({
            type: 'Feature',
            properties: {
                // The important part is here: that each feature has some property
                // that we refer to later on, in `pointToLayer`, that determines
                // the size of the scaled circle.
                count: 1 + Math.random() * 18,
                id: 'component' + i,
                name: 'component' + i,
                type: componentTypes[getRandomInt(0, 3)]
            },
            geometry: {
                type: 'Point',
                coordinates: [-88.582644 + (Math.random() - 0.5) / 5, 35.163274 + (Math.random() - 0.5) / 5]
            }
        });
    }

    for (i = 0; i < 20; i++) {
        geoJsonData.features.push({
            type: 'Feature',
            properties: {
                // The important part is here: that each feature has some property
                // that we refer to later on, in `pointToLayer`, that determines
                // the size of the scaled circle.
                count: 3 + Math.random() * 8,
                id: 'component0',
                name: 'Some line',
                type: "line"
            },
            geometry: {
                type: 'Point',
                coordinates: [-88.582644 + (Math.random() - 0.5) / 5, 35.163274 + (Math.random() - 0.5) / 5]
            }
        });
    }

    var mapLayerGroups = [];


    var geoJson = L.geoJson(geoJsonData, {
        pointToLayer: function(feature, latlng) {

            if (feature.properties.type !== 'line') {
                var smallIcon = L.mapbox.marker.icon({
                    'marker-size': 'large',
                    'marker-symbol': feature.properties.type,
                    'marker-color': getColor(feature.properties.count)
                });
                return L.marker(latlng, {
                    icon: smallIcon
                });
            }
            return L.circleMarker(latlng, {
                // Here we use the `count` property in GeoJSON verbatim: if it's
                // to small or two large, we can use basic math in Javascript to
                // adjust it so that it fits the map better.
                radius: feature.properties.count
            })
        },
        onEachFeature: onEachFeature,
        style: getStyle
    });

    function onEachFeature(feature, layer) {
        layer.on({
            mousemove: mousemove,
            mouseout: mouseout,
            click: zoomToFeature,
            mouseover: mymouseOver
        });

        var lg = mapLayerGroups[feature.properties.type];

        if (lg === undefined) {
            lg = new L.layerGroup();
            //add the layer to the map
            lg.addTo(map);
            //store layer
            mapLayerGroups[feature.properties.type] = lg;
        }

        //add the feature to the layer
        lg.addLayer(layer);
    }

    function getStyle(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'blue',
            fillColor: getColorByName(feature.properties.type),
            fillOpacity: 0.5
        };
    }

    function getColorByName(d) {
        return d == 'line' ? 'blue' :
            'red';
    }

    function getColor(d) {
        return d == 16 ? '#8c2d04' :
            d > 14 ? '#cc4c02' :
            d > 12 ? '#ec7014' :
            d > 10 ? '#fe9929' :
            d > 8 ? '#fec44f' :
            d > 6 ? '#fee391' :
            d > 4 ? '#fff7bc' :
            '#ffffe5';
    }

    var closeTooltip;

    function mymouseOver(e) {
        var layer = e.target;

        popup.setLatLng(e.latlng);
        popup.setContent('<div class="marker-title">' + 'ID: ' + layer.feature.properties.id + '</div>' +
            Math.floor(layer.feature.properties.count) + ' incidents during the last 30 days');

        if (!popup._map) popup.openOn(map);
        window.clearTimeout(closeTooltip);
    }


    function mousemove(e) {
        var layer = e.target;

        popup.setLatLng(e.latlng);
        popup.setContent('<div class="marker-title">' + 'ID: ' + layer.feature.properties.id + '</div>' +
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
        window.location.href = 'events.html?device=1';
    }

    function showLayer(id) {
        var lg = mapLayerGroups[id];
        map.addLayer(lg);
    }

    function hideLayer(id) {
        var lg = mapLayerGroups[id];
        map.removeLayer(lg);
    }

    /*

      var      filterLine = document.getElementById('filter-line'),
            filterAll = document.getElementById('filter-all');

        filterLine.onclick = function(e) {
            filterAll.className = '';
            this.className = 'active';
            // The setFilter function takes a GeoJSON feature object
            // and returns true to show it or false to hide it.
            hideLayer();

            return false;
        };

        filterAll.onclick = function() {
            filterLine.className = '';
            this.className = 'active';
            showAllLayer();
            return false;
        };
    */

    var filters = document.getElementById('filters');


    var checkboxes = [];
    // Create a filter interface.
    for (var i = 0; i < componentTypes.length; i++) {
        // Create an an input checkbox and label inside.
        var item = filters.appendChild(document.createElement('div'));
        var checkbox = item.appendChild(document.createElement('input'));
        var label = item.appendChild(document.createElement('label'));
        checkbox.type = 'checkbox';
        checkbox.id = componentTypes[i];
        checkbox.checked = true;
        // create a label to the right of the checkbox with explanatory text
        label.innerHTML = '&nbsp;' + componentTypesNames[i];
        label.setAttribute('for', componentTypes[i]);
        // Whenever a person clicks on this checkbox, call the update().
        checkbox.addEventListener('change', update);
        checkboxes.push(checkbox);
    }

    item = filters.appendChild(document.createElement('div'));
    checkbox = item.appendChild(document.createElement('input'));
    label = item.appendChild(document.createElement('label'));
    checkbox.type = 'checkbox';
    checkbox.id = 'line';
    checkbox.checked = true;
    // create a label to the right of the checkbox with explanatory text
    label.innerHTML = '&nbsp;line';
    label.setAttribute('for', 'line');
    // Whenever a person clicks on this checkbox, call the update().
    checkbox.addEventListener('change', update);
    checkboxes.push(checkbox);

    // This function is called whenever someone clicks on a checkbox and changes
    // the selection of markers to be displayed.
    function update() {
        var enabled = {};
        // Run through each checkbox and record whether it is checked. If it is,
        // add it to the object of types to display, otherwise do not.
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                showLayer(checkboxes[i].id);
            } else {
                hideLayer(checkboxes[i].id);
            }

        }
    }



});