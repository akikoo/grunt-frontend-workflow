/*
 * Server script for Express web application framework. Loads a custom routes 
 * module with REST API and MongoDB integration, for prototyping CRUD operations 
 * with RESTful back-end.
 *
 * DEV URL: http://localhost:9001/
 *
 * @author Aki Karkkainen
 * Adapted from the following sources (among others):
 *     http://addyosmani.github.io/backbone-fundamentals/#creating-the-back-end
 *     https://npmjs.org/package/grunt-express
 *     http://mongoosejs.com/docs/index.html
 *     Single Page Web Applications book: http://www.manning.com/mikowski/
 * @url https://github.com/akikoo/grunt-frontend-workflow
 * Twitter: http://twitter.com/akikoo
 *
 */

// Module dependencies.
var approot = __dirname,

    // Public www root.
    webroot = 'www',

    // Web framework.
    express = require('express'),

    // Routes module.
    routes = require('./routes'),

    // Utilities for dealing with file paths.
    path = require('path'),

    // Express server instance.
    app;

// Create server.
app = express();

// Configure server.
app.configure(function () {
    // Parse request body and populate request.body.
    app.use(express.bodyParser());

    // Check request.body for HTTP method overrides.
    app.use(express.methodOverride());

    // Perform route lookup based on URL and HTTP method.
    app.use(app.router);

    // Where to serve static content.
    app.use(express.static(path.join(approot, webroot)));

    // Show all errors in development.
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Invoke `routesConf` method to set up the routes.
routes.routesConf(app);

// Export the server module.
module.exports = app;
