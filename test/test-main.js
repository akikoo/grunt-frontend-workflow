/*
 * Configures Require.js for the tests.
 * 
 * @author Aki Karkkainen
 * @url https://github.com/akikoo/grunt-frontend-workflow
 * Twitter: http://twitter.com/akikoo
 * 
 * See also https://github.com/kjbekkelund/karma-requirejs
 */

var tests = [];

for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({

    // Karma serves files from '/base'
    baseUrl: '/base/www/js',

    paths: {

        // Core libraries.
        jquery: '../js/lib/jquery/jquery',
        underscore: '../js/lib/underscore/underscore',
        backbone: '../js/lib/backbone/backbone',

        // Templating.
        handlebars: '../lib/handlebars/handlebars',

        // Plugins.
        text: '../lib/requirejs-text/text',

        // Custom AMD modules.
        // utils: 'app/utils',

        // App folders.
        collections: '../app/collections',
        models: '../app/models',
        routers: '../app/routers',
        templates: '../app/templates',
        views: '../app/views'
    },

    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    },

    // Ask Require.js to load these files (all our tests)
    deps: tests,

    // Start test run, once Require.js is done
    callback: window.__karma__.start
});