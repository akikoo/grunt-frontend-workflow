/*
 * Root-level application View.
 */

define(['backbone', 'collections/items', 'views/item'],

    function (Backbone, ItemsCollection, ItemView) {

        'use strict';

        var AppView = Backbone.View.extend({
            // Instead of generating a new element, bind this view to the existing skeleton of the App.
            el: $('#page'),

            // Delegate events for creating new items.
            events: {
                'click #btn-create': 'create'
            },

            // At initialization we bind to the relevant events on the `Items`
            // collection, when items are added or changed. Kick things off by
            // loading our initial data.
            initialize: function () {
                this.$input = this.$('#input-create1');
                this.collection = new ItemsCollection();

                // Listen to changes
                this.listenTo(this.collection, 'add', this.addOne);
                this.listenTo(this.collection, 'reset', this.addAll);
                this.listenTo(this.collection, 'all', this.render);

                // Get the data. Fires the 'reset' event when done.
                this.collection.fetch(); // --> GET
            },

            render: function () {
                // Maintain chainability.
                return this;
            },

            // Add a single item to the list by creating a view for it, and
            // appending its element to the `<ul>`.
            addOne: function (item) {
                var itemView = new ItemView({model: item});
                $('#read').append(itemView.render().el);
            },

            // Add all items in the collection at once.
            addAll: function () {
                this.$('#read').html('');
                this.collection.each(this.addOne, this);
            },

            // Create new model
            create: function () {
                var value = this.$input.val().trim();

                if (!value) {
                    return;
                } else {
                    this.collection.create({name: value}); // --> POST
                    this.$input.val('');
                }
            }
        });

        return AppView;
    }
);