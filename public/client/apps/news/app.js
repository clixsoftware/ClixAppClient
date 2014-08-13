/*
 * Application: News Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("NewsManager", function (NewsManager, IntranetManager, Backbone, Marionette, $, _) {

            NewsManager.title = "NewsManager Manager";


            NewsManager.code = "newsmanager";

            NewsManager.startWithParent = false;

            NewsManager.on('start', function () {
                console.info('<<< Start NewsManager Application >>>');
                // API.init();
            });

            NewsManager.onStop = function () {
                console.warn('<<< Stopp NewsManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/news/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.NewsManager", function (NewsManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            NewsManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    ":feature/:alias/news": 'loadHomePage',
                    ":feature/:alias/news/posts-by-category/*slug?*args" : 'loadHomePage',
                    ":feature/:alias/news/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    ":feature/:alias/news/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("NewsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                initPublic: function (cb) {

                    require([
                        "apps/news/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                loadPostDetailsPage: function (feature, alias, info) {

                    var newsInfo = info.split('-');

                    var postId = newsInfo[0];
                    var slug = newsInfo[1];
                    //alert(postId);
                    var opts = {
                        post_id: postId,
                        feature: feature,
                        alias: alias,
                        slug: slug
                    };

                    console.log(opts.slug);

                    var cb = function () {
                        require([
                            "apps/news/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPublicNewsPost(opts);
                        });
                    };

                    IntranetManager.trigger("news:public:init", cb);

                },

                loadPostByTag: function (feature, alias, tag, args) {

                    console.group('News: App: loadPostByTag');

                    var options = {
                        feature: feature,
                        alias: alias,
                        path: Backbone.history.location.pathname,
                        tag: tag
                    };

                    if(args){

                        if(S(args).contains('page=')){
                            var q = args.split('&');
                            options.page = q[0].split('=')[1];
                        }

                        options.path = Backbone.history.location.pathname;
                    }
                    console.info(options);
                    console.groupEnd();

                    var cb = function () {
                        require([
                            "apps/news/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("news:public:init", cb);

                },

                loadHomePage: function (feature, alias, slug, args) {

                    console.group('News: App: loadPublicNewsHome');

                    var options = {
                        feature: feature,
                        alias: alias,
                        path: Backbone.history.location.pathname
                    };

                    if(args){
                    if(S(args).contains('page=')){
                        var q = args.split('&');
                        options.page = q[1].split('=')[1];
                        options.uuid = q[0].split('=')[1];
                    }else{
                        options.uuid=  args.split('=')[1]
                    }

                    options.path = Backbone.history.location.pathname + '?uuid=' + options.uuid;
                    }
                    console.info(options);
                    console.groupEnd();

                    var cb = function () {
                        require([
                            "apps/news/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("news:public:init", cb);

                },

                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/news/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                loadPopularPostsWidget: function(options){
                    require([
                        "apps/news/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('news:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent News
            IntranetManager.on('news:posts:recent', function (options) {
                console.group('News App: trigger: news:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('news:category:posts', function (options) {


                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('news:popular:posts', function (options) {
                API.loadPopularPostsWidget(options);
            });

            IntranetManager.addInitializer(function () {
                new NewsManagerRouter.Router({
                    controller: API
                });
            });


        });
        console.info('--- News App loaded ---');
        return IntranetManager.NewsManagerRouter;
    });

