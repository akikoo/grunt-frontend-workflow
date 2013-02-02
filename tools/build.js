/**
 *
 * RequireJS build profile for stylesheets and JavaScript files.
 * Defines paths where to read and write.
 *
 *
 * To optimize with Node.js:
 * node tools/r.js -o tools/build.js
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

({
    // Base paths
    appDir              : '../www',                 // The top level assets directory, relative to this file.
                                                    // All the files from this directory will be copied to 'dir'.
    dir                 : '../www-built',           // The CSS and JS output dir, relative to this file.

    // Include the main configuration file (paths, shim). Relative to this file.
    mainConfigFile      : '../www/js/config.js',

    // List of modules that will be optimized. All their immediate and deep dependencies will be included.
    modules: [
        // First set up the common build layer. Module names are relative to 'baseUrl'.
        {
            name        : 'config',
            // List common dependencies here. Only need to list top level
            // dependencies, "include" will find nested dependencies.
            include     : [
                'jquery',
                'backbone',
                'underscore',
                'handlebars',
                'text'
            ]
        },
        // Now set up a build layer for each main layer, but exclude the common one.
        // "exclude" will exclude the nested, built dependencies from "common".
        // Any "exclude" that includes built modules should be listed before the
        // build layer that wants to exclude it. The "page1" and "page2" modules
        // are **not** the targets of the optimization, because shim config is
        // in play, and shimmed dependencies need to maintain their load order.
        // In this example, config.js will hold jquery, so backbone needs to be
        // delayed from loading until config.js finishes. That loading sequence
        // is controlled in page1.js.
        {
            name        : 'app/main1',
            exclude     : ['config']
        },
        {
            name        : 'app/main2',
            exclude     : ['config']
        }
    ]
})