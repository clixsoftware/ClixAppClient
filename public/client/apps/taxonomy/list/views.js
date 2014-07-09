/*
 * Application: Workspace
 * Views: Workspace List Views
 * Module: WorkspaceManager.List.Views
 *
 * */

define(["app",
    "common/views",
    "tpl!apps/taxonomy/list/templates/blank.tpl",
    "tpl!apps/taxonomy/list/templates/blank_help.tpl",
    "tpl!apps/taxonomy/list/templates/list.tpl",
    "tpl!apps/taxonomy/list/templates/list_item.tpl",
    "tpl!apps/taxonomy/list/templates/categories.tpl"
],
    function ( IntranetManager, GlobalViews, blankTpl, blankHelpTpl,  listTpl, listItemTpl, categoriesTpl ) {
        IntranetManager.module("TaxonomyManager.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.BlankHelpView = GlobalViews.BlankHelpView.extend({
                    template: blankHelpTpl
                });

                Views.BlankView = GlobalViews.BlankView.extend({
                    template: blankTpl
                });


                Views.CategoriesView = Marionette.ItemView.extend({
                    className: "widget",
                    template: categoriesTpl,
                    onRender: function () {
                        console.log('Rendering the Categories view');
                    }
                });

                Views.ListItemView =  GlobalViews.ListItemView.extend({
                    template: listItemTpl
                }) ;

                Views.ListView = GlobalViews.ListView.extend({
                    template: listTpl,
                     itemView: this.ListItemView


                });


            });

        return IntranetManager.TaxonomyManager.List.Views;
    });
