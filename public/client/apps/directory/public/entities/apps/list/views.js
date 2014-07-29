/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/directory/public/entities/apps/list/templates/list.tpl",
    "tpl!apps/directory/public/entities/apps/list/templates/list_item.tpl",
    "tpl!apps/directory/public/entities/apps/list/templates/layout.tpl",
    "tpl!apps/directory/public/entities/apps/list/templates/header.tpl"
],
    function ( IntranetManager, GlobalViews, listTpl, listItemTpl, layoutTpl, headerTpl) {
        IntranetManager.module("DirectoryManager.Public.Apps.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


                Views.ListItemView = Marionette.ItemView.extend({
                   template: listItemTpl,

                    className: "col-lg-4 col-md-4 col-sm-4",

                    onRender: function () {
                        console.log('Rendering the ListItemView view');
                    }

                });

                Views.ListCategoryView = Marionette.CompositeView.extend({
                    onBeforeRender: function(){
                        //console.log(JSON.stringify(this.model));

                    },

                    initialize: function(){

                        console.log(this.model);
                        this.collection = this.model.get('vc');
                        //alert(this.collection.length);

                    },

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) + 1
                        }
                    },

                    className: 'col-lg-12 col-md-12 col-sm-12',

                    template: listTpl,

                    childView: Views.ListItemView,

                    childViewContainer: 'div'

                });

                Views.ListView = Marionette.CollectionView.extend({
                    childView: Views.ListCategoryView
                });

                Views.LayoutView = Marionette.LayoutView.extend({
                   template: layoutTpl
                });

                Views.HeaderView = Marionette.ItemView.extend({
                   template: headerTpl

                });
            });

        return IntranetManager.DirectoryManager.Public.Apps.List.Views;
    });
