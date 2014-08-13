define([
    "app",
    "apps/blogs/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, PostShowViews) {

    IntranetManager.module("BlogsManager.Public.Posts.Show",
        function (Show, BlogsManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getPostLayoutView: function () {
                    return new PostShowViews.PostLayoutView();

                },

                getPublicView: function (post) {
                    return new PostShowViews.PublicView({
                        model: post
                    });
                },

                showPostDetails: function (opts) {

                    console.group('<< blogs: List: showPostDetailss  >>');

                    console.group('blogs Options');
                    console.log(opts);
                    console.groupEnd();

                    var that = this;

                    require(['entities/applications', 'entities/blogs'], function () {

                        var options = {
                            alias: opts.alias,
                            parent_feature: BlogsManager.feature.id
                        };

                        console.group('@@ Fetching blogs Application ' );
                        console.log(options);
                        console.groupEnd();

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function (app) {
                            console.group('blogs App');
                            console.log(app);
                            console.groupEnd();

                            var fetchingPost = IntranetManager.request("blogs:app:posts:entity", {
                                id: opts.post_id,
                                parent_application: app.id
                            });

                            return fetchingPost.then(function (post) {

                                var layout = that.getPostLayoutView();

                                IntranetManager.layoutContent.reset();
                                IntranetManager.layoutContent.show(that.getPublicView(post));

                                IntranetManager.trigger('dom:title', post.get('title'));

                                return [post, app];

                            }).spread(function (post, app) {

                                var appUrls = app.get('urls');

                                IntranetManager.trigger('core:object:categories', {
                                    collection: post.get('taxonomy'),
                                    url:  '/sites' + app.get('path') + '/posts-by-category/{{slug}}?uuid={{uuid}}',
                                    urlTrigger: "blogs:category:posts"
                                });

                                IntranetManager.trigger('core:object:tags', {
                                    collection: post.get('taxonomy'),
                                    url: '/sites' + app.get('path') + '/posts-by-tag/{{slug}}'
                                });

                                IntranetManager.trigger('blogs:posts:recent', {parent_application: app.id});

                                IntranetManager.trigger('blogs:popular:posts', {parent_application: app.id});

                                IntranetManager.trigger('core:object:breadcrumbs', {
                                    crumbs: [
                                        {title: app.get('title'), url:appUrls.friendly.href},
                                        {title: post.get('short_title'), url:''}
                                    ]
                                });

                            }).fail(function (err) {
                                IntranetManager.trigger('core:error:action', err);

                            });

                        });

                    });


                }
            }

        });

    return IntranetManager.BlogsManager.Public.Posts.Show.Controller;
});

