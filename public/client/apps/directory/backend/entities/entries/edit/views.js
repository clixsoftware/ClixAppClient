/*
 * Application: News Manager
 * Views: News Manager NewViews
 * Module: NewsManager.Posts.New.Views
 *
 * */

define([
    "app",
    "common/views",
    "apps/directory/entities/entries/common/views",
    "tpl!apps/news/entities/posts/new/templates/menu.tpl",
    "tpl!apps/news/entities/posts/new/templates/header.tpl",
    "jquery-address",
    "semantic",
    "jquery-plugins"
], function (IntranetManager, GlobalViews, PostsViews,  menuTpl, headerTpl) {

    IntranetManager.module("DirectoryManager.Posts.Edit.Views",
        function (Views, FeatureManager, Backbone, Marionette, $, _) {




            Views.FormView = PostsViews.FormView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                onRender: function(){
                    this.$(".js-submit").text("Update Posts");

                    console.log('<<< PostsEditViews: FormView: Loaded >>')
                }
            });


            Views.HeaderView = Marionette.ItemView.extend({

                initialize: function () {
                    //alert('init workspace form');
                },

                template: headerTpl

            });


        });

    return IntranetManager.DirectoryManager.Posts.Edit.Views;
});
