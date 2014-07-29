/*
 * Application: Feature Manager
 * File: Feature Manager
 * */

define(
    [
        "app"
    ],
    function ( IntranetManager ) {
        IntranetManager.module("FeatureManager", function ( FeatureManager, IntranetManager, Backbone, Marionette, $, _ ) {

            FeatureManager.title = "Feature Manager";


            FeatureManager.code = "featurespace";

            FeatureManager.startWithParent = false;

            FeatureManager.on('start', function () {
                console.info('@@ FeatureManager.on : STARTED @@');
                // API.init();
            });

            FeatureManager.onStop = function () {
            };

            var API = {

                init: function () {

                    require([
                        "apps/feature/common/controller"
                    ], function ( CommonController ) {
                        CommonController.setupAppLayout();
                    });

                }
            };


        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.FeatureManager", function ( FeatureManagerRouter, IntranetManager, Backbone, Marionette, $, _ ) {

            FeatureManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "featuremanager": "loadAdminHome",
                    "featuremanager/features": "loadFeaturesList",
                    "featuremanager/features/new": "loadFeatureNewForm",
                    "featuremanager/:id": "loadFeatureShowPage",
                    "featuremanager/:id/edit": "loadFeatureEditForm"
                }

            });

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("FeatureManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {
                init: function ( cb ) {

                    require([
                        "apps/feature/common/controller"
                    ], function ( CommonController ) {
                        //alert('init layout');
                        executeAction(CommonController.setupAppLayout, cb);
                    });

                },

                loadAdminHome: function () {
                    console.log('<< FeatureManager: loadAdminHome >>');
                    this.loadFeaturesList();
                },

                loadFeaturesList: function () {

                    console.log('<< FeatureManager: loadFeaturesList >>');

                    var cb = function () {
                        require([
                            "apps/feature/entities/features/list/controller"
                        ], function ( ListController ) {
                            ListController.listFeatures();
                        });
                    };

                    IntranetManager.trigger("feature:admin:init", cb);

                },

                loadFeatureShowPage: function ( id ) {

                    var cb = function () {
                        require([
                            "apps/feature/entities/features/show/controller"
                        ], function ( ShowController ) {
                            ShowController.loadDisplayPage(id);
                        });
                    };

                    IntranetManager.trigger("feature:admin:init", cb);

                },


                loadFeatureNewForm: function () {
                    var cb = function () {
                        require([
                            "apps/feature/entities/features/new/controller"
                        ], function ( NewController ) {
                            NewController.loadForm();
                        });
                    };

                    IntranetManager.trigger("feature:admin:init", cb);

                },


                loadFeatureEditForm: function ( id ) {
                    require([
                        "apps/feature/entities/features/edit/controller"
                    ], function ( EditController ) {
                        //executeAction(PostsListController.listAppPosts, id);
                        EditController.loadForm(id);
                    });

                }

            };

            IntranetManager.on("feature:admin:init", function ( cb ) {
                console.log('<< Trigger: feature:admin:init >>');
                API.init(cb);
            });

            IntranetManager.on('feature:admin:home', function () {
                IntranetManager.navigate("featuremanager", true);
                API.loadAdminHome();
            });

            IntranetManager.on('feature:admin:feature:dashboard', function (id) {
                console.log('%%% Trigger: feature:admin:feature:dashboard NOT IMPLEMENTED %%%')
            });

            IntranetManager.on('feature:admin:feature:list', function (id) {
                IntranetManager.navigate("featuremanager/features");
                API.loadFeaturesList();
            });

            IntranetManager.on('feature:admin:feature:new', function () {

                IntranetManager.navigate("featuremanager/features/new");
                API.loadFeatureNewForm();
            });

            IntranetManager.on('feature:admin:feature:edit', function ( id ) {
                console.log('<< Trigger: feature:admin:feature:edit >>');
                IntranetManager.navigate("featuremanager/" + id + "/edit", true);
                API.loadFeatureEditForm(id);
            });


            IntranetManager.on('feature:admin:feature:apps', function (id) {
                console.log('%%% Trigger: feature:admin:feature:apps NOT IMPLEMENTED %%%')
            });

            IntranetManager.addInitializer(function () {
                new FeatureManagerRouter.Router({
                    controller: API
                });
            });


        });

        console.info('--- Feature App loaded ---');
        return IntranetManager.FeatureManagerRouter;
    });

