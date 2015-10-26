angular.module('ionic.utils', [])

.factory('$localStorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            try {
                return JSON.parse($window.localStorage[key]);
            } catch (e) {
                return null;
            }
        }
    };
}]);