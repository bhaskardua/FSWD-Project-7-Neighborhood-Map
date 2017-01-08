// eslint-disable-next-line no-unused-vars
var map;
// eslint-disable-next-line no-unused-vars
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    /* global google */ 
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 1.280977,
            lng: 103.851357 
        },
        zoom: 13
    });
}
