/*
 * Application: Project Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("ForumsManager", function (ForumsManager, IntranetManager, Backbone, Marionette, $, _) {

            ForumsManager.title = "Forums Manager";


            ForumsManager.code = "ForumsManager";

            ForumsManager.startWithParent = false;

            ForumsManager.on('start', function () {
                console.info('<<< Start ForumsManager Application >>>');
                // API.init();
            });

            ForumsManager.onStop = function () {
                console.warn('<<< Stop ForumsManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/forums/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.ForumsManager", function (ProjectManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    ":feature/:alias/forums": 'loadHomePage',
/*                    ":feature/:alias/forums/posts-by-category*//*slug?*args" : 'loadHomePage',
                    ":feature/:alias/forums/posts-by-tag*//*tag(?*args)" : 'loadPostByTag',*/
                    ":feature/:alias/forums/:info": 'loadCategoriesPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("ForumsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/forums/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                loadCategoriesPage:function (feature, alias, info) {
                    console.group('Projects : App:: loadCategoriesPage');
                    var newsInfo = info.split('-');

                    var postId = newsInfo[0];
                    var slug = newsInfo[1];
                    //alert(postId);
                    var options = {
                        post_id: postId,
                        feature: feature,
                        alias: alias,
                        slug: slug
                    };

                    console.info(options);
                    console.groupEnd();

                    var cb = function () {
                        require([
                            "apps/forums/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showCategoryList(options);
                        });
                    };

                    IntranetManager.trigger("forums:public:init", cb);

                },
                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /forums/default/forums/9-sample-project/index.html
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
                            "apps/forums/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("forums:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /forums/default/posts-by-tag/travel
                 */
                loadPostByTag: function (feature, alias, tag, args) {

                    console.group('forums: App: loadPostByTag');

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
                            "apps/forums/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("forums:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /forums/default
                 */
                loadHomePage: function (feature, alias, slug, args) {

                    console.group('forums: App: loadHomePage');

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
                            "apps/forums/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("forums:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this project
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/forums/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for forums
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/forums/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('forums:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent forums
            IntranetManager.on('forums:posts:recent', function (options) {
                console.group('forums App::  forums:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('forums:category:posts', function (options) {
                console.group('forums App::  forums:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('forums:popular:posts', function (options) {
                console.group('forums App::  forums:popular:posts');
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

