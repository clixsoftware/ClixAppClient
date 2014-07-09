define(
    [
        "app"
    ],
    function (IntranetManager) {
        IntranetManager.module("ProjectsManager", function (ProjectsManager, IntranetManager, Backbone, Marionette, $, _) {

            ProjectsManager.title = "ProjectsManager Manager";


            ProjectsManager.code = "projects";

            ProjectsManager.startWithParent = false;

            ProjectsManager.on('start', function () {
                console.log('<<< Started ProjectsManager Application >>>');
                // API.init();
            });

            ProjectsManager.onStop = function () {
                console.log('<<< Stopped ProjectsManager Application >>>');
            };

        });

        //WorkspaceManager Routers
        IntranetManager.module("Routers.ProjectsManager", function (ProjectsManagerRouter, IntranetManager,
                                                                    Backbone, Marionette, $, _) {

            ProjectsManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    "projects/:alias": 'loadProjectList',
                    "projects/:alias/index.html": 'loadProjectList',
                    "projects/:alias/:id/*slug": 'loadProjectDetails'

                }

            });

            var executeAction = function (action, arg) {
                IntranetManager.startSubApp("ProjectsManager");
                action(arg);
                //IntranetManager.execute("set:active:header", "contacts");
            };

            var API = {

                //PUBLIC FUNCTIONS


                //initialize public interface and load the layout
                initPublic: function (cb) {

                    require([
                        "apps/projects/public/common/controller"
                    ], function (CommonController) {
                        //alert('init layout');
                        executeAction(CommonController.initAppEngine, cb);
                    });

                },

                loadProjectDetails: function (alias, id, slug) {

                    alert('load the project details');

                    var opts = {
                        id: id,
                        feature: 'projects',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/projects/public/entities/project/show/controller"
                        ], function (ShowController) {
                            ShowController.showProjectDetailsPage(opts);
                        });
                    };

                    IntranetManager.trigger("projects:public:init", cb);

                },


                loadProjectList: function (alias) {

                    var options = {
                        feature: 'projects',
                        alias: alias
                    };

                    var cb = function () {
                        require([
                            "apps/projects/public/entities/project/list/controller"
                        ], function (ListController) {
                            ListController.showProjectListPage(options);

                        });
                    };

                    IntranetManager.trigger("projects:public:init", cb);

                }

            };

           //PUBLIC TRIGGERS

            IntranetManager.on('projects:public:init', function (cb) {
                API.initPublic(cb);
            });

            IntranetManager.addInitializer(function () {
                new ProjectsManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.ProjectsManagerRouter;
    });

