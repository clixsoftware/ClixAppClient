/*
 * Application: Homepage Manager
 * File: Home page Manager
 * */

define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("HospitalManager", function (HospitalManager, IntranetManager, Backbone, Marionette, $, _) {

            HospitalManager.startWithParent = false;

            HospitalManager.on("start", function () {
                //API.init();
                console.log('Starting HospitalManager');
            });

            HospitalManager.onStop = function () {
                $('body').removeClass('home');
                console.log("stopping HospitalManager");
            };

            var API = {
                init: function () {
                    require([
                        "apps/ward_app/common/controller"
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

        IntranetManager.module("Routers.HospitalManager", function (HospitalManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            HospitalManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    // "hmis": "loadAppHomePage",
                    "hmis/:alias": "loadOverviewPage"
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("HospitalManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                initPublic: function (cb) {

                    require([
                        "apps/hmis/public/common/controller"
                    ], function (CommonController) {
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadOverviewPage: function (alias) {
                    var cb = function () {
                        require([
                            "apps/hmis/public/common/controller"
                        ], function (CommonController) {
                            CommonController.displayOverviewPage(alias);
                        });
                    };

                    IntranetManager.trigger("hmis:public:init", cb);
                },

                loadMainMenuWidget: function () {
                    require([
                        "apps/hmis/public/widgets/controller"
                    ], function (WidgetsController) {
                        WidgetsController.showMainMenu();
                    });

                }


            };

            IntranetManager.on("hmis:public:init", function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.on('hmis:show:menu', function () {
                API.loadMainMenuWidget();
            });


            //*** ROUTER INITIALIZATION ***//

            IntranetManager.addInitializer(function () {
                new HospitalManagerRouter.Router({
                    controller: API
                });
            });

        });

        return IntranetManager.HospitalManagerRouter;
    });
