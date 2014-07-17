/*
 * Application: News Manager
 * Views: News Manager NewViews
 * Module: NewsManager.Posts.New.Views
 *
 * */

define([
    "app",
    "common/views",
    "apps/feature/common/views",
    "tpl!apps/news/entities/posts/new/templates/menu.tpl",
    "jquery-address",
    "semantic",
    "jquery-plugins"
], function (IntranetManager, GlobalViews, CommonViews, menuTpl) {

    IntranetManager.module("FeatureManager.Features.Edit.Views",
        function (Views, FeatureManager, Backbone, Marionette, $, _) {


            Views.MenuView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                template: menuTpl

            });


            Views.FormView = CommonViews.FormView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                onRender: function () {
                    this.$(".js-submit").text("Update feature");
                }
            });


            Views.HeaderView = GlobalViews.FormNewHeaderView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                onRender: function () {
                    this.$(".ui.form.header").text("Edit Feature");
                }

            });

        });

    return IntranetManager.FeatureManager.Features.Edit.Views;
});
