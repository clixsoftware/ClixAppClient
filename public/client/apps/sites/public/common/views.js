/*
 * Application: Workspace
 * Views: Workspace Common Views
 * Module: WorkspaceManager.Common.Views
 *
 * */



define([
    "app",
    "common/views",
    "tpl!apps/sites/public/common/templates/layout.tpl"
], function(IntranetManager, GlobalViews, layoutTpl){

    IntranetManager.module("SiteManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){

    Views.LayoutView = Marionette.Layout.extend({
        template: layoutTpl,
        onBeforeRender: function () {
            // set up final bits just before rendering the view's `el`
            $('body').addClass('home page');
        }


    }) ;

  });



  return IntranetManager.SiteManager.Common.Views;
});
