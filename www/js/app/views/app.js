define(['backbone', 'handlebars', 'collections/albums', 'text!templates/albums.html'],

    function(Backbone, Handlebars, AlbumsCollection, AlbumsTemplate) {

        'use strict';

        var AppView = Backbone.View.extend({

            // Instead of generating a new element, bind this view to an existing DOM element.
            el: '#container',

            // Compile our stats template
            template: Handlebars.compile(AlbumsTemplate),

            // View Event Handlers
            events: {
                /*
                 'dblclick label': 'edit',
                 'keypress .edit': 'updateOnEnter',
                 'blur .edit':   'close'
                 'click button#add': 'addItem'
                 */
            },

            initialize: function() {

                _.bindAll(this, 'render');

                this.collection = new AlbumsCollection();

                // Update an entire collection at once.
                this.collection.on('reset', this.render, this);

                this.collection.fetch();

                // This is a self rendering view.
                // this.render();
            },

            // Re-render the titles of the todo item.
            render: function() {

                $(this.el).html(this.template(this.collection.toJSON()));

                // Maintain chainability.
                return this;
            }

        });

    return AppView;

    }
);