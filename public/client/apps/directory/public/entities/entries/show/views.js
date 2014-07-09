  define([
    "app",
    "tpl!apps/directory/public/entities/entries/show/templates/view.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/sidebar.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/header.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/stats.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/public_view.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/public_view_header.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/title.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/image_view.tpl",
    "tpl!apps/directory/public/entities/entries/show/templates/post_layout.tpl",
    "semantic"
],
    function ( IntranetManager, viewTpl, sidebarTpl, headerTpl, statsTpl, publicViewTpl, publicViewHeaderTpl, titleTpl, imageViewTpl, postLayoutTpl ) {

        IntranetManager.module("DirectoryManager.Posts.Show.Views",
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

                Views.TitleView = Marionette.ItemView.extend({
                    template: titleTpl
                });

            });

        return IntranetManager.DirectoryManager.Posts.Show.Views;
    });
