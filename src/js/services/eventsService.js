angular.module('events.service', ['firebase'])

.factory('EventsService', function($firebaseArray, $firebaseObject) {
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
});