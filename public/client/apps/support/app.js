define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("SupportManager", function (SupportManager, IntranetManager, Backbone, Marionette, $, _) {

            SupportManager.title = "SupportManager Manager";


            SupportManager.code = "support";

            SupportManager.startWithParent = false;

            SupportManager.on('start', function () {
                console.log('<<< Started SupportManager Application >>>');
                // API.init();
            });

            SupportManager.onStop = function () {
                console.log('<<< Stopped SupportManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.SupportManager", function (SupportManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            SupportManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "support/:alias": 'loadAppServices',
                    "support/:alias/:slug/index.html": 'loadServiceForm'
                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("SupportManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS

                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/support/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadAppServices: function (alias) {

                    var options = {
                        feature: 'support',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/support/public/entities/services/list/controller"
                        ], function (ListController) {
                            ListController.showServiceListPage(options);

                        });
                    };

                    IntranetManager.trigger("support:public:init", cb);

                },

                loadServiceForm: function (alias, slug) {

                   //alert(slug);

                   // var id = slug.indexOf('-');
                    var info = slug.split('-');

                    var id = info[0];

                    var opts = {
                        id: id,
                        feature: 'support',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/support/public/entities/services/show/controller"
                        ], function (ShowController) {
                            ShowController.showServiceForm(opts);
                        });
                    };

                    IntranetManager.trigger("support:public:init", cb);

                },

                loadContactUpdateForm: function(service){
                    require([
                        "apps/support/public/entities/services/new/controller"
                    ], function (NewController) {
                        NewController.showContactUpdateForm(service);
                    });

                },

                loadFeedbackForm:function (alias) {

                    var cb = function () {
                        require([
                            "apps/support/public/entities/posts/new/controller"
                        ], function (ListController) {
                            ListController.showFeedbackForm(alias);

                        });
                    };
                    IntranetManager.trigger("support:public:init", cb);
                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('support:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.on('service.contact_update.new', function (service) {
               API.loadContactUpdateForm(service);
            });

            IntranetManager.addInitializer(function () {
                new SupportManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.SupportManagerRouter;
    });

