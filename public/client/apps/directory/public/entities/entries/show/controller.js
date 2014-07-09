define([
    "app",
    "apps/directory/public/entities/entries/show/views"
], function (IntranetManager, PostShowViews) {

    IntranetManager.module("DirectoryManager.Posts.Show",
        function (Show, DirectoryManager, Backbone, Marionette, $, _) {

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

                getTitleView: function (post) {
                    return new PostShowViews.TitleView({
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


                showPublicProfile: function (opts) {

                    //  alert('load show public profile');
                    var that = this;

                    console.log('Showing the ShowPublicProfile');
                    require(['entities/applications', 'entities/dir_entry'], function () {

                        var options = {
                            alias: opts.appAlias,
                            parent_feature: DirectoryManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {
                            console.log(app);

                            //IntranetManager.appLayout = Show.Controller.getPostLayoutView();

                            // IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            //  IntranetManager.trigger('home:news:posts', alias);
                            //IntranetManager.trigger('dom:title', app.get('title'));
                            return app;

                        }).then(function (app) {

                                var fetchingPost = IntranetManager.request("directory:contact:single:alias", opts.user_alias);

                                return fetchingPost.then(function (results) {

                                    //var post = results.at(0);
                                    var post = results;

                                    if (!post) {
                                        console.log('no record found');
                                    } else {
                                        console.log(post);
                                    }


                                    var layout = that.getPostLayoutView();

                                    layout.on('show', function () {
                                        layout.postContent.show(that.getPublicView(post));
                                        layout.postRelated.show(that.getSidebarView(post));
                                        layout.postMedia.show(that.getImageView(post));
                                        layout.postTitle.show(that.getTitleView(post));
                                    });


                                    IntranetManager.trigger('dom:title', post.get('title'));
                                    IntranetManager.appLayout = layout;


                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    //build post addons

                                    //IntranetManager.trigger('news:public:posts:recommended');
                                    //ntranetManager.trigger('news:public:posts:related');

                                    return post;

                                });

                            }).then(function (post) {
                                // alert('post fetched and returned');
                                IntranetManager.trigger('home:breadcrumb:show');

                                //  IntranetManager.trigger('yp:public:posts:related', post.get('parent_application'));

                            }).fail(function (err) {
                                console.log('an error occurred ' + err);
                            });


                    });

                },

                loadDisplayPage: function (opts) {

                    console.group('NewsManager: Posts: loadDisplayPage');

                    var that = this;
                    require([
                        "entities/news_post"
                    ], function () {

                        var fetchingPost = IntranetManager.request("news:posts:entity", opts.postId);
                        console.log('post id ' + opts.postId);

                        $.when(fetchingPost).done(function (post) {

                            console.log(JSON.stringify(post));

                            if (post) {

                                IntranetManager.layoutContent.show(that.getPostView(post));

                                IntranetManager.layoutZone1.show(that.getSidebarView(post));

                                IntranetManager.layoutHeader.show(that.getHeaderView(post));

                                IntranetManager.layoutZone2.show(that.getStatsView(post));


                                //close out search

                                IntranetManager.layoutSearch.reset();

                            } else {

                                console.error('TODO: no record found view');
                            }
                        });

                    });

                    console.groupEnd();

                }


            }
        });

    return IntranetManager.DirectoryManager.Posts.Show.Controller;
});

