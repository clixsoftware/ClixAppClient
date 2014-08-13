/*
 * Application: Project Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("CalendarManager", function (CalendarManager, IntranetManager, Backbone, Marionette, $, _) {

            CalendarManager.title = "Calendar Manager";


            CalendarManager.code = "CalendarManager";

            CalendarManager.startWithParent = false;

            CalendarManager.on('start', function () {
                console.info('<<< Start CalendarManager Application >>>');
                // API.init();
            });

            CalendarManager.onStop = function () {
                console.warn('<<< Stop CalendarManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/calendar/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.CalendarManager", function (ProjectManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    ":feature/:alias/calendar": 'loadHomePage',
                    ":feature/:alias/calendar/posts-by-category/*slug?*args" : 'loadHomePage',
                    ":feature/:alias/calendar/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    ":feature/:alias/calendar/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("CalendarManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/calendar/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /calendar/default/calendar/9-sample-project/index.html
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
                            "apps/calendar/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("calendar:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /calendar/default/posts-by-tag/travel
                 */
                loadPostByTag: function (feature, alias, tag, args) {

                    console.group('Calendar: App: loadPostByTag');

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
                            "apps/calendar/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("calendar:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /calendar/default
                 */
                loadHomePage: function (feature, alias, slug, args) {

                    console.group('Calendar: App: loadHomePage');

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
                            "apps/calendar/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("calendar:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this project
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/calendar/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for calendar
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/calendar/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('calendar:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent calendar
            IntranetManager.on('calendar:posts:recent', function (options) {
                console.group('calendar App::  calendar:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('calendar:category:posts', function (options) {
                console.group('calendar App::  calendar:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('calendar:popular:posts', function (options) {
                console.group('calendar App::  calendar:popular:posts');
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

