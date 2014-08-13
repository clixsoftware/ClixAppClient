/*
 * Application: Project Manager
 * */

define(
    [
        "app",
        "S"
    ],
    function (IntranetManager, S) {
        IntranetManager.module("VacancyManager", function (VacancyManager, IntranetManager, Backbone, Marionette, $, _) {

            VacancyManager.title = "Vacancy Manager";


            VacancyManager.code = "VacancyManager";

            VacancyManager.startWithParent = false;

            VacancyManager.on('start', function () {
                console.info('<<< Start VacancyManager Application >>>');
                // API.init();
            });

            VacancyManager.onStop = function () {
                console.warn('<<< Stop VacancyManager Application >>>');
            };

            var API = {

                init: function () {
                    require([
                        "apps/vacancy/common/controller"
                    ], function (CommonController) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.VacancyManager", function (ProjectManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ProjectManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {

                    ":feature/:alias/vacancies": 'loadHomePage',
                    ":feature/:alias/vacancies/posts-by-category/*slug?*args" : 'loadHomePage',
                    ":feature/:alias/vacancies/posts-by-tag/*tag(?*args)" : 'loadPostByTag',
                    ":feature/:alias/vacancies/*info": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("VacancyManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS
                //initialize public interface and load the layout

                //initPublic, initiates the application, loads settings
                initPublic: function (cb) {

                    require([
                        "apps/vacancy/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupContentLayout, cb);
                    });

                },

                /*
                 loadPostDetailsPage, loads details for the current post
                 e.g.     /vacancy/default/vacancy/9-sample-project/index.html
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
                            "apps/vacancy/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("vacancy:public:init", cb);

                },

                /*
                 loadPostByTag, loads posts matching the current tags
                 e.g.     /vacancy/default/posts-by-tag/travel
                 */
                loadPostByTag: function (feature, alias, tag, args) {

                    console.group('Vacancy: App: loadPostByTag');

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
                            "apps/vacancy/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("vacancy:public:init", cb);

                },

                /*
                 loadHomePage, loads posts matching the current tags
                 e.g.     /vacancy/default
                 */
                loadHomePage: function (feature, alias, slug, args) {

                    console.group('Vacancy: App: loadHomePage');

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
                            "apps/vacancy/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };

                    IntranetManager.trigger("vacancy:public:init", cb);

                },

                /*
                 loadRecentPostsWidget, recent posts for this project
                 */
                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/vacancy/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });
                },

                /*
                 loadPopularPostsWidget, most viewed posts for vacancy
                 */
                loadPopularPostsWidget: function(options){
                    require([
                        "apps/vacancy/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPopularPosts(options);
                    });
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('vacancy:public:init', function (cb) {
                API.initPublic(cb);
            });

            //Show Recent vacancy
            IntranetManager.on('vacancy:posts:recent', function (options) {
                console.group('vacancy App::  vacancy:posts:recent');
                console.info(options);
                console.groupEnd();

                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('vacancy:category:posts', function (options) {
                console.group('vacancy App::  vacancy:category:posts');
                console.info(options);
                console.groupEnd();

                IntranetManager.navigate(options.url, true);
            });

            IntranetManager.on('vacancy:popular:posts', function (options) {
                console.group('vacancy App::  vacancy:popular:posts');
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

