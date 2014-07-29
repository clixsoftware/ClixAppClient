/*
 * Application: News Manager
 * */

define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("VacancyManager", function (VacancyManager, IntranetManager, Backbone, Marionette, $, _) {

            VacancyManager.title = "VacancyManager Manager";


            VacancyManager.code = "VacancyManager";

            VacancyManager.startWithParent = false;

            VacancyManager.on('start', function () {
                console.log('<<< Started VacancyManager Application >>>');
            });

            VacancyManager.onStop = function () {
                console.log('<<< Stopped VacancyManager Application >>>');
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.VacancyManager", function (VacancyManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            VacancyManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    ":feature/:alias/vacancies": 'loadHomePage',
               //     ":feature/:alias/vacancies/posts-by-category/*slug": 'loadPostsByCategory',
                //    ":feature/:alias/vacancies/posts-by-category/*slug": 'loadPostsByTag',
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
                initPublic: function (cb) {

                    require([
                        "apps/vacancy/public/common/controller"
                    ], function (CommonController) {
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadHomePage: function (feature, alias) {
                    var options = {
                        feature: feature,
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/vacancy/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.displayHomePage(options);

                        });
                    };
                    IntranetManager.trigger("vacancy:public:init", cb);
                },

                loadPostDetailsPage: function (feature, alias, info) {

                    var post = info.split('-');

                    var postId = post[0];
                    var slug = post[1];

                    var options = {
                        postId: postId,
                        feature: feature,
                        alias: alias,
                        slug: slug
                    };

                    console.log(options);

                    var cb = function () {
                        require([
                            "apps/vacancies/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.displayPostDetails(opts);
                        });
                    };

                    IntranetManager.trigger("vacancy:public:init", cb);

                }/*,

                loadPostsByCategoryPage: function (feature, alias, category, slug) {

                    var options = {
                        feature: feature,
                        alias: alias,
                        category: category
                    };

                    var cb = function () {
                        require([
                            "apps/news/public/entities/categories/show/controller"
                        ], function (ShowController) {
                            ShowController.showLayout(options);
                        });
                    };

                    IntranetManager.trigger("news:public:init", cb);
                },

                loadRecentPosts: function (appId) {
                    require([
                        "apps/news/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(appId);
                    });

                },

                loadPostCategories: function (objectId) {

                   require([
                        "apps/news/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPostCategories(objectId);
                    });

                },

                loadPostRelatedTags: function (objectId) {
                    require([
                        "apps/news/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPostRelatedTagsWidget(objectId);
                    });

                }*/



            };

              //PUBLIC TRIGGERS

            IntranetManager.on('vacancy:public:init', function (cb) {
                API.initPublic(cb);
            });

             //Show Recent News
            IntranetManager.on('vacancy:widget:recent:posts', function (appId) {
                  // API.loadRecentPostsWidget(appId);
            });

            IntranetManager.on('vacancy:widget:post:categories', function (postId) {
               // API.loadPostCategoriesWidget(postId);
            });

            IntranetManager.on('vacancy:widget:post:tags', function (postId) {
              //  API.loadPostTagsWidget(postId);
            });


            IntranetManager.addInitializer(function () {
                new VacancyManagerRouter.Router({
                    controller: API
                });
            });


        });
        console.info('--- Vacancy App loaded ---');
        return IntranetManager.VacancyManagerRouter;
    });

