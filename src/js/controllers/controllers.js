angular.module('swirl.controllers', ['swirl.services', 'ionic.utils', 'ionic-material', 'events.service'])

.controller('AppCtrl', function($scope, user) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function() {
        $scope.user = user;
    });
})

.controller('TestCtrl', function($scope) {
    $scope.probame = 'hola';
})

.controller('EventsCtrl', function($scope, $ionicHistory, EventsService, ionicMaterialInk) {
    console.log($ionicHistory.currentView());
    $scope.events = [];

    $scope.today = function() {
        $scope.events = EventsService.get();
        console.log('today');
    };

    $scope.week = function() {
        $scope.events = EventsService.get();
    };

    ionicMaterialInk.displayEffect();
})

.controller('EventCtrl', function($scope, $ionicHistory, $stateParams, EventsService, ionicMaterialInk, $ionicLoading, Maps) {
    console.log($ionicHistory.currentView());

    EventsService.get($stateParams.eventId).then(function(value) {
        $scope.event = value;
    });

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.map = Maps.initialize($scope);
    //});

    $scope.centerOnMe = function() {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new window.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click');
    };

    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $ionicHistory, $state, ionicMaterialInk, ProfileService, user) {
    console.log($ionicHistory.currentView());

    if (!user) {
        $state.go('intro');
        return;
    }
    $scope.user = user;
    $scope.data = {
        fiestez: $scope.user.fiestez || 80
    };

    $scope.update = function() {
        ProfileService.attr('fiestez', $scope.data.fiestez);
    };

    $scope.logout = function() {
        ProfileService.logout();
        $state.go('intro');
    };

    $scope.$on('$ionicView.beforeLeave', function() {
        ProfileService.saveToDB();
    });

    ionicMaterialInk.displayEffect();
})

.controller('ListCtrl', function($scope, ItemsService, ionicMaterialInk) {
    $scope.items = ItemsService;
    $scope.addItem = function() {
        var name = prompt('What do you need to buy?');
        if (name) {
            $scope.items.$add({
                'name': name
            });
        }
    };
    ionicMaterialInk.displayEffect();
})

.controller('IntroCtrl', function($scope, $ionicSlideBoxDelegate, $ionicHistory, $state, AuthService, ProfileService, ionicMaterialInk) {
    if (ProfileService.get()) {
        $ionicHistory.nextViewOptions({
            historyRoot: true
        });
        $state.go('app.events');
    }

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.login = function() {

        function login() {
            AuthService.$authWithOAuthPopup('facebook').then(function() {
                console.log('logged in');
            }).catch(function(error) {
                if (error.code === 'TRANSPORT_UNAVAILABLE') {
                    AuthService.$authWithOAuthRedirect('facebook').then(function() {
                        // Users successfully logged in. We can log to the console
                        // since we’re using a popup here
                        console.log('logged in');
                    });
                } else {
                    // Another error occurred
                    console.log(error);
                }
            });
        }

        AuthService.$onAuth(function(authData) {
            if (authData === null) {
                console.log('Not logged in yet');
                login();
            } else {
                ProfileService.save(authData);
                $state.go('app.profile');
            }
        });
    };

    $scope.$on('$ionicView.enter', function() {
        $ionicSlideBoxDelegate.slide(0);
    });

    ionicMaterialInk.displayEffect();
});

