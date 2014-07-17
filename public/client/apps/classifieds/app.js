define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("ClassifiedsManager", function (ClassifiedsManager, IntranetManager, Backbone, Marionette, $, _) {

            ClassifiedsManager.title = "ClassifiedsManager";


            ClassifiedsManager.code = "classifieds";

            ClassifiedsManager.startWithParent = false;

            ClassifiedsManager.on('start', function () {
                console.log('<<< Started ClassifiedsManager Application >>>');
                // API.init();
            });

            ClassifiedsManager.onStop = function () {
                console.log('<<< Stopped ClassifiedsManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.ClassifiedsManager", function (ClassifiedsManagerRouter, IntranetManager, Backbone, Marionette, $, _) {

            ClassifiedsManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "classifieds/:alias": 'loadAppHomePage',
                    "classifieds/:alias/*slug": 'loadPostDetailsPage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("ClassifiedsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/classifieds/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },


                loadAppHomePage: function (alias) {
                    var options = {
                        feature: 'classifieds',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/classifieds/public/entities/posts/list/controller"
                        ], function (ListController) {
                            ListController.showPostsList(options);

                        });
                    };
                    IntranetManager.trigger("classifieds:public:init", cb);
                },

                loadPostDetailsPage: function (alias, options) {

                    var info = options.split('-');

                    var opts = {
                        patientId: info[0],
                        feature: 'classifieds',
                        alias: alias,
                        slug: info[1]
                    };

                    var cb = function () {
                        require([
                            "apps/classifieds/public/entities/posts/show/controller"
                        ], function (ShowController) {
                            ShowController.showPostDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("classifieds:public:init", null);

                }
            };

            //PUBLIC TRIGGERS

            IntranetManager.on('classifieds:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.addInitializer(function () {
                new ClassifiedsManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.ClassifiedsManagerRouter;
    });

