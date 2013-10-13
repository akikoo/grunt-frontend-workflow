/*
 * Initialize App for `mainpage`.
 */

define(function (require) {

    'use strict';

    var AppRouter = require('../app/routers/router');

    $(function () {
        // Initialize the application router.
        var app = new AppRouter();
    });

});