define([
    "app",
    "tpl!apps/blogs/public/entities/posts/show/templates/details_view.tpl"
],
    function ( IntranetManager, detailsTpl) {

        IntranetManager.module("BlogsManager.Public.Post.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.DetailsView = Marionette.ItemView.extend({
                    template: detailsTpl,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                       // $('body').addClass('single single-news');

                        //console.log('<< Views.PublicView: Loaded ***COMPLETED*** >>');
                    }
                });


            });

        return IntranetManager.BlogsManager.Public.Post.Show.Views;
    });
