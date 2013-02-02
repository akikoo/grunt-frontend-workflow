define(['backbone'],

    function(Backbone) {

        'use strict';

        var AlbumModel = Backbone.Model.extend({

            // Default attribute values
            defaults: {
                title: ''
            },

            // Initialize and listen for changes to the model
            initialize: function() {
                // console.log('This model has been initialized.');
                this.on('change', function() {
                    // console.log('- Values for this model have changed.');
                });
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        return AlbumModel;

    }

);