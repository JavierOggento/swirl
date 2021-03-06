// Karma configuration
// Generated on Sat Oct 10 2015 22:22:19 GMT-0300 (ART)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            '../www/lib/ionic/js/angular/angular.js',
            '../www/lib/ionic/js/angular/angular-animate.js',
            '../www/lib/ionic/js/angular/angular-resource.js',
            '../www/lib/ionic/js/angular/angular-sanitize.js',
            '../www/lib/angular-mocks/angular-mocks.js',
            '../www/lib/ionic/js/angular-ui/angular-ui-router.js',
            '../www/lib/ionic/js/ionic.js',
            '../www/lib/ionic/js/ionic-angular.js',
            '../www/lib/ionic-material/dist/ionic.material.js',
            '../www/js/all.js',
/*            '../www/lib/firebase/firebase.js',
            '../www/lib/angularfire/angularfire.min.js',*/
            '../www/lib/angularfire/angularfire.min.js',
            '../www.lib/mockfirebase/browser/mockfirebase.js',
            /*'../tests/controllers/*tests.js',*/
            '../tests/**/*tests.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../www.js/all.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress',  'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
