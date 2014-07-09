console.log('entry workspace show_controller.js');

define([
    "app",
    "apps/workspace/show/show_view"
], function ( IntranetManager, View ) {

    IntranetManager.module("WorkspaceManager.Show",
        function ( Show,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _ ) {

            Show.Controller = {

                loadHome: function(){


                },

                loadNewsHome: function () {

                    var homeView = new View.NewsHome();
                    IntranetManager.mainRegion.show(homeView);
                    console.log('Loading News Home.')
                },

                loadMenu: function (model) {

                    var view = new View.WorkspaceMenu({
                        model: model
                    });
                    IntranetManager.trigger("header:change:start:menu", view );

                },

                loadNoMenu: function(location){
                    var view = new View.NoMenu();
                    IntranetManager.trigger("header:change:"+ location + ":menu", view );

                },

                loadOwnerMenu: function(model){
                    var view = new View.OwnerMenu({
                        model: model
                    });
                    IntranetManager.trigger("header:change:owner:menu", view );

                },

                loadOverview: function (alias) {

                    require([
                        "common/views",
                        "apps/workspace/entities/workspace"
                    ], function ( CommonViews) {

                        var appLayout = new CommonViews.AppLayout();

                        var navigationView = new View.WorkspaceMenu();

                        var headerView = new View.OverviewHeader();

                        appLayout.on('show', function(){
                            appLayout.appNavigation.show(navigationView);
                            appLayout.appHeader.show(headerView);

                        });

                        var fetchingWorkspaceItem = IntranetManager.request("workspace:entity", alias);

                        $.when(fetchingWorkspaceItem).done(function ( workspaceItem ) {

                            console.log('done fetching newsItem !!t');
                            var workspaceHomeView;

                            if (workspaceItem !== undefined) {
                                console.log('workspace item found ' + workspaceItem.get('title'));
                                workspaceHomeView = new View.WorkspaceHome();
                                //Show.Controller.loadMenu(workspaceItem);
                                //Show.Controller.loadNoMenu('action');
                                //Show.Controller.loadOwnerMenu(workspaceItem);
                            }
                            else {
                                workspaceHomeView = new View.MissingNewsItem();
                                console.log('Show News Item View in Main Region.');


                            }

                            IntranetManager.mainRegion.show(appLayout);
                        });
                    });


                }


            }
        });

    return IntranetManager.WorkspaceManager.Show.Controller;
});

console.log('exit workspace show_controller.js');