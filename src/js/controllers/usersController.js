angular.module('users.controller', ['firebase', 'users.service'])

.controller('UsersCtrl', function($scope, UsersService, ionicMaterialInk, $ionicTabsDelegate) {
    $scope.users = [];

    $scope.following = function() {
        /*$ionicTabsDelegate.select(0);
        $scope.users = [];*/
        UsersService.following();
    };

    $scope.followers = function() {
        /*$ionicTabsDelegate.select(1);
        $scope.users = [];*/
        UsersService.followers();
    };

    $scope.$on('userAdded', function(event, user) {
        $scope.users.push(user);
    });

    ionicMaterialInk.displayEffect();
});