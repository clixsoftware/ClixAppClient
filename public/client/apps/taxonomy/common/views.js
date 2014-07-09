/*
 * Application: Application Manager
 * Views: Workspace Common Views
 * Module: AppManager.Common.Views
 *
 * */



define([
    "app",
    "common/views",
    "tpl!apps/taxonomy/common/templates/form.tpl",
    "tpl!apps/taxonomy/common/templates/app_menu.tpl",
    "tpl!apps/taxonomy/common/templates/app_public_menu.tpl"
], function(IntranetManager, GlobalViews, formTpl, appMenuTpl, appPublicMenuTpl){

    IntranetManager.module("TaxonomyManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){


            Views.HeaderView = GlobalViews.ListHeaderView.extend({

                className: "ui grid",

                triggers: {
                    "click .js-command-new": "button:command:new"
                },

                onRender: function(){
                    this.$(".list.view.header").text("Application Manager");
                    this.$(".list.command.button").text("New App");
                    //this.$(".list.command.button").remove();
                }

            });

            Views.ListHeaderView = GlobalViews.ListHeaderView.extend({

                className: "ui grid",

                triggers: {
                    "click .js-command-new": "button:command:new"
                },

                onRender: function(){
                    this.$(".ui.view.header").text("Taxonomy Manager");
                    this.$(".js-command-new").remove();
                }

            });

            Views.AppMenuView = Marionette.ItemView.extend({
                template: appMenuTpl,

                className: 'ui secondary pointing menu'

            });

            Views.AppPublicMenuView = Marionette.ItemView.extend({
                template: appPublicMenuTpl,

                className: 'ui secondary pointing menu'

            });


            Views.FormView = GlobalViews.BaseFormView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                triggers: {
                    'click .js-cancel' : 'form:cancel'
                },

                tagName: 'form',

                className: 'ui feature form segment',


                ui: {
                    'content': '#post_content',
                    'start_date': '#post_start_date'
                },

                template: formTpl,

                onRender: function () {

                    //set values and validations here

                    $(this.ui.content).autosize();

                    $('.dropdown').dropdown();


                }

            });


  });



  return IntranetManager.TaxonomyManager.Common.Views;
});
