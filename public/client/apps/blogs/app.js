define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("BlogsManager", function (BlogsManager, IntranetManager, Backbone, Marionette, $, _) {

            BlogsManager.title = "BlogsManager Manager";


            BlogsManager.code = "blogs";

            BlogsManager.startWithParent = false;

            BlogsManager.on('start', function () {
                console.log('<<< Started BlogsManager Application >>>');
                // API.init();
            });

            BlogsManager.onStop = function () {
                console.log('<<< Stopped BlogsManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.BlogsManager", function (BlogsManagerRouter,
                                                                 IntranetManager, Backbone, Marionette, $, _) {

            BlogsManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    ":feature/:alias/blog": 'loadPostList',
                    ":feature/:alias/blog/index.html": 'loadPostList',
                    ":feature/:alias/blog/:id/*slug": 'loadPostDetails'

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
                initPublic: function (cb) {

                    require([
                        "apps/blogs/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadPostDetails: function (feature, alias, id, slug) {
                    var opts = {
                        id: id,
                        feature: feature,
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/blogs/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("blogs:public:init", cb);

                },


                loadPostList: function (feature, alias) {

                    var options = {
                        feature: feature,
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/blogs/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostListPage(options);

                        });
                    };

                    IntranetManager.trigger("blogs:public:init", cb);

                },

                loadRecentPostsWidget: function (options) {
                    require([
                        "apps/blogs/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showRecentPosts(options);
                    });

                },

                loadUserProfileWidget: function (profileId) {
                    require([
                        "apps/blogs/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showUserProfile(profileId);
                    });

                },

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('blogs:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.on('blogs:recent:posts', function (options) {
                API.loadRecentPostsWidget(options);
            });

            IntranetManager.on('blogs:post:profile', function (profileId) {
                API.loadUserProfileWidget(profileId);
            });

            IntranetManager.addInitializer(function () {
                new BlogsManagerRouter.Router({
                    controller: API
                });
            });


        });
        console.info('--- Blogs App loaded ---');
        return IntranetManager.BlogsManagerRouter;
    });

