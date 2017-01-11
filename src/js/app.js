var map;
var infowindow;
var service;
var FS_API_URLRoot = 'https://api.foursquare.com/v2/venues/search?';
/* global google ko */

// ViewModel
function ListingsViewModel() {

    var self = this;

    self.markersArray = ko.observableArray([]);
    self.markerFilterText = ko.observable();

    var singapore = {
        lat: 1.280977,
        lng: 103.851357
    };

    // Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: singapore,
        zoom: 16,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });

    // Places search

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

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
            placeName: place.name,
            filtered: ko.observable(true),
        });

        self.markersArray.push(marker);

        google.maps.event.addListener(marker, 'click', self.markerClick);
    }

    // eslint-disable-next-line no-unused-vars
    self.markerClickKO = function(data) {
        self.markerClick.call(data);
    };

    // Click event responder
    self.markerClick = function () {
        var marker = this;
        infowindow.setContent(marker.placeName);
        infowindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);

        //Foursqaure API URL preparation
        var params = {
            ll            : marker.position.lat() + ',' + marker.position.lng(),
            intent        : 'match',
            query         : marker.placeName,
            client_id     : '42K0YU5ZOS1HHB4OA0OYAMURDGN0FPH5DEQOT0XLJHWXPJ0O',
            client_secret : '2TBSDEB0WLTOEJF1C3KVLAPNAEGYYL1JF2XGCN3KGCP413EL',
            v             : '20170111'
        };

        // eslint-disable-next-line no-undef
        var FS_API_URL = FS_API_URLRoot + $.param(params);

        // AJAX call to Foursqaure API
        // eslint-disable-next-line no-undef
        $.ajax(FS_API_URL).done(function(response) {

            var name           = response.response.venues[0].name;
            var address        = response.response.venues[0].location.address;
            var crossStreet    = response.response.venues[0].location.crossStreet;
            var postalCode     = response.response.venues[0].location.postalCode;
            var formattedPhone = response.response.venues[0].contact.formattedPhone;
            var url            = response.response.venues[0].url;

            var content = '<strong style="font-size:14px">' + name + '</strong>' + '<br><br>' +
                '<em>' + (address ? address : '') + '</em>' + '<br>' +
                '<em>' + (crossStreet ? crossStreet : '') + '</em>' + '<br>' +
                '<em>' + (postalCode ? postalCode : '') + '</em>' + '<br><br>' +
                '<u>' + (formattedPhone ? formattedPhone : '') + '</u>' + '<br><br>' +
                '<a href="' + url + '">' + (url ? url : '') + '</a><br><br>' +
                '<em style="font-size:9px">Data provided by <a href="https://www.foursquare.com" target="_blank">Foursquare</a></em>';

            infowindow.setContent(content);

        }).fail(function() {
            var content = '<strong>' + marker.name + '</strong>' + '<br><br>' +
                '<em>Foursquare data not accessible</em>';

            infowindow.setContent(content);

        });
    };

    // Filter function
    self.markersFilter = function() {
        if (self.markerFilterText()) {
            for (var i = 0; i < self.markersArray().length; i++ ) {
                if (!~self.markersArray()[i].placeName.toLowerCase().indexOf(self.markerFilterText().toLowerCase())) {
                    self.markersArray()[i].setMap(null);
                    self.markersArray()[i].filtered(false);
                }
            }
        } else {
            clearFilter();
        }
    };

    // User Helper functions
    
    function clearFilter() {
        for (var i = 0; i < self.markersArray().length; i++ ) {
            self.markersArray()[i].setMap(map);
            self.markersArray()[i].filtered(true);
        }
    }

    function clearOverlays() {
        for (var i = 0; i < self.markersArray().length; i++ ) {
            self.markersArray()[i].setMap(null);
        }
        self.markersArray([]);
    }
}

// Callback function for the async Google Maps API call
// eslint-disable-next-line
function initView() {
    ko.applyBindings(new ListingsViewModel());
}
