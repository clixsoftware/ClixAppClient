/*
 * Application: News Manager
 * */

define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("NewsManager", function (NewsManager, IntranetManager, Backbone, Marionette, $, _) {

            NewsManager.title = "NewsManager Manager";


            NewsManager.code = "newsmanager";

            NewsManager.startWithParent = false;

            NewsManager.on('start', function () {
                console.log('<<< Started NewsManager Application >>>');
                // API.init();
            });

            NewsManager.onStop = function () {
                console.log('<<< Stopped NewsManager Application >>>');
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
                    "backend/news": "loadOverview",
                    "backend/news/:appId": "loadAppPostings",
                    "backend/news/:id/posts/new": "loadPostNewForm",
                    "backend/news/:appId/posts/:postId": "loadPostDisplayPage",
                    "backend/news/:appId/posts/:postId/edit": "loadPostEditForm",
                    "backend/news/:appId/posts": "loadAppPostings",
                    /*                    "sites/:alias/news/index.html": 'loadPublicNewsHome',
                     "sites/:appId/news*//*slug": 'loadPostPublicDisplay',*/
                    ":feature/:alias/news": 'loadPublicNewsHome',
                    ":feature/:alias/news/categories/:code/*slug": 'loadPostsByCategory',
                    ":feature/:alias/news/:postId/*slug": 'loadPostPublicDisplay'

                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("NewsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {
                init: function (cb) {

                    require([
                        "apps/news/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },


                loadOverview: function () {

                    this.loadAppsList();

                },

                loadAppsList: function () {

                    var cb = function () {
                        require([
                            "apps/news/entities/apps/list/controller"
                        ], function (ListController) {
                            ListController.listRecords();
                        });
                    };

                    IntranetManager.trigger("news:admin:init", cb);

                },

                loadPostDisplayPage: function (appId, postId) {
                    var opts = {
                        appId: appId,
                        postId: postId
                    };

                    var cb = function () {
                        require([
                            "apps/news/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.loadDisplayPage(opts);
                        });
                    };

                    IntranetManager.trigger("news:admin:init", cb);

                },

                loadPostEditForm: function (appId, postId) {
                    require([
                        "apps/news/entities/posts/edit/controller"
                    ], function (EditController) {
                        EditController.loadForm(postId);
                    });

                },


                loadAppPostings: function (appId) {

                    var cb = function () {
                        require([
                            "apps/news/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.listRecords(appId);
                        });
                    };

                    IntranetManager.trigger("news:admin:init", cb);

                },


                loadPostNewForm: function (id) {
                    require([
                        "apps/news/entities/posts/new/controller"
                    ], function (PostsNewController) {
                        PostsNewController.loadForm(id);
                    });

                },


                loadEditForm: function (id) {
                    require([
                        "apps/site/entities/sites/edit/controller"
                    ], function (EditController) {
                        EditController.loadForm(id);
                    });

                },

                loadAppCategories: function (appId) {

                    require([
                        "apps/news/entities/posts/list/controller"
                    ], function (ListController) {
                        ListController.loadCategories(appId);
                    });

                },


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


                loadPostPublicDisplay: function (feature, alias, postId, slug) {
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


                loadPublicNewsHome: function (feature, alias) {

                    console.log('Showing the news home alias ' + alias);

                    var options = {
                        feature: feature,
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/news/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPublicNewsHome(options);

                        });
                    };

                    IntranetManager.trigger("news:public:init", cb);

                },

                loadPostsByCategory: function(feature, alias, category, slug){
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

                loadTrendingPosts: function (options) {
                    require([
                        "apps/news/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showTrendingPosts(options);
                    });
                },

                loadRecommendedPosts: function (options) {
                    require([
                        "apps/news/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecommendedPosts(options);
                    });
                },

                loadRelatedPosts: function (options) {
                    require([
                        "apps/news/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRelatedPosts(options);
                    });
                },

                loadPublicAppCategories: function (app) {


                    require([
                        "apps/news/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showPublicAppCategories(app);
                    });

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

                },


                loadCategoryHeader: function(options){
                    require([
                        "apps/news/public/entities/categories/show/controller"
                    ], function (ShowController) {
                        ShowController.showCategoryHeader(options);
                    });

                },


                loadCategoryList: function(objectId){
                    require([
                        "apps/news/public/entities/categories/list/controller"
                    ], function (ListController) {
                        ListController.showCategoryList(objectId);
                    });

                }



            };

            IntranetManager.on('news:admin:init', function (cb) {
                console.log('|| Trigger: news:admin:init ||');
                API.init(cb);
            });

            IntranetManager.on('news:admin:home', function () {
                IntranetManager.navigate("sitemanager", true);
                API.loadOverview();
            });

            IntranetManager.on('news:admin:apps:list', function () {
                IntranetManager.navigate("sitemanager", true);
                API.loadOverview();
            });

            IntranetManager.on('news:admin:app:overview', function () {
                IntranetManager.navigate("sitemanager", true);
                API.loadOverview();
            });

            IntranetManager.on('news:admin:app:categories:list', function (appId) {
                API.loadAppCategories(appId);
            });

            IntranetManager.on('news:admin:post:new', function (id) {
                IntranetManager.navigate("newsmanager/applications/" + id + "/posts/new", true);
                API.loadPostNewForm(id);
            });

            IntranetManager.on('news:admin:post:edit', function (id) {
                IntranetManager.navigate("sitemanager/" + id + "/edit", true);
            });

            IntranetManager.on('news:admin:app:posts', function (appId) {
                IntranetManager.navigate("newsmanager/applications/" + appId + '/posts');
                API.loadAppPostings(appId);

            });

            //PUBLIC TRIGGERS

            IntranetManager.on('news:public:init', function (cb) {
                //IntranetManager.navigate("workspace");
                API.initPublic(cb);
            });

            IntranetManager.on('news:public:posts:trending', function (options) {
                console.log('|| Trigger: news:show:public:posts:trending ||');
                API.loadTrendingPosts(options);
            });

            IntranetManager.on('news:public:posts:recommended', function (options) {
                console.log('|| Trigger: news:show:public:posts:recommended ||');
                API.loadRecommendedPosts(options);
            });

            IntranetManager.on('news:public:posts:related', function (options) {
                console.log('|| Trigger: news:show:public:posts:related ||');
                API.loadRelatedPosts(options);
            });

            //Show Recent News
            IntranetManager.on('news:public:posts:recent', function (appId) {
                console.log('|| Trigger: news:public:posts:recent ||');
                API.loadRecentPosts(appId);
            });

            IntranetManager.on('news:public:posts:categories', function (objectId) {
                console.log('<< Trigger: news:public:posts:categories>>');
                API.loadPostCategories(objectId);
            });

            IntranetManager.on('news:post:related:tags', function (objectId) {
                API.loadPostRelatedTags(objectId);
            });

            IntranetManager.on('news:public:category:header', function (options) {
                console.log('|| Trigger: news:public:category:header ||');
                API.loadCategoryHeader(options);
            });

            IntranetManager.on('news:public:category:list', function (objectId) {
                API.loadCategoryList(objectId);
            });


            IntranetManager.addInitializer(function () {
                new NewsManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.NewsManagerRouter;
    });

