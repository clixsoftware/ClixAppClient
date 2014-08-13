/*
 * Application: Project Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("BlogsManager", function (BlogsManager, IntranetManager, Backbone, Marionette, $, _) {

            BlogsManager.title = "Blogs Manager";


            BlogsManager.code = "BlogsManager";

            BlogsManager.startWithParent = false;

            BlogsManager.on('start', function () {
                console.info('<<< Start BlogsManager Application >>>');
                // API.init();
            });

            BlogsManager.onStop = function () {
                console.warn('<<< Stop BlogsManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/blogs/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.BlogsManager", function (ProjectManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    ":feature/:alias/blogs": 'loadHomePage',
                    ":feature/:alias/blogs/posts-by-category/*slug?*args" : 'loadHomePage',
                    ":feature/:alias/blogs/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    ":feature/:alias/blogs/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("BlogsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/blogs/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /blogs/default/blogs/9-sample-project/index.html
                 */
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
                            "apps/blogs/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("blogs:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /blogs/default/posts-by-tag/travel
                 */
                loadPostByTag: function (feature, alias, tag, args) {

                    console.group('blogs: App: loadPostByTag');

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
                            "apps/blogs/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("blogs:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /blogs/default
                 */
                loadHomePage: function (feature, alias, slug, args) {

                    console.group('blogs: App: loadHomePage');

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
                            "apps/blogs/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("blogs:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this project
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/blogs/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for blogs
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/blogs/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('blogs:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent blogs
            IntranetManager.on('blogs:posts:recent', function (options) {
                console.group('blogs App::  blogs:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('blogs:category:posts', function (options) {
                console.group('blogs App::  blogs:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('blogs:popular:posts', function (options) {
                console.group('blogs App::  blogs:popular:posts');
                console.info(options);
                console.groupEnd();

                API.loadPopularPostsWidget(options);
            });

            IntranetManager.addInitializer(function () {
                new ProjectManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.ProjectManagerRouter;
    });

