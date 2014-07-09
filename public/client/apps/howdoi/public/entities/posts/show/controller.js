define([
    "app",
    "apps/howdoi/public/entities/posts/show/views"
], function ( IntranetManager, PostShowViews ) {

    IntranetManager.module("HowDoIManager.Public.Posts.Show",
        function ( Show, HowDoIManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getPostLayoutView: function () {
                    return new PostShowViews.PostLayoutView();

                },


                getPublicView: function ( post ) {
                    return new PostShowViews.PublicView({
                        model: post
                    });
                },

                getPublicViewHeader: function ( post ) {
                    return new PostShowViews.PublicViewHeader({
                        model: post
                    });
                },


                showPostDetailsPage: function ( opts ) {
                    // alert('showing a public news post' + opts.slug);
                    var that = this;

                    require(['entities/applications', 'entities/howdoi'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: HowDoIManager.feature.id
                        };

                        console.log('@@ Fetching Current Applicaiton using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function ( app ) {
                            console.log(app);

                            return app;

                        }).then(function ( app ) {
                                console.log('Fetching article post');

                                var fetchingPost = IntranetManager.request("howdoi:posts:entity", opts.post_id);

                                return fetchingPost.then(function ( post ) {

                                    console.log(post);

                                    var layout = that.getPostLayoutView();

                                    layout.on('show', function () {

                                    });


                                    IntranetManager.trigger('dom:title', post.get('title'));
                                    IntranetManager.appLayout = layout;

                                     IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getPublicView(post));


                                    //build post addons

                                    //IntranetManager.trigger('news:public:posts:recommended');
                                    //ntranetManager.trigger('news:public:posts:related');

                                    return post;

                                });

                            }).then(function ( post ) {
                                // alert('post fetched and returned');
                                IntranetManager.trigger('home:breadcrumb:show');
                                IntranetManager.trigger('howdoi:post:related:categories', post.get('uuid'));

                            IntranetManager.trigger('howdoi:post:related:tags', post.get('uuid'));

                        }).fail(function ( err ) {
                                console.log('an error occurred ' + err);
                            });


                    });

                }


            }
        });

    return IntranetManager.HowDoIManager.Public.Posts.Show.Controller;
});

