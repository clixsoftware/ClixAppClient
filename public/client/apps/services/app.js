define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("ServicesManager", function (ServicesManager, IntranetManager, Backbone, Marionette, $, _) {

            ServicesManager.title = "ServicesManager Manager";


            ServicesManager.code = "services";

            ServicesManager.startWithParent = false;

            ServicesManager.on('start', function () {
                console.log('<<< Started ServicesManager Application >>>');
                // API.init();
            });

            ServicesManager.onStop = function () {
                console.log('<<< Stopped ServicesManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.ServicesManager", function (ServicesManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            ServicesManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "services/:alias": 'loadList',
                    "services/:alias/index.html": 'loadList',
                    "services/:alias/:id/*slug": 'loadDetails'

                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("ServicesManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/services/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadDetails: function (alias, id, slug) {

                   // alert('load the project details');

                    var opts = {
                        id: id,
                        feature: 'services',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/services/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("services:public:init", cb);

                },


                loadList: function (alias) {

                    var options = {
                        feature: 'services',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/services/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showServiceListPage(options);

                        });
                    };

                    IntranetManager.trigger("services:public:init", cb);

                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('services:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.addInitializer(function () {
                new ServicesManagerRouter.Router({
                    controller: API
                });
            });


        });
        console.info('--- Services App loaded ---');
        return IntranetManager.ServicesManagerRouter;
    });

