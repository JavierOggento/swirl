angular.module('ionic.users', [])

.factory('Users', function($localStorage) {
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
        ref.child(uid).set(user, function(error) {
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

        ref.child(userData.uid).set(userObj.userData, function(error) {
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
        var gender,
        userData;

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
            userData.gender = (userRawData.facebook.cachedUserProfile.gender === 'male') ? 'Hombre' : 'Mujer';
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
});
