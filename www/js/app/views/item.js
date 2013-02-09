/*
 * Single item View.
 */

define(['backbone', 'handlebars', 'text!templates/item.html'],

    function(Backbone, Handlebars, ItemTemplate) {

        'use strict';

        var ItemView = Backbone.View.extend({

            // This view is a list item.
            tagName: 'li',

            // Compile our list item template.
            template: Handlebars.compile(ItemTemplate),

            // The DOM events specific to an item.
            events: {
                'click .update'     : 'edit',       // Show input field for editing.
                'click .btn-save'   : 'save',       // Update.
                'click .btn-delete' : 'destroy',    // Delete.
                'click .cancel'     : 'cancel'      // Cancel.
            },

            initialize: function () {

                // Listen to model changes
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);

            },

            render: function () {

                // Update el with the cached template.
                $(this.el).html(this.template(this.model.toJSON()));
                this.$input = this.$(".input-update");
                return this;

            },

            // Switch this view into editing mode, displaying the input field.
            edit: function () {

                this.$('.is-editable').addClass("is-editable-shown");
                this.$input.focus();

            },

            // Close the editing mode, saving changes, or deleting if empty.
            save: function () {

                var value = this.$input.val().trim();

                if (value) {
                    this.model.save({name: value}); // --> PUT
                } else {
                    this.destroy(); // --> DELETE
                }
                this.$('.is-editable').removeClass("is-editable-shown");

            },

            cancel: function (e) {

                e.preventDefault();
                this.$('.is-editable').removeClass("is-editable-shown");

            },

            // Remove view when model is destroyed.
            remove: function () {

                $(this.el).unbind();
                $(this.el).remove();

            },

            // Destroy model when '.delete' is clicked.
            destroy: function () {

                this.model.destroy();

            }

        });

        return ItemView;

    }
);