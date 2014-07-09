define([
    "../../../../../../app",
    "tpl!apps/yp/entities/posts/show/templates/view.tpl",
    "tpl!apps/yp/entities/posts/show/templates/sidebar.tpl",
    "tpl!apps/yp/entities/posts/show/templates/header.tpl",
    "tpl!apps/yp/entities/posts/show/templates/stats.tpl",
    "tpl!apps/yp/entities/posts/show/templates/public_view.tpl",
    "tpl!apps/yp/entities/posts/show/templates/public_view_header.tpl",
    "tpl!apps/yp/entities/posts/show/templates/top_news.tpl",
    "tpl!apps/yp/entities/posts/show/templates/image_view.tpl",
    "tpl!apps/yp/entities/posts/show/templates/post_layout.tpl",
    "semantic"
],
    function ( IntranetManager, viewTpl, sidebarTpl, headerTpl, statsTpl, publicViewTpl, publicViewHeaderTpl, topNewsTpl, imageViewTpl, postLayoutTpl ) {

        IntranetManager.module("YPManager.Posts.Show.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.PostLayoutView = Marionette.Layout.extend({

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

                Views.ImageView = Marionette.ItemView.extend({
                    template: imageViewTpl
                });

                Views.PostView = Marionette.ItemView.extend({
                    template: viewTpl
                });

                Views.SidebarView = Marionette.ItemView.extend({
                    template: sidebarTpl
                });

                Views.HeaderView = Marionette.ItemView.extend({
                    template: headerTpl,

                    triggers: {
                        'click .js-command-delete': 'form:delete',

                        'click .js-command-edit': 'form:edit'
                    }
                });

                Views.StatsView = Marionette.ItemView.extend({
                    template: statsTpl
                });

                Views.PublicView = Marionette.ItemView.extend({
                    template: publicViewTpl
                });

                Views.PublicViewHeader = Marionette.ItemView.extend({
                    template: publicViewHeaderTpl
                });



                Views.TopNewsView = Marionette.ItemView.extend({
                    template: topNewsTpl
                });

            });

        return IntranetManager.YPManager.Posts.Show.Views;
    });
