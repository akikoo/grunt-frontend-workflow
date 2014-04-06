/*
 * Gruntfile for the Grunt Front-End Workflow/Boilerplate
 * (previously called Backbone/RequireJS multipage boilerplate).
 *
 * DEV URL: http://localhost:9001/
 *
 * @author Aki Karkkainen
 * @url https://github.com/akikoo/grunt-frontend-workflow
 * Twitter: http://twitter.com/akikoo
 *
 */


// Needed for `grunt-express`.
var path = require('path');

// Grunt configuration wrapper function.
module.exports = function (grunt) {

    'use strict';

    // Configurable paths and other variables.
    var config = {
        webroot: 'www',
        dist: 'www-built',
        testroot: 'test',
        tstamp: '<%= grunt.template.today("ddmmyyyyhhMMss") %>'
    };

    // Initialize our configuration object.
    grunt.initConfig({

        /*
         * Get configuration options.
         */
        config: config,


        /*
         * Get the project metadata.
         */
        pkg: grunt.file.readJSON('package.json'),


        /*
         * Create a dynamic build header.
         */
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | ' +
            '<%= grunt.template.today("dd-mm-yyyy-hh:MM:ss") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> |' +
            ' Licensed <%= pkg.license %>\n */\n',


        /**
         * Start (and supervise) an Express.js web server.
         * DEV URL http://localhost:9001/.
         * To view the local site on another device on the same LAN, use your
         * master machine's IP address instead, for example http://10.0.0.32:9001/.
         */
        express: {
            server: {
                options: {
                    // The port on which the webserver will respond.
                    port: 9001,

                    // Default 'localhost'. Setting this to '*' will make the server
                    // accessible from anywhere. Useful for cross-device testing.
                    hostname: '*',

                    // The base (or root) directory from which files will be served.
                    // Defaults to the project Gruntfile's directory.
                    bases: ['<%= config.webroot %>'],

                    // Start an express server using your own express application script. 
                    // Server.js contains a custom RESTful API.
                    server: path.resolve('./server.js'),

                    // if you just specify `true`, default port `35729` will be used.
                    livereload: 1337
                }
            }
        },


        /*
         * Run predefined tasks whenever watched file patterns are added, changed or deleted.
         */
        watch: {
            options: {
                // Reload assets live in the browser.
                // Default livereload listening port is 35729.
                livereload: 1337
            },
            html: {
                files: ['<%= config.webroot %>/html/*.html'],
                tasks: [
                    'includereplace'
                ]
            },
            css: {
                files: ['<%= config.webroot %>/scss/**/*.scss'],
                tasks: [
                    'compass',
                    'csslint',
                    'autoprefixer'
                ]
            },
            js: {
                files: ['<%= config.webroot %>/js/app/**/*.js'],
                tasks: [
                    'jshint'
                ]
            },
            // Run unit tests with karma (server needs to be already running).
            karma: {
                files: ['<%= config.testroot %>/spec/*Spec.js'],
                tasks: ['karma:unit:run'] // NOTE the :run flag
            }
        },


        /*
         * Compile Sass to CSS using Compass.
         */
        compass: {
            dist: {
                options: {
                    httpPath: '/',
                    cssDir: '<%= config.webroot %>/css',
                    sassDir: '<%= config.webroot %>/scss',
                    imagesDir: '<%= config.webroot %>/img',
                    javascriptsDir: '<%= config.webroot %>/js',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    noLineComments: false,
                    force: true,

                    // Use `raw` since it's not directly available.
                    raw: 'Sass::Script::Number.precision = 15\n'
                }
            }
        },

        /*
         * Parse CSS and add vendor-prefixed CSS properties using the Can I Use database.
         * Based on Autoprefixer.
         */
        autoprefixer: {
            options: {
                // Task-specific options go here.
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] // Default.
            },
            // Target-specific file lists and/or options go here.
            // if you have specified only the `src` param, the destination will 
            // be set automatically, so source files will be overwritten.
            dist: {
                // Process the precompiled styles.
                src: '<%= config.webroot %>/css/*.css'
            }
        },

        /*
         * Lint CSS files.
         */
        csslint: {
            options: {
                // Get CSSLint options from external file.
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {},
                src: ['<%= config.webroot %>/css/*.css']
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
            // Configure JSHint (documented at http://www.jshint.com/docs/).
            options: {
                // Get JSHint options from external file.
                jshintrc: '.jshintrc'
            },
            // Define the files to lint.
            files: [
                'Gruntfile.js',
                // Only process custom scripts, excluding libraries.
                '<%= config.webroot %>/js/app/**/*.js'
            ]
        },


        /*
         * Compile YUIDoc Documentation.
         */
        yuidoc: {
            compile: {
                options: {
                    paths: ['<%= config.webroot %>/js/app/'],
                    outdir: '<%= config.dist %>/docs/'
                },
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>'
            }
        },


        /*
         * Grunt task to include files and replace variables. Allows for parameterised includes.
         */
        includereplace: {
            dist: {
                options: {
                    // Global variables available in all files.
                    globals: {
                        tstamp: '<%= config.tstamp %>'
                    },
                    // Optional variable prefix & suffix.
                    prefix: '<!-- @',
                    suffix: ' -->'
                },
                // Source-destination file mappings, using Files Array format.
                files: [
                    {
                        // Enable dynamic expansion.
                        expand: true,

                        // Src matches are relative to (but don't include) this path.
                        cwd: '<%= config.webroot %>/html/',

                        // Actual files to match, relative to the cwd.
                        src: [
                            'index.html',
                            'styleguide.html'
                        ],

                        // Destination path prefix.
                        dest: '<%= config.webroot %>/'
                    }
                ]
            }
        },


        /*
         * A mystical CSS icon solution.
         * See http://filamentgroup.com/lab/grunticon/.
         */
        grunticon: {
            makeicons: {
                options: {

                    // Required config.
                    src: '<%= config.webroot %>/img/icons',
                    dest: '<%= config.webroot %>/css/components/modules/icons',

                    // Optional grunticon config properties:

                    // CSS filenames.
                    datasvgcss: 'icons.data.svg.css',
                    datapngcss: 'icons.data.png.css',
                    urlpngcss: 'icons.fallback.css',

                    // Preview HTML filename.
                    previewhtml: 'preview.html',

                    // Grunticon loader code snippet filename.
                    loadersnippet: 'grunticon.loader.txt',

                    // Folder name (within dest) for png output.
                    pngfolder: 'png/',

                    // Prefix for CSS classnames.
                    cssprefix: 'icon-',

                    // CSS file path prefix - this defaults to "/" and will be
                    // placed before the "dest" path when stylesheets are loaded.
                    // This allows root-relative referencing of the CSS. If you
                    // don't want a prefix path, set to to "".
                    cssbasepath: '/'

                }
            }
        },


        /*
         * Optimize RequireJS projects using r.js.
         */
        requirejs: {
            compile: {
                options: {
                    // The JS source dir, relative to the 'appDir' if set below.
                    // No forward slash here!
                    baseUrl: 'js',

                    // The top level assets directory, relative to this file.
                    // All the files from this directory will be copied to 'dir'.
                    appDir: '<%= config.webroot %>',

                    // The CSS and JS output dir, relative to this file.
                    dir: '<%= config.dist %>',

                    // Include the main configuration file (paths, shim).
                    // Relative to this file.
                    mainConfigFile: '<%= config.webroot %>/js/config.js',

                    // (default) uses UglifyJS to minify the code.
                    optimize: 'uglify',

                    // Set to true, to skip optimizing other non-build layer JS
                    // files (speeds up builds).
                    skipDirOptimize: true,

                    // @import inlining, comment removal and line returns.
                    optimizeCss: 'standard',

                    // If the regexp matches, it means the file/directory will
                    // be excluded.
                    fileExclusionRegExp: /^\.|\.((json))|scss$/,

                    // List of modules that will be optimized. All their immediate
                    // and deep dependencies will be included.
                    modules: [
                        // First set up the common build layer. Module names are
                        // relative to 'baseUrl'.
                        {
                            name: 'config',
                            // List common dependencies here. Only need to list
                            // top level dependencies, "include" will find nested
                            // dependencies.
                            include: [
                                'jquery',
                                'backbone',
                                'underscore',
                                'handlebars',
                                'text'
                            ]
                        },


                        // NOTE: If you're building a Single Page Application, 
                        // you can combine the shim config with your page logic, 
                        // resulting in only one http request (plus requirejs itself),
                        // like so:

                        /*
                        {
                            name: 'config',
                            // List common dependencies here. Only need to list 
                            // top level dependencies, "include" will find nested dependencies.
                            include: [
                                'jquery',
                                'backbone',
                                'underscore',
                                'handlebars',
                                'text',
                                'app/mainpage'
                            ]
                        },
                        */

                        // Otherwise if you have multiple pages, do the following:
                        // Now set up a build layer for each main layer, but exclude the common one.
                        // "exclude" will exclude the nested, built dependencies from "config".
                        // Any "exclude" that includes built modules should be listed before the
                        // build layer that wants to exclude it. The "mainpage" and "subpage" modules
                        // are **not** the targets of the optimization, because shim config is
                        // in play, and shimmed dependencies need to maintain their load order.
                        // In this example, config.js will hold jquery, so other scripts need to be
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
        },


        /*
         * Grunt plugin for karma test runner.
         */
        karma: {
            // This is used in `default` (DEV) task.
            unit: {
                configFile: 'karma.conf.js',

                // Don't block subsequent grunt tasks.
                background: true
            },
            // Continuous integration mode: run tests once in PhantomJS browser.
            // Run this with `grunt karma:continuous`. This is used in `dist` (BUILD) task. 
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },


        /*
         * Minify PNG and JPEG images using OptiPNG and jpegtran.
         */
        imagemin: {
            dist: {
                options: {
                    // PNG only.
                    optimizationLevel: 3
                },
                files: [{
                    // Enable dynamic expansion.
                    expand: true,

                    // Src matches are relative to (but don't include) this path.
                    cwd: '<%= config.webroot %>/img/',

                    // Actual pattern(s) to match, relative to the cwd.
                    src: [
                        '**/*.{png,jpg,jpeg}'
                    ],
                        
                    // Destination path prefix.
                    dest: '<%= config.dist %>/img/'
                }]
            }
        },


        /*
         * Concatenate dynamic banner information to built CSS and JS files.
         */
        concat: {
            options: {
                // Strip any existing JavaScript banner comments from source files.
                stripBanners: true,

                // Get dynamic build header.
                banner: '<%= banner %>'
            },
            dist: {
                files: [
                    {
                        // Enable dynamic expansion.
                        expand: true,

                        // Src matches are relative to (but don't include) this path.
                        cwd: '<%= config.dist %>/',

                        // Actual pattern(s) to match, relative to the cwd.
                        src: [
                            // Process only main css files in CSS root.
                            'css/*.css',

                            // Process only main js files in JS app root.
                            'js/app/*.js',

                            // Process also the common layer.
                            'js/config.js'
                        ],

                        // Destination path prefix.
                        dest: '<%= config.dist %>/',

                        // Set nonull to true if you want the concat task to warn
                        // if a given file is missing or invalid.
                        nonull: false
                    }
                ]
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // The default (DEV) task can be run just by typing "grunt" on the command line.
    grunt.registerTask('default', [
        'includereplace',
        'compass',
        'csslint',
        'autoprefixer',
        'jshint',
        'express',
        // On change, run the tests specified in the unit target using the already running karma server.
        'karma:unit',
        'watch'
    ]);


    // The optimized (DIST) production build would be run by typing "grunt dist" on the command line.
    grunt.registerTask('dist', [
        'includereplace',
        'compass',
        'csslint',
        'autoprefixer',
        'jshint',
        'express',
        // Run the tests specified in the continuous target using the already running karma server.
        'karma:continuous',
        'requirejs',
        'yuidoc',
        'imagemin',
        'concat'
    ]);


    // The icons generator (ICONS) would be run by typing "grunt icons" on the command line.
    grunt.registerTask('icons', [
        'grunticon'
    ]);

};