/*
 * Application: News Manager
 * Views: News Manager NewViews
 * Module: YPManager.Posts.New.Views
 *
 * */

define([
    "app",
    "common/views",

    "tpl!apps/yp/entities/posts/new/templates/menu.tpl",
    "tpl!apps/yp/entities/posts/new/templates/header.tpl",
    "jquery-address",
    "semantic",
    "jquery-plugins"
], function (IntranetManager, AppCommonViews,  menuTpl, headerTpl) {

    IntranetManager.module("YPManager.Posts.New.Views",
        function (Views, YPManager, Backbone, Marionette, $, _) {



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

    return IntranetManager.YPManager.Posts.New.Views;
});
