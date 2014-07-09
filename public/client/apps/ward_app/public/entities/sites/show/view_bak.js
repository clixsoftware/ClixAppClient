define([
    "app",
    "tpl!apps/home/show/templates/view.tpl",
    "tpl!apps/home/show/templates/header.tpl"
],
       function(IntranetManager, viewTpl, headerTpl){

           IntranetManager.module("HomeManager.Show.View",
               function(
                   View,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _){


   View.HomePage = Marionette.ItemView.extend({
       template: viewTpl
   });


                   View.HeaderView = Marionette.ItemView.extend({
                       template: headerTpl
                   });


  });

  return IntranetManager.HomeManager.Show.View;
});
