/*
 * Application: News Manager
 * Views: News Manager Common Views
 * Module: YPManager.Common.Views
 *
 * */


define([
    "app",
    "common/views",
    "tpl!apps/directory/entities/entries/common/templates/form.tpl",
    "tpl!apps/directory/entities/entries/common/templates/menu.tpl"
], function ( IntranetManager, GlobalViews, formTpl, menuTpl) {

    IntranetManager.module("DirectoryManager.Posts.Common.Views",
        function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


            Views.MenuView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                template: menuTpl

            });


            Views.FormView = GlobalViews.BaseFormView.extend({

                initialize: function () {
                   // alert('init workspace form');
                },

                triggers: {
                    'click .js-cancel' : 'form:cancel'
                },

                ui: {
                    'content': '#post_content',
                    'start_date': '#post_start_date'
                },

                template: formTpl,

                onRender: function () {

                    // this.ui.content.val('what');

                   // $(this.ui.content).autosize();

                    //$('.dropdown').dropdown();
                }

            });


        });


    return IntranetManager.DirectoryManager.Posts.Common.Views;
});
