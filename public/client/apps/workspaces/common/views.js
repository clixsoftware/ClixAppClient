/*
 * Application: Workspace
 * Views: Workspace Common Views
 * Module: WorkspaceManager.Common.Views
 *
 * */



define([
    "app",
    "tpl!apps/workspaces/common/templates/header.tpl",
    "tpl!apps/workspaces/common/templates/app_menu.tpl"
], function(IntranetManager, headerTpl, appMenuTpl){

    IntranetManager.module("WorkspaceManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){


    Views.HeaderView = Marionette.ItemView.extend({
        template: headerTpl,

        triggers:{
            "click .js-add-project": "workspace:new"
        },

        addProjectClicked: function(e){
            IntranetManager.trigger('workspace:add');
        }

    });

    Views.AppMenuView = Marionette.ItemView.extend({
        template: appMenuTpl,

        triggers:{
            "click .js-add-project": "workspace:new"
        },

        addProjectClicked: function(e){
            IntranetManager.trigger('workspace:add');
        }

    });


  });



  return IntranetManager.WorkspaceManager.Common.Views;
});
