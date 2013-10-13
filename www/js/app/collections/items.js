/*
 * Collection.
 */

define(['backbone', 'models/item'],

    function (Backbone, Model) {

        'use strict';

        var Collection = Backbone.Collection.extend({
            // Reference to this collection's model.
            model: Model,

            // URL where to fetch the data.
            url: 'http://localhost:9001/api/items'
        });

        return Collection;
    }

);