/*
 * Gruntfile for Backbone/RequireJS multipage boilerplate. 
 * 
 * DEV URL: http://localhost:9001/
 * 
 * @author Aki Karkkainen
 * @url https://github.com/akikoo/backbone-requirejs-multipage-boilerplate
 * Twitter: http://twitter.com/akikoo
 * 
 */

// Needed for `grunt-contrib-livereload`.
var path        = require('path'),
    lrSnippet   = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };

// Grunt configuration wrapper function.
module.exports = function (grunt) {

    'use strict';

    // Configurable paths. 
    var pathsConfig = {
        webroot: 'www',
        dist: 'www-built'
    };

    // Initialize our configuration object.
    grunt.initConfig({

        /*
         * Get paths. 
         */
        path: pathsConfig,


        /*
         * Get the project metadata.
         */
        pkg: grunt.file.readJSON('package.json'),


        /*
         * Create a dynamic build header. 
         */
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
            ' Licensed <%= pkg.license %> */\n',


        /*
         * Reload assets live in the browser.
         */
        livereload: {
            port: 35729 // Default livereload listening port.
        },


        /*
         * Start a static web server. 
         * DEV URL http://localhost:9001/.
         * To view the local site on another device on the same LAN, use your master machine's IP address instead, for example http://10.0.0.32:9001/.
         */
        connect: {
            livereload: {
                options: {
                    port: 9001, // The port on which the webserver will respond.
                    hostname: '*', // Default 'localhost'. Setting this to '*' will make the server accessible from anywhere. Useful for cross-device testing.
                    base: '<%= path.webroot %>', // The base (or root) directory from which files will be served. Defaults to the project Gruntfile's directory.
                    middleware: function (connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)];
                    }
                }
            }
        },


        /*
         * Observe files for changes and run tasks.
         */
        regarde: {
            html: {
                files: ['<%= path.webroot %>/**/*.html'],
                tasks: [
                    'includereplace',
                    'livereload'
                ]
            },
            css: {
                files: ['<%= path.webroot %>/scss/**/*.scss'],
                events: true,
                tasks: [
                    'compass',
                    'csslint',
                    'livereload'
                ]
            },
            js: {
                files: ['<%= path.webroot %>/js/app/**/*.js'],
                tasks: [
                    'jshint',
                    'livereload'
                ]
            }
        },


        /*
         * Compile Sass to CSS using Compass.
         */
        compass: {
            dist: {
                options: {
                    httpPath: '/',
                    cssDir: '<%= path.webroot %>/css',
                    sassDir: '<%= path.webroot %>/scss',
                    imagesDir: '<%= path.webroot %>/img',
                    javascriptsDir: '<%= path.webroot %>/js',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    noLineComments: false,
                    force: true,
                    raw: 'Sass::Script::Number.precision = 15\n' // Use `raw` since it's not directly available.
                }
            }
        },


        /*
         * Lint CSS files.
         */
        csslint: {
            options: {
                csslintrc: '.csslintrc' // Get CSSLint options from external file.
            },
            strict: {
                options: {},
                src: ['<%= path.webroot %>/css/*.css']
            },
            lax: {
                options: {}
                // src: ['www/css/common/*.css']
            }
        },


        /*
         * Validate files with JSHint.
         */
        jshint: {
            // Define the files to lint.
            files: [
                'Gruntfile.js',
                '<%= path.webroot %>/js/app/**/*.js' // Only process custom scripts, exclude libraries.
            ],
            // Configure JSHint (documented at http://www.jshint.com/docs/).
            options: {
                jshintrc: '.jshintrc'
            }
        },


        /*
         * Compile YUIDoc Documentation.
         */
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: ['<%= path.webroot %>/js/app/'],
                    outdir: '<%= path.dist %>/docs/'
                }
            }
        },


        /*
         * Grunt task to include files and replace variables. Allows for parameterised includes.
         */
        includereplace: {
            dist: {
                options: {
                    // Global variables available in all files.
                    globals: {},
                    // Optional variable prefix & suffix.
                    prefix: '<!-- @',
                    suffix: ' -->'
                },
                // Source-destination file mappings where the property name is the 
                // destination directory, and its value is the source file to 
                // perform replacements and includes with.
                files: {
                    '<%= path.webroot %>/': '<%= path.webroot %>/html/index.html'
                }
            }
        },


        /*
         * Optimize RequireJS projects using r.js.
         */
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',                          // The JS source dir, relative to the 'appDir' if set below. No forward slash here!
                    appDir: '<%= path.webroot %>',          // The top level assets directory, relative to this file. All the files from this directory will be copied to 'dir'.
                    dir: '<%= path.dist %>',                // The CSS and JS output dir, relative to this file.
                    mainConfigFile: '<%= path.webroot %>/js/config.js', // Include the main configuration file (paths, shim). Relative to this file.
                    optimize: 'uglify',                     // (default) uses UglifyJS to minify the code.
                    skipDirOptimize: true,                  // Set to true, to skip optimizing other non-build layer JS files (speeds up builds).
                    optimizeCss: 'standard',                // @import inlining, comment removal and line returns.
                    fileExclusionRegExp: /^\.|\.((json))|scss$/, // If the regexp matches, it means the file/directory will be excluded.

                    // List of modules that will be optimized. All their immediate and deep dependencies will be included.
                    modules: [
                        // First set up the common build layer. Module names are relative to 'baseUrl'.
                        {
                            name: 'config',
                            // List common dependencies here. Only need to list top level dependencies, "include" will find nested dependencies.
                            include: [
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
                        // build layer that wants to exclude it. The "mainpage" and "subpage" modules
                        // are **not** the targets of the optimization, because shim config is
                        // in play, and shimmed dependencies need to maintain their load order.
                        // In this example, config.js will hold jquery, so backbone needs to be
                        // delayed from loading until config.js finishes. That loading sequence
                        // is controlled in mainpage.js.
                        {
                            name: 'app/mainpage',
                            exclude: ['config']
                        },
                        {
                            name: 'app/subpage',
                            exclude: ['config']
                        }
                    ]
                }
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-include-replace');
    // grunt.loadNpmTasks('grunt-contrib-concat');


    // The default (DEV) task can be run just by typing "grunt" on the command line.
    grunt.registerTask('default', [
        'livereload-start',
        'connect',
        'regarde'
    ]);


    // This would be run by typing "grunt dist" on the command line.
    grunt.registerTask('dist', [
        'includereplace',
        'compass',
        'csslint',
        'jshint',
        // 'concat',
        'requirejs',
        'yuidoc'
    ]);

};