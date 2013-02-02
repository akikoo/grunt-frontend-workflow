define(['backbone', 'models/album'],

    function(Backbone, AlbumModel) {

        'use strict';

        var AlbumsCollection = Backbone.Collection.extend({

            // Reference to this collection's model.
            model: AlbumModel,

            // URL where to fetch the data
            url: '/www/albums.json'

        });

        return AlbumsCollection;

    }

);