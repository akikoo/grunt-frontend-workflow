define(['backbone', 'handlebars', 'collections/albums', 'text!templates/albums.html'], 

    function(Backbone, Handlebars, AlbumsCollection, AlbumsTemplate) {

        'use strict';

        var AlbumView = Backbone.View.extend({

            // Instead of generating a new element, bind to the existing skeleton of
            // the App already present in the HTML.
            tagName: '#container',

            initialize: function() {
                _.bindAll(this, 'render');
                this.template = Handlebars.compile(AlbumsTemplate);
                AlbumsCollection.fetch();
            },

            // Re-render the titles of the todo item.
            render: function() {
                var renderedContent = this.template(this.model.toJSON());
                $(this.el).html(renderedContent);
                return this;
            }

        });

        return AlbumView;

    }
);
