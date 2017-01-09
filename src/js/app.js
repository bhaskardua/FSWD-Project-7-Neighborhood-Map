var markersArray = [];
var map;
var infowindow;
// eslint-disable-next-line no-unused-vars
function initMap() {
    /* global google */
    var singapore = {
        lat: 1.280977,
        lng: 103.851357
    };

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: singapore,
        zoom: 16,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });
    
    // Places
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    google.maps.event.addListener(map, 'idle', function() {
        clearOverlays();
        service.nearbySearch({
            bounds: map.getBounds(),
            type: ['restaurant']
        }, callback);
        service.nearbySearch({
            bounds: map.getBounds(),
            type: ['bar']
        }, callback);
    });
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);
    });
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}
