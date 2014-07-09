
/*
 * Application: Header
 * Views: HeaderManager SiteNav Views
 * Module: HeaderManager.SiteNav.Views
 *
 * */


define([
    "app",
    "pace",
    "tpl!apps/header/entities/sitenav/list/templates/list.tpl",
    "tpl!apps/header/entities/sitenav/list/templates/list_item.tpl",
    'semantic'
],
    function ( IntranetManager, pace, listTpl, listItemTpl ) {


        IntranetManager.module("HeaderManager.SiteNav.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.ListItemView = Marionette.ItemView.extend({

                    template: listItemTpl,

                    className: 'menu-item menu-item-type-post_type',

                    tagName: 'li',

                    events: {
                        'click a': 'navigate'
                    },

                    navigate: function(e){
                        e.preventDefault();

                        this.trigger('navigate', this.model);
                    },

                    onRender: function(){
                        if(this.model.selected){
                            //add class so semantic will highlight the active entry in the navbar
                            this.$el.addClass('active');
                        }

                    }
                });

                Views.ListView = Marionette.CompositeView.extend({

                    template: listTpl,

                    itemView: Views.ListItemView,

                    itemViewContainer: 'div',

                    events: {
                        'click a.brand': 'brandClicked'
                    },

                    brandClicked: function(e){
                        e.preventDefault();
                        this.trigger('brand:clicked');
                    }
                });

                Views.SiteNavView = Marionette.CompositeView.extend({

                    template: listTpl,

                    itemView: Views.ListItemView,

                    itemViewContainer: 'ul#menu-primary-navigation',

                    events: {
                        'click a.brand': 'brandClicked'
                    },

                    brandClicked: function(e){
                        e.preventDefault();
                        this.trigger('brand:clicked');
                    }
                })


            });

        return IntranetManager.HeaderManager.SiteNav.Views;
    });
