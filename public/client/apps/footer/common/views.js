/*
 * Application: Header
 * Views: HeaderManager Common Views
 * Module: HeaderManager.Common.Views
 *
 * */


define([
    "app",
    "pace",
    "common/views",
    "tpl!apps/footer/common/templates/layout.tpl",
    "tpl!apps/footer/common/templates/feedback-form.tpl",
    "tpl!apps/footer/common/templates/main-menu.tpl",
    "tpl!apps/footer/common/templates/alt-menu.tpl"
],
    function ( IntranetManager, pace, GlobalViews, layoutTpl, feedbackFormTpl, mainMenuTpl, altMenuTpl ) {

        IntranetManager.module("FooterManager.Common.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


                Views.LayoutView = Marionette.Layout.extend({
                    tagName: 'nav',
                    /**/
                    className: 'navbar navbar-inverse',

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        pace.start({
                            document: false
                        });
                        console.log("pace is running");
                    },

                    template: layoutTpl

                });

                Views.MainMenuView = Marionette.ItemView.extend({

                   template: mainMenuTpl

                });


                Views.AltMenuView = Marionette.ItemView.extend({

                    template: altMenuTpl

                });

/*                Views.BrandMenuView = Marionette.ItemView.extend({
                    template: brandMenuTpl,

                    //onRender: function(){
                    //    $('#site-left-sidebar').first()
                    //.sidebar('attach events', '.js-main-menu');
                    // }
                    triggers: {
                        'click .js-main-menu': "sidebar:toggle",
                        'click .js-main-search': "sidebar:search:toggle",
                        'click .js-main-home': "menu:nav:home"
                    },
                    events: {
                        'click .js-main-menu': "changeActionBar"
                    },

                    changeActionBar: function ( e ) {
                        e.preventDefault();
                        alert('remove fixed class from action bar');
                        $('#site-action-bar').removeClass('fixed');
                    }

                });*/

                Views.FeedbackFormView = GlobalViews.BaseFormView.extend({
                    template: feedbackFormTpl,

                    keyId: 'support',

                    triggers: {
                      //  'click .js-toggle': 'form:toggle'
                    },

                    events: {
                        'click .js-toggle': 'toggleForm',
                        'click .js-submit': 'submitClicked'
                    },


                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    onFormDataInvalid: function (errors) {

                        console.log(errors);
                        return false;

                    },

                    onFormToggle: function(){

                        alert('closing the form');

                        $('#collapseOne').collapse('toggle');
                    },

                    toggleForm: function(e){
                        e.preventDefault();
                        $('#collapseOne').collapse('toggle');
                    }

                });


            });

        return IntranetManager.FooterManager.Common.Views;
    });
