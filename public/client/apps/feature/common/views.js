/*
 * Application: Feature Manager
 * Views: Feature Common Views
 * Module: Feature.Common.Views
 *
 * */


define([
    "app",
    "common/views",
    "tpl!apps/feature/common/templates/form.tpl",
    "tpl!apps/feature/common/templates/app_menu.tpl"
], function ( IntranetManager, GlobalViews, formTpl, appMenuTpl) {

    IntranetManager.module("FeatureManager.Common.Views",
        function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


            Views.HeaderView = GlobalViews.ListHeaderView.extend({

                className: "ui grid header admin view",

                triggers: {
                    "click .js-command-new": "button:command:new"
                },

                onRender: function(){

                    console.log('<< HeaderView : LOADED >>');

                    this.$(".view.header").text("Feature Manager");

                    this.$(".list.command.button").text("Add feature");
                }

            });

            Views.ListHeaderView = GlobalViews.ListHeaderView.extend({

                className: "listing header view",

                triggers: {
                    "click .js-command-new": "button:command:new"
                },

                onRender: function(){

                    console.log('<< ListHeaderView : LOADED >>');

                    this.$(".ui.view.header").text("Feature Manager");

                    this.$(".list.command.button").text("Add feature");
                }

            });

            Views.AppMenuView = Marionette.ItemView.extend({
                template: appMenuTpl,

                className: 'ui secondary pointing menu',

                onRender: function(){
                    console.log('<< AppMenuView : LOADED >>');

                }

            });


            Views.FormView = GlobalViews.BaseFormView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                triggers: {
                    'click .js-cancel' : 'form:cancel'
                },

                tagName: 'form',

                className: 'ui feature form view segment',


                ui: {
                    'content': '#post_content',
                    'start_date': '#post_start_date'
                },

                template: formTpl,

                onRender: function () {

                    console.log('<< FormView : LOADED >>');

                    //set values and validations here

                    $(this.ui.content).autosize();

                    $('.dropdown').dropdown();


                }

            });


        });


    return IntranetManager.FeatureManager.Common.Views;
});
