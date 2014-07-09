define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("SearchManager", function (SearchManager, IntranetManager, Backbone, Marionette, $, _) {

            SearchManager.title = "SearchManager Manager";


            SearchManager.code = "search";

            SearchManager.startWithParent = false;

            SearchManager.on('start', function () {
                console.log('<<< Started SearchManager Application >>>');
                // API.init();
            });

            SearchManager.onStop = function () {
                console.log('<<< Stopped SearchManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.SearchManager", function (SearchManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            SearchManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "search/:alias/home": 'loadSearchHomePage'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("SearchManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/search/public/common/controller"
                    ], function (CommonController) {
                     //   alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },


                loadSearchHomePage:function (alias) {

/*                    var cb = function () {
                        require([
                            "apps/search/public/entities/posts/new/controller"
                        ], function (ListController) {
                            ListController.showFeedbackForm(alias);

                        });
                    };*/

                    var cb = function () {
                        require([
                            "apps/search/public/entities/posts/show/controller"
                        ], function (ListController) {
                            ListController.showDefaultPage(alias);

                        });
                    };
                    IntranetManager.trigger("search:public:init", cb);
                }



            };

           //PUBLIC TRIGGERS

            IntranetManager.on('search:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.addInitializer(function () {
                new SearchManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.SearchManagerRouter;
    });

