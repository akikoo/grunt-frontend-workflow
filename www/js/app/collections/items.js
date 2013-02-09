/*
 * Collection.
 */

define(['backbone', 'models/item'],

    function(Backbone, Model) {

        'use strict';

        var Collection = Backbone.Collection.extend({

            // Reference to this collection's model.
            model: Model,

            // URL where to fetch the data.
            url: '../api/index.php/items'

        });

        return Collection;

    }

);