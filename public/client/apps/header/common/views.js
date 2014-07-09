/*
 * Application: Header
 * Views: HeaderManager Common Views
 * Module: HeaderManager.Common.Views
 *
 * */


define([
    "app",
    "pace",
    "tpl!apps/header/common/templates/layout.tpl",
    "tpl!apps/header/common/templates/brand_menu.tpl",
    "tpl!apps/header/common/templates/user_menu.tpl",
    "tpl!apps/header/common/templates/main_menu.tpl",
    "tpl!apps/header/common/templates/mobile_nav.tpl",
    "tpl!apps/header/common/templates/global_search.tpl"
],
    function ( IntranetManager, pace, layoutTpl, brandMenuTpl, userMenuTpl, mainMenuTpl, mobileNavTpl, globalSearchTpl ) {

        IntranetManager.module("HeaderManager.Common.Views",
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

                Views.BrandMenuView = Marionette.ItemView.extend({
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

                });

                Views.UserMenuView = Marionette.ItemView.extend({
                    template: userMenuTpl

                });


                Views.MobileNavView = Marionette.ItemView.extend({
                    template: mobileNavTpl

                });

                Views.MainMenuView = Marionette.ItemView.extend({
                    template: mainMenuTpl,

                    onRender: function () {
                        console.log('<<< Views.MainMenuView: rendered >> ');
                        $('#site-left-sidebar').addClass('main-menu');

                    }

                });

                Views.SiteSearchView = Marionette.ItemView.extend({
                    template: globalSearchTpl,

                    triggers: {
                        'click .close-search': 'sidebar:close'
                    },

                    events: {
                        "click .js-submit": "filterContacts"

                    },

                    ui: {
                        criterion: "input.js-filter-criterion"
                    },

                    filterContacts: function ( e ) {
                        e.preventDefault();
                        console.log('Triggered Search in from Header');
                        this.trigger('sidebar:close');
                        if (this.ui.criterion.val().length < 1) {
                            this.ui.criterion.addClass('ui input error');
                            alert('a search keyword is required');
                            return;
                        }

                        this.ui.criterion.removeClass('ui input error');
                        var criterion = this.$(".js-filter-criterion").val();
                        IntranetManager.trigger("contacts:search", criterion);
                    },

                    onRender: function () {
                       // $('#site-top-sidebar').removeClass('fixed');
                    }

                });


            });

        return IntranetManager.HeaderManager.Common.Views;
    });
