/*
 * Server script for Express web application framework. Contains a custom REST API 
 * and MongoDB integration, for prototyping applications with RESTful back-end.
 * 
 * DEV URL: http://localhost:9001/
 *
 * @author Aki Karkkainen
 * Adapted from the following sources (among others):
 *     http://addyosmani.github.io/backbone-fundamentals/#creating-the-back-end
 *     https://npmjs.org/package/grunt-express
 *     http://mongoosejs.com/docs/index.html
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

    // Utilities for dealing with file paths.
    path = require('path'),

    // Express server instance.
    app,

    // MongoDB integration.
    mongoose = require('mongoose'),

    // MongoDB database name.
    dbname = 'prototype-app',

    // MongoDB connection link.
    dbconn,

    // MongoDB schema.
    Item,

    // MongoDB model.
    ItemModel;

// Create server.
app = express();

// Connect to the database and verify connection.
mongoose.connect('mongodb://localhost/' + dbname);
dbconn = mongoose.connection;
dbconn.on('error', console.error.bind(console, 'connection error:'));
dbconn.once('open', function callback () {
    console.log('Database connection successful.');
});

//Schemas.
Item = new mongoose.Schema({
    name: String,
    description: String
});

// Models.
ItemModel = mongoose.model('Item', Item);

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

// Routes.

// Main index file.
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/' + webroot + '/index.html');
});

// REST API root.
app.get('/api', function (request, response) {
    response.send('Library API is running');
});

//Get a list of all items.
app.get('/api/items', function (request, response) {
    return ItemModel.find(function (err, items) {
        if (!err) {
            console.log('Getting a list of all items');
            return response.send(items);
        } else {
            return console.log(err);
        }
    });
});

//Get a single item by id.
app.get('/api/items/:id', function (request, response) {
    return ItemModel.findById(request.params.id, function (err, item) {
        if (!err) {
            console.log('Getting item with id: ' + request.params.id);
            return response.send(item);
        } else {
            return console.log(err);
        }
    });
});

//Insert a new item.
app.post('/api/items', function (request, response) {
    var item = new ItemModel({
        name: request.body.name,
        description: request.body.description
    });
    item.save(function (err) {
        if (!err) {
            return console.log('Creating new item "' + request.body.name + '"');
        } else {
            return console.log(err);
        }
    });
    return response.send(item);
});

//Update an item.
app.put('/api/items/:id', function (request, response) {
    return ItemModel.findById(request.params.id, function (err, item) {
        item.name = request.body.name;
        item.description = request.body.description;

        return item.save(function (err) {
            if (!err) {
                console.log('Updating item to "' + request.body.name + '" (id: ' + request.params.id + ')');
            } else {
                console.log(err);
            }
            return response.send(item);
        });
    });
});

//Delete an item.
app.delete('/api/items/:id', function (request, response) {
    return ItemModel.findById(request.params.id, function (err, item) {
        var itemName = item.name;
        return item.remove(function(err) {
            if (!err) {
                console.log('Deleting item "' + itemName + '" (id: ' + request.params.id + ')');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});

module.exports = app;
