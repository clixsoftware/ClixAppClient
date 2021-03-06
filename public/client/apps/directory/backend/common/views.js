/*
 * Application: Application Manager
 * Views: Workspace Common Views
 * Module: SiteManager.Common.Views
 *
 * */



define([
    "app",
    "common/views",
    "tpl!apps/directory/common/templates/form.tpl",
    "tpl!apps/directory/common/templates/app_menu.tpl",
    "tpl!apps/directory/common/templates/blank.tpl",
    "tpl!apps/directory/common/templates/blank_help.tpl",
    "tpl!apps/directory/common/templates/public_layout.tpl"

], function(IntranetManager, GlobalViews, formTpl, appMenuTpl, blankTpl, blankhelpTpl, publicLayoutTpl){

    IntranetManager.module("DirectoryManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){

            Views.PublicLayoutView = GlobalViews.AppLayoutView.extend({

                template: publicLayoutTpl,

                className: 'row',

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('public news').removeClass('app');
                },

                onRender: function(){
                    $('body').removeClass('app');
                }
            });

            Views.AppLayoutView = GlobalViews.AppLayoutView.extend({

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('public news').removeClass('app');
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
                    this.$(".ui.view.header .sub.header").text("List of news applications");
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



  return IntranetManager.DirectoryManager.Common.Views;
});
