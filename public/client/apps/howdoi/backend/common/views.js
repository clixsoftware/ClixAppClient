/*
 * Application: Application Manager
 * Views: Workspace Common Views
 * Module: SiteManager.Common.Views
 *
 * */



define([
    "../../../../app",
    "common/views",
    "tpl!apps/yp/common/templates/form.tpl",
    "tpl!apps/yp/common/templates/app_menu.tpl",
    "tpl!apps/yp/common/templates/blank.tpl",
    "tpl!apps/yp/common/templates/blank_help.tpl",
    "tpl!apps/yp/common/templates/public_layout.tpl"

], function(IntranetManager, GlobalViews, formTpl, appMenuTpl, blankTpl, blankhelpTpl, publicLayoutTpl){

    IntranetManager.module("YPManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){

            Views.NewsLayoutView = GlobalViews.Content2ColLayoutView.extend({
                template: publicLayoutTpl,

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('public yp').removeClass('app');
                },

                onRender: function(){
                    $('body').removeClass('app');
                }
            });

            Views.AppLayoutView = GlobalViews.AppLayoutView.extend({
             //   template: publicLayoutTpl,

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('public yp').removeClass('app');
                },

                onRender: function(){
                    $('body').removeClass('app');
                }
            });


            Views.BlankView = GlobalViews.BlankView.extend({
                template: blankTpl,


                triggers: {
                    'click .js-add-site': 'command:form:new'
                }
            });

            Views.BlankHelpView = GlobalViews.BlankHelpView.extend({
                template: blankhelpTpl
            });


            Views.HeaderView = GlobalViews.ListHeaderView.extend({

                triggers: {
                    "click .js-command-new": "button:command:new"
                },

                onRender: function(){
                    this.$(".ui.view.header span").text("News Applications");
                    this.$(".ui.view.header .sub.header").text("List of yp applications");
                    this.$(".js-command-new").remove();

                    console.log('<< HeaderView : LOADED >>');
                }

            });

            Views.ListHeaderView = GlobalViews.ListHeaderView.extend({

                initialize: function(){
                    //this.model.set('header', 'The header');

                },

                className: "ui grid",

                triggers: {
                    "click .js-command-new": "button:command:new"
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



  return IntranetManager.YPManager.Common.Views;
});
