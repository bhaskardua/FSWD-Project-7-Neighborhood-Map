var map;
// eslint-disable-next-line no-unused-vars
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    /* global google */
    var singapore = {
        lat: 1.280977,
        lng: 103.851357
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: singapore,
        zoom: 12
    });
// eslint-disable-next-line no-unused-vars
    var marker = new google.maps.Marker({
        position: singapore,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content:  'Hello, World'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
