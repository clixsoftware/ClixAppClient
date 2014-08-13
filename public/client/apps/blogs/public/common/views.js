/*
 * Application: Application Manager
 * Views: Workspace Common Views
 * Module: SiteManager.Common.Views
 *
 * */



define([
    "app",
    "common/views",
    "tpl!apps/blogs/public/common/templates/public_layout.tpl"

], function(IntranetManager, GlobalViews, publicLayoutTpl){

    IntranetManager.module("BlogsManager.Public.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){

            Views.NewsLayoutView = GlobalViews.Content2ColLayoutView.extend({

                template: publicLayoutTpl,

                onBeforeRender: function () {
                    // set up final bits just before rendering the view's `el`
                    $('body').addClass('public blogs').removeClass('app');
                },

                onRender: function(){
                    $('body').removeClass('app');
                }
            });


  });



  return IntranetManager.BlogsManager.Public.Common.Views;
});
