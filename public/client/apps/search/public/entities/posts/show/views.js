define([
    "app",
    "common/views",
    "tpl!apps/search/public/entities/posts/show/templates/home.tpl"
],
    function ( IntranetManager, GlobalViews, homeTpl) {

        IntranetManager.module("SearchManager.Public.Posts.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.DefaultPageView = GlobalViews.BaseFormView.extend({
                    template: homeTpl

                });


            });

        return IntranetManager.SearchManager.Public.Posts.Show.Views;
    });
