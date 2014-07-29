define([
    "app",
    "tpl!apps/howdoi/public/entities/posts/show/templates/public_view.tpl",
    "tpl!apps/howdoi/public/entities/posts/show/templates/public_view_header.tpl",
    "tpl!apps/howdoi/public/entities/posts/show/templates/post_layout.tpl",
    "semantic"
],
    function ( IntranetManager, publicViewTpl, publicViewHeaderTpl, postLayoutTpl ) {

        IntranetManager.module("HowDoIManager.Public.Posts.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.PostLayoutView = Marionette.LayoutView.extend({

                    template: postLayoutTpl,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('post layout view');
                    },

                    regions: {
                        postTitle: "#post-title",
                        postMeta: "#post-meta",
                        postMedia: "#post-media",
                        postContent: "#post-content",
                        postRelated: "#post-related",
                        postRecommended: "#post-recommended",
                        postGallery: "#post-gallery"
                    },

                    onRender: function(){
                        console.log('<< Views.PostLayoutView - Loaded ***DONE ***  >>');
                    }

                });

                Views.PublicView = Marionette.ItemView.extend({
                    template: publicViewTpl
                });

                Views.PublicViewHeader = Marionette.ItemView.extend({
                    template: publicViewHeaderTpl
                });

            });

        return IntranetManager.HowDoIManager.Public.Posts.Show.Views;
    });
