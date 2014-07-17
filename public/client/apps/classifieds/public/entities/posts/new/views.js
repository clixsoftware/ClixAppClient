/*
 * Application: News Manager
 * Views: News Manager NewViews
 * Module: NewsManager.Posts.New.Views
 *
 * */

define([
    "app",
    "common/views",

    "tpl!apps/news/entities/posts/new/templates/menu.tpl",
    "tpl!apps/news/entities/posts/new/templates/header.tpl",
    "jquery-address",
    "semantic",
    "jquery-plugins"
], function (IntranetManager, AppCommonViews, menuTpl, headerTpl) {

    IntranetManager.module("NewsManager.Posts.New.Views",
        function (Views, NewsManager, Backbone, Marionette, $, _) {


            Views.MenuView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                template: menuTpl

            });


            Views.HeaderView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                template: headerTpl

            });

        });

    return IntranetManager.NewsManager.Posts.New.Views;
});
