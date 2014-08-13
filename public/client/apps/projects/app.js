/*
 * Application: Project Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("ProjectManager", function (ProjectManager, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManager.title = "ProjectManager Manager";


            ProjectManager.code = "ProjectManager";

            ProjectManager.startWithParent = false;

            ProjectManager.on('start', function () {
                console.info('<<< Start ProjectManager Application >>>');
                // API.init();
            });

            ProjectManager.onStop = function () {
                console.warn('<<< Stop ProjectManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/projects/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.ProjectManager", function (ProjectManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    "projects/:alias": 'loadHomePage',
                    "projects/:alias/posts-by-category/*slug?*args" : 'loadHomePage',
                    "projects/:alias/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    "projects/:alias/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("ProjectManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/projects/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /projects/default/projects/9-sample-project/index.html
                 */
                loadPostDetailsPage: function ( alias, info) {

                    console.group("Projects : App :: loadPostDetailsPage");

                    var t = info.split('-');

                    var postId = t[0];
                    var slug = t[1];

                    var opts = {
                        post_id: postId,
                        feature: "projects",
                        alias: alias,
                        slug: slug
                    };

                    console.info(opts);
                    console.groupEnd();


                    var cb = function () {
                        require([
                            "apps/projects/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("projects:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /projects/default/posts-by-tag/travel
                 */
                loadPostByTag: function (alias, tag, args) {

                    console.group('Projects : App :: loadPostByTag');

                    var options = {
                        feature: "projects",
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
                            "apps/projects/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("projects:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /projects/default
                 */
                loadHomePage: function ( alias, slug, args) {

                    console.group('Projects : App:: loadHomePage');

                    var options = {
                        feature: 'projects',
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
                            "apps/projects/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("projects:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this project
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/projects/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for projects
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/projects/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('projects:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent projects
            IntranetManager.on('projects:posts:recent', function (options) {
                console.group('projects App::  projects:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('projects:category:posts', function (options) {
                console.group('projects App::  projects:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('projects:popular:posts', function (options) {
                console.group('projects App::  projects:popular:posts');
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

