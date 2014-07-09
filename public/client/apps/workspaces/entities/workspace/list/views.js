/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
        "tpl!apps/workspaces/entities/workspace/list/templates/none.tpl",
        "tpl!apps/workspaces/entities/workspace/list/templates/list.tpl",
        "tpl!apps/workspaces/entities/workspace/list/templates/list_item.tpl",
        "tpl!apps/workspaces/entities/workspace/list/templates/categories.tpl",
        "tpl!apps/workspaces/entities/workspace/list/templates/search.tpl",
        "tpl!apps/workspaces/entities/workspace/list/templates/blank.tpl",
         "tpl!apps/workspaces/entities/workspace/list/templates/blank_help.tpl"
        ],
       function(IntranetManager,
                noneTpl, listTpl, listItemTpl, categoriesTpl, searchTpl,
                blankTpl, blankhelpTpl){ IntranetManager.module("WorkspaceManager.List.Views",
                    function(Views,
                             IntranetManager,
                             Backbone,
                             Marionette, $, _){

/*    View.Layout = Marionette.Layout.extend({

      template: layoutTpl,

        onBeforeRender: function(){
            // set up final bits just before rendering the view's `el`
            $('body').addClass('app workspace');
        },

      regions: {
        panelRegion: "#panel-region",
        contactsRegion: "#contacts-region"
      }

    });*/

    Views.BlankHelpView =  Marionette.ItemView.extend({
        className: "widget",
        template: blankhelpTpl,
        onRender: function(){
            console.log('Rendering the Blank Help View');
        }
    }) ;

    Views.BlankView =  Marionette.ItemView.extend({
        className: "widget",
        template: blankTpl,
        onRender: function(){
            console.log('Rendering the Blank View');
        }
    }) ;


    Views.SearchView =  Marionette.ItemView.extend({
        className: "widget",
        template: searchTpl,
        onRender: function(){
            console.log('Rendering the Search View');
        }
    }) ;

    Views.CategoriesView =  Marionette.ItemView.extend({
        className: "widget",
        template: categoriesTpl,
        onRender: function(){
            console.log('Rendering the Categories view');
        }
    }) ;

    Views.WorkspaceItemView =  Marionette.ItemView.extend({
        className: "item",
        template: listItemTpl,
        onRender: function(){
            //console.log('rendering model ' + this.model.get('id'));
        }
    }) ;

    Views.WorkspaceListView = Marionette.CollectionView.extend({
        className: "ui divided selection list",
        template: listTpl,
        itemView: Views.WorkspaceItemView/*,

        initialize: function () {
            // this.listenTo(this.collection, "reset", function(){
            this.appendHtml = function ( collectionView, itemView, index ) {
                collectionView.$el.append(itemView.el);
            };
            // });

        },

        onCompositeCollectionRendered: function () {
            this.appendHtml = function ( collectionView, itemView, index ) {
                collectionView.$el.prepend(itemView.el);
            }
        }*/
    });



  });

  return IntranetManager.WorkspaceManager.List.Views;
});
