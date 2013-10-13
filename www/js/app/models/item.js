/*
 * Model.
 */

define(['backbone'],

    function (Backbone) {

        'use strict';

        var Model = Backbone.Model.extend({
            // Default attribute values.
            defaults: {
                name: '',
                description: ''
            },

            // Set a Model's idAttribute to transparently map from MongoDB unique key to id.
            idAttribute: '_id',

            // Initialize and listen for changes to the model.
            initialize: function () {
                // console.log('This model has been initialized.');

                this.on('change', function () {
                    // console.log('Values for this model have changed.');
                });
            },

            // Gets called automatically by Backbone when the set and/or save methods are called.
            validate: function (attrs) {
                // console.log('Before attempting to save.');
            }
        });

        return Model;
    }

);