/**
 * Initialize App logic for 'page1'
 */
define(function (require) {

    var AppView     = require('../app/views/app'),
        AppRouter   = require('../app/routers/router');

    $(function () {

        // Initialize the application router
        var Router = new AppRouter();

        Backbone.history.start({
            pushState: false
        });

        // Initialize the application view
        var App = new AppView();

        //Display backbone and underscore versions
        $('body')
            .append('<div>Backbone version: ' + Backbone.VERSION + '</div>')
            .append('<div>Underscore version: ' + _.VERSION + '</div>');
    });

});