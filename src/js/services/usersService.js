angular.module('users.service', ['ionic.utils', 'firebase', 'profile.service'])

.factory('UsersService', function($firebaseArray, $localStorage) {
    var uid = $localStorage.get('uid'),
        ref = new Firebase('https://shining-torch-3644.firebaseio.com/');

    // Just for testing purposes
    function getAll() {
        return $firebaseArray(ref.child('users'));
    }

    function followers($scope) {
        // fetch a list of Mary's groups
        ref.child('users/' + uid + '/followers').on('child_added', function(snapshot) {
            // for each group, fetch the name and print it
            var userKey = snapshot.key();
            ref.child('users/' + userKey).once('value', function(snapshot) {
                console.log(snapshot.val() + ' follows me');
            });
        });
    }

    function following($scope) {
        ref.child('users/' + uid + '/following').on('child_added', function(snapshot) {
            // for each group, fetch the name and print it
            var userKey = snapshot.key();
            ref.child('users/' + userKey).once('value', function(snapshot) {
                $scope.users.push(snapshot);
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
});