/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Controller
 * */


define([
    "app",
    "apps/workspaces/entities/workspace/list/views",
    "apps/workspaces/common/views"
],
    function ( IntranetManager, ListViews, CommonViews ) {
        IntranetManager.module("WorkspaceManager.List",
            function ( List, WorkspaceManager, Backbone, Marionette, $, _ ) {

                List.Controller = {

                    listWorkspaces: function () {

                        require(["common/views", "apps/workspaces/entities/workspace/model"],
                            function (AppCommonViews) {

                                //fetch workspaces
                                 var fetchingWorkspaces = IntranetManager.request('workspaces:workspace:entities');

                                $.when(fetchingWorkspaces).done(function(workspaces){

                                    console.log('fetching workspaces completed');

                                        var workspaceListView  = new ListViews.WorkspaceListView({
                                            collection: workspaces
                                        });

                                        if(workspaces.length){

                                            IntranetManager.trigger("applayout:change:content", workspaceListView );
                                            IntranetManager.trigger("applayout:change:search", new ListViews.SearchView());
                                            IntranetManager.trigger("applayout:change:sidebartop", new ListViews.CategoriesView());

                                        }else{
                                            IntranetManager.trigger("applayout:change:sidebartop", new ListViews.BlankHelpView() );
                                            IntranetManager.trigger("applayout:change:content", new ListViews.BlankView() );
                                            IntranetManager.trigger("applayout:close:header" );
                                        }

                                });





                            }
                        );


                    }
                }
            });

        return IntranetManager.WorkspaceManager.List.Controller;
    });

