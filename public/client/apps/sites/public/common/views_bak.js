/*
 * Application: Workspace
 * Views: Workspace Common Views
 * Module: WorkspaceManager.Common.Views
 *
 * */



define([
    "app",
    "common/views",
    "tpl!apps/home/common/templates/layout.tpl"
], function(IntranetManager, GlobalViews, layoutTpl){

    IntranetManager.module("HomeManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){


    Views.LayoutView =  GlobalViews.AppLayoutView.extend({

        initialize:function(){
        },

        onBeforeRender: function () {
            // set up final bits just before rendering the view's `el`
            $('body').removeClass('app').addClass('home view');
            $('#site-main').addClass('2-col-layout').removeClass('app');
        },

        template: layoutTpl
    }) ;

  });



  return IntranetManager.HomeManager.Common.Views;
});
