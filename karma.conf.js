/*
 * Karma configuration. Generated on Wed Oct 09 2013 12:04:13 GMT+0200 (CEST)
 * 
 * @author Aki Karkkainen (edits)
 * @url https://github.com/akikoo/grunt-frontend-workflow
 * Twitter: http://twitter.com/akikoo
 * 
 * See https://github.com/kjbekkelund/karma-requirejs
 * See http://karma-runner.github.io/0.8/plus/RequireJS.html
 */

module.exports = function (config) {

    config.set({

        // Base path, that will be used to resolve files and exclude.
        basePath: '',

        // Frameworks to use.
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser.
        files: [
            // Which files do you want to test?
            // 
            // Choose all the files we want to load with Require.js.
            {pattern: 'www/js/lib/**/*.js', included: false},   // All external libraries.
            {pattern: 'www/js/app/**/*.js', included: false},   // Our source code.
            {pattern: 'test/spec/*Spec.js', included: false},   // All the tests.

            // Which files do you want to include with <script> tag?
            // 
            // Choose all files which are not loaded by Require.js. 
            // Usually you'll only need to include your test-main.js file, 
            // which has the same role for your tests as main.js has for 
            // your app when using Require.js.
            'test/test-main.js'
        ],

        // List of files to exclude.
        // We don't want to actually start the application in our tests.
        exclude: [
            'www/js/app/mainpage.js',
            'www/js/app/subpage.js'
        ],

        // Test results reporter to use.
        // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // Web server port.
        port: 9876,

        // Enable / disable colors in the output (reporters and logs).
        colors: true,

        // Level of logging.
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes.
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Firefox'],

        // If browser does not capture in given timeout [ms], kill it.
        captureTimeout: 60000,

        // Continuous Integration mode.
        // if true, it capture browsers, run tests and exit.
        singleRun: false
    });
};
