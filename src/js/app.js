// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('swirl', ['ionic', 'swirl.services', 'swirl.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

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
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',
      resolve: {
          user: function(Users) {
              return Users.get();
          }
      }
  })

  .state('intro', {
      url: '/intro',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
  })

  .state('app.events', {
      url: '/events',
      views: {
          'menuContent': {
              templateUrl: 'templates/events.html',
              controller: 'EventsCtrl'
          }
      }
  })

  .state('app.event', {
      url: '/events/:eventId',
      views: {
          'menuContent': {
              templateUrl: 'templates/event.html',
              controller: 'EventCtrl'
          }
      }
  })

  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
                user: function(Users) {
                    return Users.get();
                }
            }
        }
    }
  })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        }
    }
  })

  .state('app.list', {
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
});
