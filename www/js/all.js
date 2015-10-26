// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'use strict';

angular.module('swirl', ['ionic', 'swirl.services', 'swirl.controllers', 'users.controller']).run(["$ionicPlatform", function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            window.StatusBar.styleDefault();
        }
    });
}]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        resolve: {
            user: ["ProfileService", function user(ProfileService) {
                return ProfileService.get();
            }]
        }
    }).state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    }).state('app.events', {
        url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/events.html',
                controller: 'EventsCtrl'
            }
        }
    }).state('app.event', {
        url: '/events/:eventId',
        views: {
            'menuContent': {
                templateUrl: 'templates/event.html',
                controller: 'EventCtrl'
            }
        }
    }).state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    user: ["ProfileService", function user(ProfileService) {
                        return ProfileService.get();
                    }]
                }
            }
        }
    }).state('app.users', {
        url: '/users',
        views: {
            'menuContent': {
                templateUrl: 'templates/users.html',
                controller: 'UsersCtrl'
            }
        }
    }).state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    }).state('app.list', {
        url: '/list',
        views: {
            'menuContent': {
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/intro');
}]);
'use strict';

angular.module('swirl.controllers', ['swirl.services', 'ionic.utils', 'ionic-material', 'events.service']).controller('AppCtrl', ["$scope", "user", function ($scope, user) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function () {
        $scope.user = user;
    });
}]).controller('TestCtrl', ["$scope", function ($scope) {
    $scope.probame = 'hola';
}]).controller('EventsCtrl', ["$scope", "$ionicHistory", "EventsService", "ionicMaterialInk", function ($scope, $ionicHistory, EventsService, ionicMaterialInk) {
    console.log($ionicHistory.currentView());
    $scope.events = [];

    $scope.today = function () {
        $scope.events = EventsService.get();
        console.log('today');
    };

    $scope.week = function () {
        $scope.events = EventsService.get();
    };

    ionicMaterialInk.displayEffect();
}]).controller('EventCtrl', ["$scope", "$ionicHistory", "$stateParams", "EventsService", "ionicMaterialInk", "$ionicLoading", "Maps", function ($scope, $ionicHistory, $stateParams, EventsService, ionicMaterialInk, $ionicLoading, Maps) {
    console.log($ionicHistory.currentView());

    EventsService.get($stateParams.eventId).then(function (value) {
        $scope.event = value;
    });

    //google.maps.event.addDomListener(window, 'load', function() {
    $scope.map = Maps.initialize($scope);
    //});

    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.map.setCenter(new window.google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function () {
        alert('Example of infowindow with ng-click');
    };

    ionicMaterialInk.displayEffect();
}]).controller('ProfileCtrl', ["$scope", "$ionicHistory", "$state", "ionicMaterialInk", "ProfileService", "user", function ($scope, $ionicHistory, $state, ionicMaterialInk, ProfileService, user) {
    console.log($ionicHistory.currentView());

    if (!user) {
        $state.go('intro');
        return;
    }
    $scope.user = user;
    $scope.data = {
        fiestez: $scope.user.fiestez || 80
    };

    $scope.update = function () {
        ProfileService.attr('fiestez', $scope.data.fiestez);
    };

    $scope.logout = function () {
        ProfileService.logout();
        $state.go('intro');
    };

    $scope.$on('$ionicView.beforeLeave', function () {
        ProfileService.saveToDB();
    });

    ionicMaterialInk.displayEffect();
}]).controller('ListCtrl', ["$scope", "ItemsService", "ionicMaterialInk", function ($scope, ItemsService, ionicMaterialInk) {
    $scope.items = ItemsService;
    $scope.addItem = function () {
        var name = prompt('What do you need to buy?');
        if (name) {
            $scope.items.$add({
                'name': name
            });
        }
    };
    ionicMaterialInk.displayEffect();
}]).controller('IntroCtrl', ["$scope", "$ionicSlideBoxDelegate", "$ionicHistory", "$state", "AuthService", "ProfileService", "ionicMaterialInk", function ($scope, $ionicSlideBoxDelegate, $ionicHistory, $state, AuthService, ProfileService, ionicMaterialInk) {
    if (ProfileService.get()) {
        $ionicHistory.nextViewOptions({
            historyRoot: true
        });
        $state.go('app.profile');
    }

    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };

    $scope.login = function () {

        function login() {
            AuthService.$authWithOAuthPopup('facebook').then(function () {
                console.log('logged in');
            })['catch'](function (error) {
                if (error.code === 'TRANSPORT_UNAVAILABLE') {
                    AuthService.$authWithOAuthRedirect('facebook').then(function () {
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

        AuthService.$onAuth(function (authData) {
            if (authData === null) {
                console.log('Not logged in yet');
                login();
            } else {
                ProfileService.save(authData);
                $state.go('app.profile');
            }
        });
    };

    $scope.$on('$ionicView.enter', function () {
        $ionicSlideBoxDelegate.slide(0);
    });

    ionicMaterialInk.displayEffect();
}]);
"use strict";
'use strict';

angular.module('users.controller', ['firebase', 'users.service']).controller('UsersCtrl', ["$scope", "UsersService", "ionicMaterialInk", "$ionicTabsDelegate", function ($scope, UsersService, ionicMaterialInk, $ionicTabsDelegate) {
    $scope.users = [];

    $scope.following = function () {
        /*$ionicTabsDelegate.select(0);
        $scope.users = [];*/
        UsersService.following();
    };

    $scope.followers = function () {
        /*$ionicTabsDelegate.select(1);
        $scope.users = [];*/
        UsersService.followers();
    };

    $scope.$on('userAdded', function (event, user) {
        $scope.users.push(user);
    });

    ionicMaterialInk.displayEffect();
}]);
'use strict';

angular.module('events.service', ['firebase']).factory('EventsService', ["$firebaseArray", "$firebaseObject", function ($firebaseArray, $firebaseObject) {
    var ref = new Firebase('https://shining-torch-3644.firebaseio.com/events');
    function get(id) {
        if (id) {
            // Should I be using loaded here?
            return $firebaseObject(ref.child(id)).$loaded();
        } else {
            return $firebaseArray(ref);
        }
    }

    return {
        get: get
    };
}]);
'use strict';

angular.module('profile.service', []).factory('ProfileService', ["$localStorage", function ($localStorage) {
    var ref = new Firebase('https://shining-torch-3644.firebaseio.com/users'),
        user;

    function get() {
        return user || $localStorage.getObject('user');
    }

    function attr(prop, value) {
        if (value) {
            user[prop] = value;
            $localStorage.setObject('user', user);
            return this;
        } else {
            return user[prop];
        }
        return $localStorage.getObject('user').prop;
    }

    function saveToDB() {
        var uid = $localStorage.get('uid');
        ref.child(uid).set(user, function (error) {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                console.log('Data saved');
            }
        });
    }

    function save(userData) {
        var userObj;
        if (userData) {
            if (userData.provider === 'facebook') {
                userObj = formatFacebook(userData);
            }
        }

        userObj.userData.fiestez = 50;

        $localStorage.setObject('user', userObj.userData);
        $localStorage.set('uid', userData.uid);

        ref.child(userData.uid).set(userObj.userData, function (error) {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                console.log('Data saved');
            }
        });
    }

    function logout() {
        $localStorage.setObject('user', null);
        $localStorage.set('uid', null);
    }

    function formatFacebook(userRawData) {
        var gender, userData;

        userData = {
            firstName: userRawData.facebook.cachedUserProfile.first_name,
            lastName: userRawData.facebook.cachedUserProfile.last_name,
            facebookURL: userRawData.facebook.cachedUserProfile.link,
            profileImage: userRawData.facebook.profileImageURL,
            facebook: {
                accessToken: userRawData.facebook.accessToken,
                id: userRawData.facebook.id,
                token: userRawData.token
            }
        };

        gender = userRawData.facebook.cachedUserProfile.gender;
        if (gender) {
            userData.gender = userRawData.facebook.cachedUserProfile.gender === 'male' ? 'Hombre' : 'Mujer';
        }

        return {
            userData: userData
        };
    }

    user = get();

    return {
        get: get,
        attr: attr,
        logout: logout,
        save: save,
        saveToDB: saveToDB
    };
}]);
'use strict';

angular.module('swirl.services', ['ngResource', 'ionic.utils', 'profile.service', 'firebase']).factory('ItemsService', ["$firebaseArray", function ($firebaseArray) {
    var itemsRef = new Firebase('https://shining-torch-3644.firebaseio.com/items');
    return $firebaseArray(itemsRef);
}]).factory('AuthService', ["$firebaseAuth", function ($firebaseAuth) {
    var usersRef = new Firebase('https://shining-torch-3644.firebaseio.com/users');
    return $firebaseAuth(usersRef);
}]).factory('DB', function () {
    return new Firebase('https://shining-torch-3644.firebaseio.com/');
}).factory('Maps', ["$compile", function ($compile) {
    function initialize($scope) {
        var myLatlng = new window.google.maps.LatLng(43.07493, -89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };
        var map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new window.google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new window.google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        window.google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        return map;
    }

    return {
        initialize: initialize
    };
}]);
'use strict';

angular.module('users.service', ['ionic.utils', 'firebase', 'profile.service']).factory('UsersService', ["$firebaseArray", "$localStorage", function ($firebaseArray, $localStorage) {
    var uid = $localStorage.get('uid'),
        ref = new Firebase('https://shining-torch-3644.firebaseio.com/');

    // Just for testing purposes
    function getAll() {
        return $firebaseArray(ref.child('users'));
    }

    function followers() {
        // fetch a list of Mary's groups
        ref.child('users/' + uid + '/followers').on('child_added', function (snapshot) {
            // for each group, fetch the name and print it
            var userKey = snapshot.key();
            ref.child('users/' + userKey).once('value', function (snapshot) {
                console.log(snapshot.val() + ' follows me');
            });
        });
    }

    function following() {
        ref.child('users/' + uid + '/following').on('child_added', function (snapshot) {
            // for each group, fetch the name and print it
            var userKey = snapshot.key();
            ref.child('users/' + userKey).once('value', function (snapshot) {
                console.log('I\'m following: ' + snapshot.val());
            });
        });
        /*return $firebaseArray(ref.child(uid).child('followers'));*/
    }

    return {
        getAll: getAll,
        followers: followers,
        following: following
    };
}]);
'use strict';

angular.module('ionic.utils', []).factory('$localStorage', ['$window', function ($window) {
    return {
        set: function set(key, value) {
            $window.localStorage[key] = value;
        },
        get: function get(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function setObject(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function getObject(key) {
            try {
                return JSON.parse($window.localStorage[key]);
            } catch (e) {
                return null;
            }
        }
    };
}]);
//# sourceMappingURL=all.js.map
