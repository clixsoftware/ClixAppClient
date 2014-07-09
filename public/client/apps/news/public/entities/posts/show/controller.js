define([
    "app",
    "apps/news/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, PostShowViews) {

    IntranetManager.module("NewsManager.Posts.Show",
        function (Show, NewsManager, Backbone, Marionette, $, _) {

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


                showPublicNewsPost: function (opts) {
                    // alert('showing a public news post' + opts.slug);
                    var that = this;

                    require(['entities/applications', 'entities/news'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: NewsManager.feature.id
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

                                var fetchingPost = IntranetManager.request("news:posts:entity", opts.post_id);

                                return    fetchingPost.then(function (post) {
                                   // console.log(post);

                                    var newspost = post;

                                    //console.log(newspost);


                                    var layout = that.getPostLayoutView();

                                    layout.on('show', function () {

                                        //layout.postMedia.show(that.getImageView(fetchedPost));

                                        // layout.postContent.show(that.getPublicView(post));

                                    });

                                    //  IntranetManager.layoutHeader.show( that.getPublicViewHeader(fetchedPost) );

                                    //   IntranetManager.layoutContent.show(that.getPublicView(post));
                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getPublicView(newspost));

                                    IntranetManager.trigger('dom:title', newspost.get('title'));

                                    return newspost;

                                });

                            }).then(function (newspost) {


                               // alert('post fetched and returned');
                             //   IntranetManager.trigger('news:public:posts:categories', newspost.get('uuid'));


                            var taxoptions = {
                                parentFeature: newspost.get('parent_application_feature'),
                                appFeature: 'news',
                                appAlias: newspost.get('parent_application_alias'),
                                parentId: newspost.get('parent_application'),
                                objectId: newspost.get('uuid'),
                                categories: newspost.get('categories'),
                                tags: newspost.get('tags'),
                                url: ''
                            };
                            var taxoptions2 = {
                                parentFeature: newspost.get('parent_application_feature'),
                                appFeature: 'news',
                                appAlias: newspost.get('parent_application_alias'),
                                parentId: newspost.get('parent_application'),
                                objectId: newspost.get('uuid'),
                                categories: newspost.get('categories'),
                                tags: newspost.get('tags'),
                                url: ''
                            };

                            IntranetManager.trigger('core:object:categories', taxoptions );
                            IntranetManager.trigger('core:object:tags', taxoptions2);
                            IntranetManager.trigger('core:object:image:gallery', newspost.get("attachments"));


                            IntranetManager.trigger('news:public:posts:recent', newspost.get('parent_application'));

                            }).fail(function (err) {
                                //alert(' an error occurred ' + err);
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

                               // IntranetManager.layoutZone1.show(that.getSidebarView(post));

                               // IntranetManager.layoutHeader.show(that.getHeaderView(post));

                                //IntranetManager.layoutZone2.show(that.getStatsView(post));


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

    return IntranetManager.NewsManager.Posts.Show.Controller;
});

