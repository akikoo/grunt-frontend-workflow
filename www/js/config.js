/**
 *
 * RequireJS file paths and shim config.
 *
 *
 * The build will inline common dependencies into this file.
 * File paths will be used for other module packages too, as defined in build.js.
 *
 *
 * More info            https://github.com/jrburke/r.js/blob/master/build/example.build.js
 *                      https://github.com/ryanfitzer/Example-RequireJS-jQuery-Project
 *                      https://github.com/tbranyen/backbone-boilerplate
 *                      https://github.com/requirejs/example-multipage-shim
 *
 * @author Aki Karkkainen - adapted from https://github.com/requirejs/example-multipage-shim
 * @url https://github.com/akikoo/backbone-requirejs-multipage-boilerplate
 * Twitter: http://twitter.com/akikoo
 *
 */

require.config({

    baseUrl: 'js', // The JS source dir, relative to this file and the 'appDir' in build.js

    paths: {

        // Core libraries
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',

        // Templating
        handlebars: 'lib/handlebars',

        // Plugins
        text : 'lib/text',

        // Custom helper modules
        // utils: 'app/utils',

        // App folders
        collections: 'app/collections',
        models: 'app/models',
        routers: 'app/routers',
        templates: 'app/templates',
        views: 'app/views'
    },

    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});
