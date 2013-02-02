//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.

// node tools/r.js -o tools/build.js

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

        // Modules
        lib: 'app/lib',
        lib2: 'app/lib2',

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
