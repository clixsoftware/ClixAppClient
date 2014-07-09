
define([
    "app",
    "common/views",
    "tpl!apps/sites/backend/common/templates/layout.tpl",
    "tpl!apps/sites/backend/common/templates/list_header.tpl"
], function(IntranetManager, GlobalViews, layoutTpl, listHeaderTpl){

    IntranetManager.module("SiteManager.Common.Views",
        function(
             Views,
             IntranetManager,
             Backbone,
             Marionette,
             $, _){

    Views.LayoutView = Marionette.Layout.extend({
        template: layoutTpl,

        className: 'layout-app',

        onBeforeRender: function () {
            // set up final bits just before rendering the view's `el`
           $('body').addClass('backend sites');
        }


    }) ;


  });



  return IntranetManager.SiteManager.Common.Views;
});
