/*
 * Application: Application Manager
 * Views: Workspace Common Views
 * Module: SiteManager.Common.Views
 *
 * */



define([
    "app",
    "common/views",
    "tpl!apps/directory/public/common/templates/layout.tpl"

], function(IntranetManager, GlobalViews, layoutTpl){

    IntranetManager.module("DirectoryManager.Public.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){

            Views.LayoutView = Marionette.LayoutView.extend({

                template: layoutTpl,

                className: 'row'/*,

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('public news').removeClass('app');
                },

                onRender: function(){
                    $('body').removeClass('app');
                }*/
            });


  });



  return IntranetManager.DirectoryManager.Public.Common.Views;
});
