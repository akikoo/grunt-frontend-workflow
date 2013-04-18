/*
 * Initialize App for `mainpage`.
 */

define(function (require) {

    'use strict';

    var AppRouter = require('../app/routers/router');

    $(function () {

        // Initialize the application router.
        var App = new AppRouter();

        Backbone.history.start({
            pushState: false
        });

    });

});