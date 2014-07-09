/*
 * Application: Homepage Manager
 * File: Home page Manager
 * */

define(
    [
        "app"
    ],
    function ( IntranetManager ) {
        IntranetManager.module("WardNabager", function ( WardManager, IntranetManager, Backbone, Marionette, $, _ ) {

            WardManager.startWithParent = false;

            WardManager.on("start", function () {
                //API.init();
                console.log('Starting WardManager');
            });

            WardManager.onStop = function () {
                $('body').removeClass('home');
                console.log("stopping WardManager");
            };

            var API = {
                init: function () {
                    require([
                        "apps/ward_app/common/controller"
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

        IntranetManager.module("Routers.WardManager", function ( WardManagerRouter, IntranetManager, Backbone, Marionette, $, _ ) {

            WardManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "apps_ward": "loadWardHomePage",
                    "apps_ward/:alias": "loadWardHomePage"
                }

            });

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("WardManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                initPublic: function ( cb ) {

                    require([
                        "apps/ward_app/public/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },


                loadWardHomePage: function (alias) {

                   alert('Loading Ward Home Page -  ' + alias);
/*
                    var cb = function () {
                        require([
                            "apps/sites/public/entities/sites/show/controller"
                        ], function ( ShowController ) {
                            ShowController.displayHomePage(alias);
                        });
                    };*/

                    IntranetManager.trigger("wards:public:init", null);

                }


               };

            IntranetManager.on("wards:public:init", function ( cb ) {
                API.initPublic(cb);
            });

            //*** ROUTER INITIALIZATION ***//

            IntranetManager.addInitializer(function () {
                new WardManagerRouter.Router({
                    controller: API
                });
            });

        });

        return IntranetManager.WardManagerRouter;
    });
