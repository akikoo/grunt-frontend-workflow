/**
 *
 * http://localhost:9001/
 *
 */

// Module dependencies.
var application_root = __dirname,

    // Public www root.
    www_root = 'www', 

    // Web framework.
    express = require('express'),

    // Utilities for dealing with file paths.
    path = require('path'),

    // MongoDB integration.
    mongoose = require('mongoose'),
    app,
    Item,
    ItemModel,
    db;

// Create server.
app = express();

// Connect to the database and verify connection.
mongoose.connect('mongodb://localhost/prototype-app');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Database connection successful.');
});

//Schemas.
Item = new mongoose.Schema({
    name: String,
    description: String
});

// Models.
ItemModel = mongoose.model('Item', Item);

// Configure server
app.configure(function () {
    // Parse request body and populate request.body.
    app.use(express.bodyParser());

    // Check request.body for HTTP method overrides.
    app.use(express.methodOverride());

    // Perform route lookup based on URL and HTTP method.
    app.use(app.router);

    // Where to serve static content.
    app.use(express.static(path.join(application_root, www_root)));

    // Show all errors in development.
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Routes.

// Main index file.
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/' + www_root + '/index.html');
});

// REST API root.
app.get('/api', function (request, response) {
    response.send('Library API is running');
});

//Get a list of all items
app.get('/api/items', function (request, response) {
    console.log('Getting a list of all items');
    return ItemModel.find(function (err, items) {
        if (!err) {
            return response.send(items);
        } else {
            return console.log(err);
        }
    });
});

//Get a single item by id
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

//Insert a new item
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

//Update an item
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

//Delete an item
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
