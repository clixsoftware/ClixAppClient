define([
    "app",
    "pace",
    "tpl!apps/header/show/templates/layout.tpl",
    "tpl!apps/header/show/templates/sign_in.tpl",
    "tpl!apps/header/show/templates/signed_in.tpl"
],
       function(IntranetManager, pace, layoutTpl, primaryNavigationTpl, secondaryNavigationTpl, signInTpl, signedInTpl){

           IntranetManager.module("HeaderManager.Show.View",
               function(
                   View,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _){


   View.LayoutView = Marionette.Layout.extend({
       tagName: 'header',

       className: 'page masthead',

       onBeforeRender: function(){
           // set up final bits just before rendering the view's `el`
            pace.start({
                document: false
            });
           console.log("pace is running");
       },

       template: layoutTpl,

       regions: {
           primaryNavigationRegion: "#primary-page-menu .page.container",
           secondaryNavigationRegion: "#secondary-page-menu .page.container",
           startMenuRegion: "#start-menu",
           actionsMenuRegion: "#actions-menu",
           ownerMenuRegion: "#owner-menu"
       }

   });

   View.SignedIn = Marionette.ItemView.extend({
       template: signedInTpl

   });

   View.SignIn = Marionette.ItemView.extend({
       template: signInTpl,

      // className: 'item js-nav-sign',

       //tagName: 'a',

       events: {
           'click .js-nav-sign': "navtoLogin"
       },

       navtoLogin: function(e){
           e.preventDefault();
           IntranetManager.trigger("login:show");
       }
       /*
       ui: {
           criterion: "input.js-filter-criterion"
       },

       filterContacts: function(e){
           e.preventDefault();
           console.log('do search from head');
           var criterion = this.$(".js-filter-criterion").val();
           IntranetManager.trigger("contacts:search", criterion);
       }*/
   });




  });

  return IntranetManager.HeaderManager.Show.View;
});
