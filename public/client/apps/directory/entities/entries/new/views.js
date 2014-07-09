/*
 * Application: News Manager
 * Views: News Manager NewViews
 * Module: YPManager.Posts.New.Views
 *
 * */

define([
    "app",
    "common/views",

    "tpl!apps/directory/entities/entries/new/templates/menu.tpl",
    "tpl!apps/directory/entities/entries/new/templates/header.tpl",
    "jquery-address",
    "semantic",
    "jquery-plugins"
], function (IntranetManager, AppCommonViews,  menuTpl, headerTpl) {

    IntranetManager.module("DirectoryManager.Posts.New.Views",
        function (Views, DirectoryManager, Backbone, Marionette, $, _) {



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

    return IntranetManager.DirectoryManager.Posts.New.Views;
});
