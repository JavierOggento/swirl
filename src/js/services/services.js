angular.module('swirl.services', ['ngResource', 'ionic.utils', 'ionic.users', 'firebase'])

.factory('ItemsService', function($firebaseArray) {
    var itemsRef = new Firebase('https://shining-torch-3644.firebaseio.com/items');
    return $firebaseArray(itemsRef);
})

.factory('AuthService', function($firebaseAuth) {
    var usersRef = new Firebase('https://shining-torch-3644.firebaseio.com/users');
    return $firebaseAuth(usersRef);
})

.factory('DB', function() {
    return new Firebase('https://shining-torch-3644.firebaseio.com/');
})

.factory('Maps', function($compile) {
    function initialize($scope) {
        var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        return map;
    }

    //google.maps.event.addDomListener(window, 'load', initialize);

    return {
        initialize: initialize
    };
});
