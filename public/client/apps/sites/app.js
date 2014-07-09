/*
 * Application: Homepage Manager
 * File: Home page Manager
 * */

define(
    [
        "app"
    ],
    function ( IntranetManager ) {
        IntranetManager.module("SiteManager", function ( SiteManager, IntranetManager, Backbone, Marionette, $, _ ) {

            SiteManager.startWithParent = false;

            SiteManager.on("start", function () {
                //API.init();
                console.log('Starting SiteManager');
            });

            SiteManager.onStop = function () {
                $('body').removeClass('home');
                console.log("stopping SiteManager");
            };

            var API = {
                init: function () {
                    require([
                        "apps/sites/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        CommonController.setupAppLayout();
                    });

                },
                showMenu: function () {
                    // ShowController.loadMenu();
                }
            };


        });

        IntranetManager.module("Routers.SiteManager", function ( SiteManagerRouter, IntranetManager, Backbone, Marionette, $, _ ) {

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

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("SiteManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                init: function ( cb ) {

                    require([
                        "apps/sites/public/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },

                initBackend: function ( cb ) {

                    require([
                        "apps/sites/backend/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },


                loadTestSite:function(alias){

                    alert('Loading the test site ' + alias);
                },

                loadRoot: function(){
                  // alert('inside the root');
                    IntranetManager.trigger('sites:default:show');
                },

                loadHomePage: function (alias) {

                    //alert('Loading Site ' + alias);

                    var cb = function () {
                        require([
                            "apps/sites/public/entities/sites/show/controller"
                        ], function ( ShowController ) {
                            ShowController.displayHomePage(alias);
                        });
                    };

                    IntranetManager.trigger("sites:init", cb);

                },

                loadPostsFeatured: function (alias) {

                    // var cb = function () {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayFeaturedPosts(alias);
                    });
                    //};

                    //IntranetManager.trigger("home:init", cb);

                },


                loadHomeNewsPosts: function (alias) {

                    // var cb = function () {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayHomeNewsPosts(alias);
                    });
                    // };

                    //IntranetManager.trigger("home:init", cb);

                },

                loadHomeEventsPosts: function (alias) {

                    // var cb = function () {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayHomeEventsPosts(alias);
                    });
                    // };

                    //IntranetManager.trigger("home:init", cb);

                },

                loadHowDoIMostActive: function (alias) {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayHowDoIMostActive(alias);
                    });
                },


                loadHowDoIRecent: function (alias) {
                    require([
                        "apps/sites/public/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayHowDoIRecent(alias);
                    });
                },


                loadAtoZUpdates: function (alias) {
                    require([
                        "apps/sites/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayRecentlyUpdated(alias);
                    });
                },

                loadBreadCrumb: function () {
                    require([
                        "apps/sites/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayBreadcrumb();
                    });
                },

                //BackEnd Views & Controls


                backendLoadSiteList: function(){

                    var cb = function () {
                        require([
                            "apps/sites/backend/entities/sites/list/controller"
                        ], function ( ListController ) {
                            ListController.displayList();
                        });
                    };

                    IntranetManager.trigger("sites:backend:init",  cb);
                },

                backendLoadListHeader: function(model){
                    require([
                        "apps/sites/backend/widgets/controller"
                    ], function ( WidgetsController ) {
                        WidgetsController.displayListHeader(model);
                    });
                }

               };

            IntranetManager.on("sites:init", function ( cb ) {
                API.init(cb);
            });

            IntranetManager.on('sites:default:show', function () {
                IntranetManager.navigate("/sites/default");
                API.loadHomePage('default');
            });

            IntranetManager.on('sites:news:posts:featured', function (alias) {
                API.loadPostsFeatured(alias);
            });


            IntranetManager.on('sites:howdoi:mostactive', function (alias) {
                API.loadHowDoIMostActive(alias);
            });

            IntranetManager.on('sites:howdoi:mostrecent', function (alias) {
                API.loadHowDoIRecent(alias);
            });

            IntranetManager.on('sites:atoz:recentupdates', function (alias) {
                API.loadAtoZUpdates(alias);
            });

            IntranetManager.on('sites:breadcrumb:show', function () {
                API.loadBreadCrumb();
            });

            //news
            IntranetManager.on('sites:home:news:posts', function (alias) {
                API.loadHomeNewsPosts(alias);
            });

            //events
            IntranetManager.on('sites:home:events:posts', function (alias) {
                API.loadHomeEventsPosts(alias);
            });

            //Backend

            IntranetManager.on("sites:backend:init", function ( cb ) {
                API.initBackend(cb);
            });

            //Widgets & Helpers
            IntranetManager.on("sites:backend:list:header:show", function ( model ) {
                API.backendLoadListHeader(model);
            });


            //*** ROUTER INITIALIZATION ***//

            IntranetManager.addInitializer(function () {
                new SiteManagerRouter.Router({
                    controller: API
                });
            });

        });

        return IntranetManager.SiteManagerRouter;
    });
