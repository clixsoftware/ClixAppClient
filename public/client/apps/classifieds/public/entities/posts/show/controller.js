define([
    "app",
    "apps/classifieds/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, PostShowViews) {

    IntranetManager.module("ClassifiedsManager.Posts.Show",
        function (Show, ClassifiedsManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getPostLayoutView: function () {
                    return new PostShowViews.PostLayoutView();

                },

                getImageView: function (post) {
                    return new PostShowViews.ImageView({
                        model: post
                    })

                },

                getPostView: function (post) {
                    return new PostShowViews.PostView({
                        model: post
                    })

                },

                getSidebarView: function (post) {
                    return new PostShowViews.SidebarView({
                        model: post
                    });
                },

                getHeaderView: function (post) {
                    var view = new PostShowViews.HeaderView({
                        model: post
                    });

                    view.on('form:delete', function () {
                        alert('ready to delete');
                    });

                    return view;
                },


                getStatsView: function (post) {
                    return new PostShowViews.StatsView({
                        model: post
                    });
                },

                getPublicView: function (post) {
                    return new PostShowViews.PublicView({
                        model: post
                    });
                },

                getPublicViewHeader: function (post) {
                    return new PostShowViews.PublicViewHeader({
                        model: post
                    });
                },


                showPostDetailsPage: function (opts) {
                    // alert('showing a public news post' + opts.slug);
                    var that = this;
                    IntranetManager.layoutHeader.reset();
                    IntranetManager.layoutSearch.reset();
                    require(['entities/applications', 'entities/classifieds'], function () {

                        //IntranetManager.trigger('news:public:posts:recent', null);
                        var options = {
                            alias: opts.alias,
                            parent_feature: ClassifiedsManager.feature.id
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
                                console.log('Fetching article post');

                                var fetchingPost = IntranetManager.request("classifieds:posts:entity", opts.postId);

                                return    fetchingPost.then(function (post) {

                                    var layout = that.getPostLayoutView();

                                    layout.on('show', function () {

                                        //layout.postMedia.show(that.getImageView(fetchedPost));

                                        layout.layoutContent.show(that.getPublicView(post));

                                    });

                                    //  IntranetManager.layoutHeader.show( that.getPublicViewHeader(fetchedPost) );

                                    //   IntranetManager.layoutContent.show(that.getPublicView(post));

                                    IntranetManager.siteMainContent.reset();
                                   // IntranetManager.siteMainContent.show(that.getPublicView(post));
                                    IntranetManager.siteMainContent.show(layout);

                                    IntranetManager.trigger('dom:title', post.get('title'));

                                    return [post, app];

                                });

                            }).spread(function (post, app) {


                               // alert('post fetched and returned');
                                IntranetManager.trigger('classifieds:public:action:menu');
                                IntranetManager.trigger('classifieds:widget:recent:posts', {limit: 5});

                            var categories = app.get('taxonomy');
                                IntranetManager.trigger('core:object:categories', {
                                    collection: categories,
                                    url: '/classifieds/posts-by-category/{{slug}}'
                                });

                            var taxoptions = {
                                parentFeature: post.get('parent_application_feature'),
                                appFeature: 'news',
                                appAlias: post.get('parent_application_alias'),
                                parentId: post.get('parent_application'),
                                objectId: post.get('uuid'),
                                categories: post.get('categories'),
                                tags: post.get('tags'),
                                url: app.get('path')
                            };
                            var taxoptions2 = {
                                parentFeature: post.get('parent_application_feature'),
                                appFeature: 'news',
                                appAlias: post.get('parent_application_alias'),
                                parentId: post.get('parent_application'),
                                objectId: post.get('uuid'),
                                categories: post.get('categories'),
                                tags: post.get('tags'),
                                url: ''
                            };

                           // IntranetManager.trigger('core:object:categories', taxoptions );
                           // IntranetManager.trigger('core:object:tags', taxoptions2);
                            //IntranetManager.trigger('core:object:image:gallery', newspost.get("attachments"));


                         //  IntranetManager.trigger('news:public:posts:recent', newspost.get('parent_application'));

                            }).fail(function (err) {
                                IntranetManager.trigger('core:error:action', err);

                            });

                    });

                }



            }
        });

    return IntranetManager.ClassifiedsManager.Posts.Show.Controller;
});

