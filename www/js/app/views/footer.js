/*
 * Footer View.
 */

define(['backbone', 'handlebars', 'text!templates/footer.html'],

        function(Backbone, Handlebars, footerTemplate) {

            'use strict';

            var FooterView = Backbone.View.extend({

                el: '#footer',

                // Compile our footer template.
                template: Handlebars.compile(footerTemplate),

                initialize: function () {

                    this.render();

                },

                render: function () {

                    // Update el with the cached template.
                    $(this.el).html(this.template());

                    return this;

                }

            });

            return FooterView;

        }
);