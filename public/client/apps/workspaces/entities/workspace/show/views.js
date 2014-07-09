define([
    "app",
    "tpl!apps/workspace/show/templates/missing.tpl",
    "tpl!apps/workspace/show/templates/view.html",
    "tpl!apps/workspace/show/templates/workspace_menu.html",
    "tpl!apps/workspace/show/templates/no_menu.html",
    "tpl!apps/workspace/show/templates/owner_menu.html",
    "tpl!apps/workspace/show/templates/overview_header.tpl",
    "semantic"
],
       function(IntranetManager, missingTpl, viewTpl, workspaceMenuTpl, noMenuTpl, ownerMenuTpl, overviewHeaderTpl){

           IntranetManager.module("WorkspaceManager.Show.View",
               function(
                   View,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _){

    View.MissingNewsItem = Marionette.ItemView.extend({
      template: missingTpl
    });

    View.WorkspaceHome = Marionette.ItemView.extend({
        onBeforeRender: function(){
            // set up final bits just before rendering the view's `el`
            $('body').addClass('app workspace');
        },
          template: viewTpl
        });

   View.NewsItem = Marionette.ItemView.extend({

       template: viewTpl

   });

   View.OverviewHeader =   View.WorkspaceMenu = Marionette.ItemView.extend({
       template: overviewHeaderTpl

   });

       View.WorkspaceMenu = Marionette.ItemView.extend({
       template: workspaceMenuTpl,

       events:{
        'click .js-item-calendar': 'goCalendar',
        'click  .js-item-dashboard': 'goDashboard'
       },

       onRender: function(){
/*           this.$('.ui.dropdown').dropdown({
                   on: 'click'
               });*/

       },

       getOptions: function(){
         return {
             ownerType: 'workspace',
             ownerId: this.model.get('alias')
         };
       },

       goCalendar: function(e){
          // this.$('.js-item-calendar').click(function(){
              IntranetManager.trigger('owner:calendar:home', this.getOptions());
          // }) ;

       },

       goDashboard: function(e){
           // this.$('.js-item-calendar').click(function(){
           IntranetManager.trigger('workspace:home:show', this.getOptions().ownerId);
           // }) ;
           alert('click dashboard');

       }

   });


   View.NoMenu = Marionette.ItemView.extend({
       template: noMenuTpl
   });

   View.OwnerMenu = Marionette.ItemView.extend({
       template: ownerMenuTpl
   });

  });

  return IntranetManager.WorkspaceManager.Show.View;
});
