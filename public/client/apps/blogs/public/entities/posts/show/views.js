define([
    "app",
    "tpl!apps/blogs/public/entities/posts/show/templates/public_view.tpl",
    "tpl!apps/blogs/public/entities/posts/show/templates/post_layout.tpl"
],
    function ( IntranetManager,  publicViewTpl, postLayoutTpl ) {

        IntranetManager.module("BlogsManager.Public.Posts.Show.Views",
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
                        console.group('Render -> blogs : Show: Views : PostLayoutView');
                        console.info(this.regions);
                        console.groupEnd();
                    }

                });

                Views.PublicView = Marionette.ItemView.extend({
                    template: publicViewTpl,

                    onBeforeRender: function () {
                        // set up final bits just before rendering the view's `el`
                        $('body').addClass('single single-blogs');
                    },

                    ui: {
                        media : '.js-media',
                        media_image: '.js-media-image'
                    },

                    onRender: function(){
                        var attachments = this.model.get('attachments');

                        console.group('Render -> blogs : Show: Views : PublicView');

                        console.group('attachments');
                        console.log(attachments);
                        console.groupEnd();

                        if(_.isEmpty(this.model.get('attachments'))){

                            console.log('Hide the media div');
                            this.ui.media.hide();

                        }else{

                            var images = attachments.images;

                            console.group('images');
                            console.log(images);
                            console.log(images.lead);
                            console.groupEnd();

                            $(this.ui.media_image).attr('src', images.lead.source_url);

                        }

                        console.groupEnd();
                    }
                });

            });

        return IntranetManager.BlogsManager.Public.Posts.Show.Views;
    });
