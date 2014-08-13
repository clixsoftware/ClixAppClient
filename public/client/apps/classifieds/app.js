/*
 * Application: Project Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("ClassifiedsManager", function (ClassifiedsManager, IntranetManager, Backbone, Marionette, $, _) {

            ClassifiedsManager.title = "ClassifiedsManager Manager";


            ClassifiedsManager.code = "ClassifiedsManager";

            ClassifiedsManager.startWithParent = false;

            ClassifiedsManager.on('start', function () {
                console.info('<<< Start ClassifiedsManager Application >>>');
                // API.init();
            });

            ClassifiedsManager.onStop = function () {
                console.warn('<<< Stop ClassifiedsManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/classifieds/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.ClassifiedsManager", function (ProjectManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "classifieds": 'loadAppsPage',
                    "classifieds/new": 'loadPostNewForm',
                    "classifieds/:alias": 'loadHomePage',
                    "classifieds/:alias/posts-by-category/*slug?*args" : 'loadHomePage',
                    "classifieds/:alias/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    "classifieds/:alias/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("ClassifiedsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/classifieds/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                loadAppsPage: function () {

                    var cb = function () {
                        require([
                            "apps/classifieds/public/entities/apps/list/controller"
                        ], function ( ListController ) {
                            ListController.loadAppsHome();
                        });
                    };

                    //alert('load apps');
                    IntranetManager.trigger("classifieds:public:init", cb);

                },

                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /classifieds/default/classifieds/9-sample-project/index.html
                 */
                loadPostDetailsPage: function ( alias, info) {

                    console.group("Classifieds : App :: loadPostDetailsPage");

                    var t = info.split('-');

                    var postId = t[0];
                    var slug = t[1];

                    var opts = {
                        post_id: postId,
                        feature: "classifieds",
                        alias: alias,
                        slug: slug
                    };

                    console.info(opts);
                    console.groupEnd();


                    var cb = function () {
                        require([
                            "apps/classifieds/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("classifieds:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /classifieds/default/posts-by-tag/travel
                 */
                loadPostByTag: function (alias, tag, args) {

                    console.group('Classifieds : App :: loadPostByTag');

                    var options = {
                        feature: "classifieds",
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
                            "apps/classifieds/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("classifieds:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /classifieds/default
                 */
                loadHomePage: function ( alias, slug, args) {

                    console.group('Classifieds : App:: loadHomePage');

                    var options = {
                        feature: 'classifieds',
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
                            "apps/classifieds/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("classifieds:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this project
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/classifieds/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for classifieds
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/classifieds/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                },

                loadActionMenu: function (objectId) {
                    require([
                        "apps/classifieds/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayActionMenu();
                    });

                },

                loadPostNewForm: function(){
                //alert('loadpostnewform');
                    var cb = function () {
                        require([
                            "apps/classifieds/public/entities/posts/new/controller"
                        ], function (NewController) {
                            NewController.displayPostNewForm();
                        });
                    };

                    IntranetManager.trigger("classifieds:public:init", cb);


                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('classifieds:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent classifieds
            IntranetManager.on('classifieds:posts:recent', function (options) {
                console.group('classifieds App::  classifieds:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('classifieds:category:posts', function (options) {
                console.group('classifieds App::  classifieds:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('classifieds:popular:posts', function (options) {
                console.group('classifieds App::  classifieds:popular:posts');
                console.info(options);
                console.groupEnd();

                API.loadPopularPostsWidget(options);
            });

            IntranetManager.on('classifieds:public:action:menu', function () {
                console.group('classifieds App::  classifieds:public:action:menu');
                console.groupEnd();
                API.loadActionMenu();
            });

            IntranetManager.addInitializer(function () {
                new ProjectManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.ProjectManagerRouter;
    });

