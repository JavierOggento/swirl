describe('Controllers', function() {
    var scope,
        ionicMaterialInk = {
            displayEffect: function() {
                return;
            }
        },
        Events;

    // load the controller's module
    beforeEach(module('swirl.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('EventsCtrl', {
            $scope: scope,
            Events: Events,
            ionicMaterialInk: ionicMaterialInk
        });
    }));

    // tests start here
    it('should have events defined', function() {
        expect(scope.events).toBeDefined();
    });
});