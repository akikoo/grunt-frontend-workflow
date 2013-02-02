define(['backbone'],

    function(Backbone) {

        var AlbumRouter = Backbone.Router.extend({

            routes: {
                "": "index"
            },

            index: function() {
                // console.log('Hello World!');
            }

        });

        return AlbumRouter;

    }

);