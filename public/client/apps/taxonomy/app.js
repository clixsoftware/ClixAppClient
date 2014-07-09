/*
* Application: Application Manager
* File: Application Manager
* */

define(
    [
     "app"
     ],
    function ( IntranetManager) {
    IntranetManager.module("TaxonomyManager", function (
        TaxonomyManager,
        IntranetManager,
        Backbone,
        Marionette,
        $, _ ) {

        TaxonomyManager.title = "Taxonomy Manager";

        TaxonomyManager.startWithParent = false;

        TaxonomyManager.on('start', function(){
            console.log('Starting TaxonomyManager Application - on start');
            //API.init();
        });

        TaxonomyManager.onStop = function () {
        };

        var API = {

            init: function (){

                require([
                    "apps/taxonomy/common/controller"
                ], function (CommonController) {
                    CommonController.setupAppLayout();
                });

            }
        };


    });

    //AppManager Routers
    IntranetManager.module("Routers.TaxonomyManagerRouter", function (
        TaxonomyManagerRouter,
        IntranetManager,
        Backbone,
        Marionette, $, _ ) {

        TaxonomyManagerRouter.Router = Marionette.AppRouter.extend({

            appRoutes: {
                "categorymanager": "loadOverview",
                "categorymanager/new": "loadNewForm",
                "appmanager/:id": "loadDisplayPage"
            }

        });

        var executeAction = function ( action, arg ) {
            IntranetManager.startSubApp("AppManager");

            action(arg);

            //IntranetManager.execute("set:active:header", "contacts");
        };

        var API = {
            init: function (cb){

                require([
                    "apps/taxonomy/common/controller"
                ], function (CommonController) {
                    executeAction(CommonController.setupAppLayout, cb);
                });

            },

            loadOverview: function(){
              this.loadAppsList()
            },

            loadAppsList: function(){

                var cb = function(){
                    require([
                        "apps/taxonomy/list/controller"
                    ], function (ListController) {
                        executeAction(ListController.listRecords);
                    });
                };

                IntranetManager.trigger("taxonomy:init", cb);
            },

            loadNewForm: function(options) {
                require([
                    "apps/taxonomy/new/controller"
                ], function (NewController) {
                    executeAction(NewController.loadForm, options);
                });
            },

            loadDisplayPage: function(id){

                var cb = function(){
                    require([
                        "apps/taxonomy/show/controller"
                    ], function (ShowController) {
                        ShowController.loadDisplayPage(id);
                    });
                };

                IntranetManager.trigger("taxonomy:init", cb);

            },

            loadPublicNavigation: function(app){

               // var cb = function(){
                    require([
                        "apps/taxonomy/common/controller"
                    ], function (CommonController) {
                        CommonController.showPublicNavigation(app);
                    });
                //};

            }



        };

        IntranetManager.on("taxonomy:init", function (cb) {
            API.init(cb);
        });

        IntranetManager.on('taxonomy:home:show', function(){
            IntranetManager.navigate("categorymanager", true);
            API.loadOverview();
        });

        IntranetManager.on('taxonomy:new:form', function(options){
            API.loadNewForm(options);
        });


        IntranetManager.addInitializer(function () {
            new TaxonomyManagerRouter.Router({
                controller: API
            });
        });


    });

    return IntranetManager.AppManagerRouter;
});

