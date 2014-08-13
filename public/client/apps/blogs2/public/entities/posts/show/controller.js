define([
    "app",
    "apps/blogs/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, PostsShowViews) {

    IntranetManager.module("BlogsManager.Public.Blogs.Show",
        function (Show, BlogsManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDetailsView: function (post) {
                    return new PostsShowViews.DetailsView({
                        model: post
                    });

                },

                showPostDetailsPage: function (opts) {
                    // alert('showing a public news post' + opts.slug);
                    var that = this;

                    require(['entities/applications', 'entities/blogs'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: BlogsManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {
                            console.log(app);

                            //IntranetManager.appLayout = Show.Controller.getPostLayoutView();

                            // IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            //  IntranetManager.trigger('home:news:posts', alias);
                            //IntranetManager.trigger('dom:title', app.get('title'));
                            return app;

                        }).then(function (app) {

                                var fetchingPost = IntranetManager.request("blogs:post", opts.id);

                                IntranetManager.trigger('blogs:recent:posts', {
                                    applicationId: app.get('id')
                                })  ;

                                return    fetchingPost.then(function (post) {
                                    console.log(post);

                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getDetailsView(post));

                                    IntranetManager.trigger('dom:title', post.get('title'));

                                    return post;

                                });

                            }).then(function (post) {

                                var createdBy = post.get('created_by');
                                IntranetManager.trigger('blogs:post:profile', createdBy.id);


                            }).fail(function (err) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },



            }
        });

    return IntranetManager.BlogsManager.Public.Blogs.Show.Controller;
});

