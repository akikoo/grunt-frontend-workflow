/*
 * Module to provide CRUD routing with MongoDB data storage.
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

var routesConf, 

    // Public www root.
    webroot = 'www',

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

// Routes.
routesConf = function (app) {

    /*
     * HTTP GET /.
     * Main index file.
     */
    app.get('/', function (request, response) {
        response.sendfile(__dirname + '/' + webroot + '/index.html');
    });

    /*
     * HTTP GET /api.
     * REST API root.
     */
    app.get('/api', function (request, response) {
        response.send('Library API is running');
    });

    /*
     * HTTP Intercept routes and pass control back to the router or next middleware.
     * Set the `contentType` for all CRUD operations.
     */
    app.all('/api/items/*?', function (request, response, next) {
        response.contentType('json');
        next();
    });

    /*
     * HTTP GET /api/items.
     * Get a list of all items.
     */
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

    /*
     * HTTP GET /api/items/:id.
     * Get a single item by id.
     */
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

    /*
     * HTTP POST /api/items.
     * Create a new item.
     */
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

    /*
     * HTTP PUT /api/items/:id.
     * Update an item.
     */
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

    /*
     * HTTP DELETE /api/items/:id.
     * Delete an item.
     */
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
};

// Export a method to be invoked by Express server script: server.js.
module.exports = {routesConf: routesConf};
