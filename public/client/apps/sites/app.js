/*
 * Application: Homepage Manager
 * File: Home page Manager
 * */

define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("SiteManager", function (SiteManager, IntranetManager, Backbone, Marionette, $, _) {

            SiteManager.startWithParent = false;

            SiteManager.on("start", function () {
                //API.init();
                console.info('SiteManager.on.start"');
            });

            SiteManager.onStop = function () {
                $('body').removeClass('home');
                console.log("stopping SiteManager");
            };

            var API = {
                init: function () {
                    require([
                        "apps/sites/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        CommonController.setupAppLayout();
                    });

                },
                showMenu: function () {
                    // ShowController.loadMenu();
                }
            };


        });

        IntranetManager.module("Routers.SiteManager", function (SiteManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            SiteManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "": "loadRoot",
                    "sites": "loadRoot",
                    "sites/:alias": "loadHomePage",
                    "sites/user/:alias": "loadTestSite",
                    "sites/workspace/:alias": "loadTestSite",
                    "backend/sites": 'backendLoadSiteList'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("SiteManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                init: function (cb) {

                    require([
                        "apps/sites/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },

                initBackend: function (cb) {

                    require([
                        "apps/sites/backend/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },


                loadTestSite: function (alias) {

                    alert('Loading the test site ' + alias);
                },

                loadRoot: function () {
                    // alert('inside the root');
                    IntranetManager.trigger('sites:default:show');
                },

                loadHomePage: function (alias) {

                    //alert('Loading Site ' + alias);

                    var cb = function () {
                        require([
                            "apps/sites/public/entities/sites/show/controller"
                        ], function (ShowController) {
                            ShowController.displayHomePage(alias);
                        });
                    };

                    IntranetManager.trigger("sites:init", cb);

                },

                loadPostsFeatured: function (alias) {

                    // var cb = function () {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayFeaturedPosts(alias);
                    });
                    //};

                    //IntranetManager.trigger("home:init", cb);

                },


                loadHomeNewsPosts: function (alias) {

                    // var cb = function () {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayHomeNewsPosts(alias);
                    });
                    // };

                    //IntranetManager.trigger("home:init", cb);

                },

                loadUpcomingEventsWidget: function (alias) {

                    // var cb = function () {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayUpcomingEvents(alias);
                    });
                    // };

                    //IntranetManager.trigger("home:init", cb);

                },

                loadPopularContentWidget: function (options) {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayPopularContentWidget(options);
                    });
                },


                loadRecentContentWidget: function (options) {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayRecentContent(options);
                    });
                },


                loadAtoZUpdates: function (alias) {
                    require([
                        "apps/sites/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayRecentlyUpdated(alias);
                    });
                },

                loadBreadCrumb: function () {
                    require([
                        "apps/sites/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayBreadcrumb();
                    });
                },

                //BackEnd Views & Controls


                backendLoadSiteList: function () {

                    var cb = function () {
                        require([
                            "apps/sites/backend/entities/sites/list/controller"
                        ], function (ListController) {
                            ListController.displayList();
                        });
                    };

                    IntranetManager.trigger("sites:backend:init", cb);
                },

                backendLoadListHeader: function (model) {
                    require([
                        "apps/sites/backend/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.displayListHeader(model);
                    });
                }

            };

            IntranetManager.on("sites:init", function (cb) {
                API.init(cb);
            });

            IntranetManager.on('sites:default:show', function () {
                IntranetManager.navigate(IntranetManager.opts.defaultSite());

                API.loadHomePage('corporate');
                IntranetManager.trigger("headermanager:start");
                IntranetManager.trigger("footer:start");
            });

            IntranetManager.on('sites:news:posts:featured', function (alias) {
                API.loadPostsFeatured(alias);
            });


            IntranetManager.on('sites:content:popular', function (alias) {

                API.loadPopularContentWidget({
                    modules: '["news", "howdoi"]',
                    limit: 7
                });

            });

            IntranetManager.on('sites:content:recent', function (alias) {
                API.loadRecentContentWidget({
                    modules: '["news", "howdoi"]',
                    limit: 7
                });
            });

           //news
            IntranetManager.on('sites:home:news:posts', function (alias) {
                API.loadHomeNewsPosts(alias);
            });

            //events
            IntranetManager.on('sites:events:posts:upcoming', function (alias) {
                API.loadUpcomingEventsWidget(alias);
            });

            //Backend

            IntranetManager.on("sites:backend:init", function (cb) {
                API.initBackend(cb);
            });

            //Widgets & Helpers
            IntranetManager.on("sites:backend:list:header:show", function (model) {
                API.backendLoadListHeader(model);
            });


            //*** ROUTER INITIALIZATION ***//

            IntranetManager.addInitializer(function () {
                new SiteManagerRouter.Router({
                    controller: API
                });
            });

        });
        console.info('--- Sites App loaded ---');
        return IntranetManager.SiteManagerRouter;
    });
