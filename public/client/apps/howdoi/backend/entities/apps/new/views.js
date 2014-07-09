/*
 * Application: News Manager
 * Views: News Manager NewViews
 * Module: NewsManager.Posts.New.Views
 *
 * */

define([
    "../../../../../../app",
    "common/views",
    "apps/feature/common/views",
    "tpl!apps/feature/entities/features/new/templates/menu.tpl",
    "jquery-address",
    "semantic",
    "jquery-plugins"
], function (IntranetManager, GlobalViews,  CommonViews, menuTpl) {

    IntranetManager.module("FeatureManager.Features.New.Views",
        function (Views, NewsManager, Backbone, Marionette, $, _) {



            Views.MenuView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                className: "layout menu",

                template: menuTpl

            });

            Views.FormView = CommonViews.FormView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                onRender: function(){
                    this.$(".js-submit").text("Create feature");
                }
            });


            Views.HeaderView = GlobalViews.FormNewHeaderView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                onRender: function(){
                    this.$(".ui.form.header").text("Create new feature");
                }


            });

        });

    return IntranetManager.FeatureManager.Features.New.Views;
});
