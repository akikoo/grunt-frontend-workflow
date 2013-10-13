/*
 * Router. Initializes the root-level View(s), and calls the render() method on Sub-View(s).
 */

define(['backbone', 'views/app', 'views/footer'],

    function (Backbone, AppView, FooterView) {

        'use strict';

        var Router = Backbone.Router.extend({
            routes: {
                '': 'index'
            },

            initialize: function () {
                // Setup the root-level application View.
                this.mainView = new AppView();

                // Initialize other Views.
                this.footerView = new FooterView();

                Backbone.history.start({
                    pushState: false
                });
            },

            index: function () {
                // Render the footer View.
                $('#page').append(this.footerView.render().el);
            }
        });

        return Router;
    }
);