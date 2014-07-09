/*
* Application: Workspace
* File: Application Manager
* */

define(
    [
     "app"
     ],
    function ( IntranetManager) {
    IntranetManager.module("WorkspaceManager", function (
        WorkspaceManager,
        IntranetManager,
        Backbone,
        Marionette,
        $, _ ) {

        WorkspaceManager.title = "Workspace Manager";

        WorkspaceManager.startWithParent = false;

         WorkspaceManager.onStart = function(){
            console.log('Starting Workspace Manager & Setup application');
            //API.init();
        };

        WorkspaceManager.onStop = function () {
            console.log("stopping WorkspaceManager");
        };

        var API = {

/*            init: function (){

             require([
                 "apps/workspaces/common/controller"
             ], function (CommonController) {
                   // alert('init layout');
                    CommonController.setupAppLayout();
                });

            }*/
        };


    });

    //WorkspaceManager Routers
    IntranetManager.module("Routers.WorkspaceManager", function (
        WorkspaceManagerRouter,
        IntranetManager,
        Backbone,
        Marionette, $, _ ) {

        WorkspaceManagerRouter.Router = Marionette.AppRouter.extend({

            appRoutes: {
                "workspaces": "loadWorkspaceList",
                "workspaces/add": "loadWorkspaceNewForm",
                "workspaces/:id": "loadWorkspaceDetails",
                "workspaces/:id/edit": "loadWorkspaceEditForm"
            }

        });

        var executeAction = function ( action, arg ) {
            IntranetManager.startSubApp("WorkspaceManager");

            action(arg);

            //IntranetManager.execute("set:active:header", "contacts");
        };

        var API = {
            init: function (){

                require([
                    "apps/workspaces/common/controller"
                ], function (CommonController) {
                    //alert('init layout');
                    CommonController.setupAppLayout();
                });

            },

            loadWorkspaceList: function(){
                API.init();
                require([
                    "apps/workspaces/entities/workspace/list/controller"
                ], function (ListController) {
                    executeAction(ListController.listWorkspaces);
                });
            },


            loadWorkspaceEditForm: function() {
                API.init();
                require([
                    "apps/workspaces/entities/workspace/new/controller"
                ], function (NewController) {
                    executeAction(NewController.createWorkspace);
                });
            },

            loadWorkspaceDetails: function(id) {
                require([
                    "apps/workspaces/entities/workspace/show/controller"
                ], function (ShowController) {
                    console.log('calling loadOverview');
                    executeAction(ShowController.loadOverview, id);
                });
            },

            loadWorkspaceNewForm: function() {
                require([
                    "apps/workspaces/entities/workspace/new/controller"
                ], function (NewController) {
                    console.log('Call Load Workspace New Form');
                    executeAction(NewController.loadNewForm);
                });
            }

        };

  /*      IntranetManager.on("workspace:list", function () {
            IntranetManager.navigate("workspace");
            API.listWorkspaces();
        });

        IntranetManager.on("workspace:show", function (alias) {
            IntranetManager.navigate("workspace/" + alias);
            API.showContact(id);
        });

        IntranetManager.on("workspace:edit", function (alias) {
            IntranetManager.navigate("workspace/" + aliass + "/edit");
            API.editContact(id);
        });*/

        IntranetManager.on('workspace:add', function(){
            IntranetManager.navigate("workspaces/add");
            API.loadWorkspaceForm();
        });

        IntranetManager.on('workspace:calendar:show', function(options){
            IntranetManager.navigate("workspaces/" + options.ownerId + "/calendar");
        });

        IntranetManager.on("workspace:home:show", function (alias) {
            IntranetManager.navigate("workspaces/" + alias);
           API.showWorkspaceHome(alias);
        });

        IntranetManager.addInitializer(function () {
            new WorkspaceManagerRouter.Router({
                controller: API
            });
        });


    });

    return IntranetManager.WorkspaceManagerRouter;
});

console.log('exit Workspace Manager app.js');