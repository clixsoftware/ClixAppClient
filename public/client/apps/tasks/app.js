console.log('entry Task Manager app.js');
define(
    [
        "app"
    ],
    function ( IntranetManager) {

        IntranetManager.module("TaskManager", function (
            TaskManager,
            IntranetManager,
            Backbone,
            Marionette,
            $, _ ) {

            TaskManager.title = "Tasks Manager Application";

            TaskManager.startWithParent = false;

            TaskManager.on("start", function () {
                //get the application configuration e.g. title, description, version, url, etc.
                console.log('Starting TasksManager App');
            });


            TaskManager.onStop = function () {
                console.log("Stopping TasksManager App");
            };

            var API = {};


        });

        //TaskManager Routers
        IntranetManager.module("Routers.TaskManager", function (
            TaskManagerRouter,
            IntranetManager,
            Backbone,
            Marionette, $, _ ) {

            TaskManagerRouter.Router = Marionette.AppRouter.extend({

                appRoutes: {
                    //tasks module running at workspace app
                    ":app/:alias/tasks": "loadExtAppHome",
                    ":app/:alias/task": "loadExtAppHome",
                    ":app/:alias/tasks/add": "loadTaskListAddForm",
                    ":app/:alias/tasks/:id": "loadTaskListDetails",
                    ":app/:alias/tasks/:id/edit": "loadTaskListEditForm",
                    ":app/:alias/task/:id": "loadTaskDetails",
                    ":app/:alias/task/:id/edit": "loadTaskEditForm"
                }

            });

            var executeAction = function ( action, arg ) {
                IntranetManager.startSubApp("TaskManager");
                action(arg);
            };

            var API = {

                loadExtAppHome: function(app, alias){
                    console.log('Show the TaskApp Home page for App [' + app +  '] with appID [' + alias + ']');
                   /* require([
                        "apps/task/list/controller"
                    ], function (ShowController) {
                        executeAction(ShowController.listWorkspaces);
                    });*/
                },
                loadTaskListAddForm: function(){
                    console.log('Show the TaskList New Form');
                    /* require([
                     "apps/task/list/controller"
                     ], function (ShowController) {
                     executeAction(ShowController.listWorkspaces);
                     });*/
                },
                loadTaskListDetails: function(id){
                    console.log('Show the TaskList Details Page');
                    /* require([
                     "apps/task/list/controller"
                     ], function (ShowController) {
                     executeAction(ShowController.listWorkspaces);
                     });*/
                },
                loadTaskListEditForm: function(id){
                    console.log('Show the TaskList Edit Form');
                    /* require([
                     "apps/task/list/controller"
                     ], function (ShowController) {
                     executeAction(ShowController.listWorkspaces);
                     });*/
                },
                loadTaskDetails: function(id){
                    console.log('Show the Task Details Page');
                    /* require([
                     "apps/task/list/controller"
                     ], function (ShowController) {
                     executeAction(ShowController.listWorkspaces);
                     });*/
                },
                loadTaskEditForm: function(id){
                    console.log('Show the Task Edit Form');
                    /* require([
                     "apps/task/list/controller"
                     ], function (ShowController) {
                     executeAction(ShowController.listWorkspaces);
                     });*/
                }


            };


/*            IntranetManager.on('workspace:add', function(){
                IntranetManager.navigate("workspace/add");
                API.loadWorkspaceForm();
            });

            IntranetManager.on('workspace:calendar:show', function(options){
                IntranetManager.navigate("workspace/" + options.ownerId + "/calendar");
            });

            IntranetManager.on("workspace:home:show", function (alias) {
                IntranetManager.navigate("workspace/" + alias);
                API.showWorkspaceHome(alias);
            });
 */
            //Add Application routes to the main application - Intranet Manager
            IntranetManager.addInitializer(function () {
                new TaskManagerRouter.Router({
                    controller: API
                });
            });


        });

        return IntranetManager.TaskManagerRouter;
    });

console.log('exit Task Manager app.js');