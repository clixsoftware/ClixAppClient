
define(["app",
    "common/views",
    "tpl!apps/sites/backend/entities/sites/list/templates/list.tpl",
    "tpl!apps/sites/backend/entities/sites/list/templates/list_item.tpl",
    "tpl!apps/sites/backend/entities/sites/list/templates/search.tpl"
],
    function ( IntranetManager, GlobalViews, listTpl, listItemTpl, searchTpl) {
        IntranetManager.module("SitesManager.Sites.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


                Views.ListItemView =  GlobalViews.ListItemView.extend({
                    template: listItemTpl
                }) ;

                Views.ListView = GlobalViews.ListView.extend({
                    template: listTpl,
                     itemView: this.ListItemView


                });

                Views.SearchView = Marionette.ItemView.extend({
                   template: searchTpl
                });


            });

        return IntranetManager.SitesManager.Sites.List.Views;
    });
