
define([
    "app",
    "common/views",
    "tpl!apps/pages/public/common/templates/layout.tpl"

], function(IntranetManager, GlobalViews, layoutTpl){

    IntranetManager.module("PageManager.Public.Common.Views",
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
                    $('body').addClass('page-template-page-calendar');
                }

            });

  });



  return IntranetManager.PageManager.Public.Common.Views;
});
