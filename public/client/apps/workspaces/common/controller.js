/*
 * Application: Workspace Manager
 * Controller: Common Controller
 * Module: WorkspaceManager.Common
 * */


define([
    "app",
    "apps/workspaces/common/views",
    "common/views"
],
    function ( IntranetManager, CommonViews, AppCommonViews ) {
        IntranetManager.module("WorkspaceManager.Common",
            function ( Common, WorkspaceManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getLayoutView: function(){
                        return new AppCommonViews.AppLayout();
                    },

                    getAppMenuView: function(){

                        return new CommonViews.AppMenuView();
                    },

                    setupAppLayout: function () {
                        console.log('Setup the application layout');
                        IntranetManager.appLayout = this.getLayoutView();

                        //setup the header view
                        var headerView = new CommonViews.HeaderView();


                        IntranetManager.appLayout.on('show', function () {
                            IntranetManager.appLayout.headerRegion.show(headerView);
                            IntranetManager.appLayout.navigationRegion.show(Common.Controller.getAppMenuView());
                        });

                        headerView.on("workspace:new", function () {
                            require(["apps/workspaces/entities/workspace/new/views"], function ( NewViews ) {

                                var newWorkspace = IntranetManager.request("workspace:entity:new");

                                //alert('new workspace received' + newWorkspace.get('title'));

                                var view = new NewViews.CreateForm({
                                    model: newWorkspace
                                });

                                view.on("form:submit", function ( data ) {
                                    console.log('handling form submit in controller');
                                    if (newWorkspace.save(data)) {
                                        console.log('triggering dialog close');
                                        console.log('Id of the new model ' + newWorkspace.id);
                                        view.trigger("dialog:close");
                                        //navigate to workspace
                                        IntranetManager.trigger("workspace:home:show", newWorkspace.get('alias'));

                                    } else {
                                        console.log('form data invalid, trigger form invalid');
                                        view.triggerMethod("form:data:invalid", newWorkspace.validationError);
                                    }
                                });

                                //var view = NewView.CreateForm();

                                IntranetManager.dialogRegion.show(view);
                                $('.demo.menu .item').tab({
                                    history: false
                                });

                            });
                        });


                        IntranetManager.on("applayout:change:search", function(view){
                            console.log('Search Panel - Applayout Change');
                            IntranetManager.appLayout.searchRegion.show(view);
                        });


                        IntranetManager.on("applayout:change:sidebartop", function(view){
                             IntranetManager.appLayout.sidebarTopRegion.show(view);
                        });

                        IntranetManager.on("applayout:change:header", function(view){
                            console.log('Changing the header view');
                            IntranetManager.appLayout.headerRegion.show(view);
                        });

                        IntranetManager.on("applayout:change:content", function(view){
                               IntranetManager.appLayout.contentRegion.show(view);
                        });
                        IntranetManager.on("applayout:close:header", function(){
                            IntranetManager.appLayout.headerRegion.close();
                        });
                        IntranetManager.mainRegion.show(IntranetManager.appLayout);


                    }
                };


            });


        return IntranetManager.WorkspaceManager.Common.Controller;
    });

