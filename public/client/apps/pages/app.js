define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("PageManager", function (PageManager, IntranetManager, Backbone, Marionette, $, _) {

            PageManager.title = "PageManager";


            PageManager.code = "pages";

            PageManager.startWithParent = false;

            PageManager.on('start', function () {
                console.log('<<< Started CalendarManager Application >>>');
                // API.init();
            });

            PageManager.onStop = function () {
                console.log('<<< Stopped PageManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.PageManager", function (PageManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            PageManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    ":feature/:alias/pages": 'loadPostList',
                    ":feature/:alias/pages/index.html": 'loadPostList',
                    ":feature/:alias/pages/:id/*slug": 'loadPostDetails'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("PageManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/pages/public/common/controller"
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
                            "apps/pages/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("pages:public:init", cb);

                },


                loadPostList:function (feature, alias) {

                    var options = {
                        feature: feature,
                        alias: alias
                    };
                    var cb = function () {
                        require([
                            "apps/pages/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostListPage(options);

                        });
                    };
                    IntranetManager.trigger("pages:public:init", cb);
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('pages:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.addInitializer(function () {
                new PageManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.PageManagerRouter;
    });

