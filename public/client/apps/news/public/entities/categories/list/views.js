define([
    "app",
    "tpl!apps/news/public/entities/categories/list/templates/list.tpl",
    "tpl!apps/news/public/entities/categories/list/templates/list_item.tpl"
],
    function ( IntranetManager, listTpl, listItemTpl) {

        IntranetManager.module("NewsManager.Category.List.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {


                Views.ListItemView = Marionette.ItemView.extend({
                    template: listItemTpl,

                    tagName: 'span',

                    className: 'wptag',


                    onRender: function(){
                        console.log('Rendering the ListItemView view');
                        $(this.$el).addClass('t' + this.model.get('id'));
                    }


                });

                Views.ListView = Marionette.CompositeView.extend({

                    className: 'widget-box',

                    template: listTpl,

                    itemView: Views.ListItemView,


                    itemViewContainer: 'p.taglisting.page',

                    onRender: function () {
                        console.log('Rendering the ListView view');
                    }
                });


              });



        return IntranetManager.NewsManager.Category.List.Views;
    });
