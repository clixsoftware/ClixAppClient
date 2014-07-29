
/*
 * Application: Header
 * Views: HeaderManager SiteNav Views
 * Module: HeaderManager.SiteNav.Views
 *
 * */


define([
    "app",
    "pace",
    "tpl!apps/header/entities/utilitynav/list/templates/list.tpl",
    "tpl!apps/header/entities/utilitynav/list/templates/list_item.tpl",
    'semantic'
],
    function ( IntranetManager, pace, listTpl, listItemTpl ) {


        IntranetManager.module("HeaderManager.Utility.Views",
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

                   childView: Views.ListItemView,

                    childViewContainer: 'div',

                    events: {
                        'click a.brand': 'brandClicked'
                    },

                    brandClicked: function(e){
                        e.preventDefault();
                        this.trigger('brand:clicked');
                    }
                });

                Views.UtilityNavView = Marionette.CompositeView.extend({

                    template: listTpl,

                    childView: Views.ListItemView,

                    childViewContainer: 'ul#menu-utilities',

                    events: {
                        'click a.brand': 'brandClicked'
                    },

                    brandClicked: function(e){
                        e.preventDefault();
                        this.trigger('brand:clicked');
                    }
                })


            });

        return IntranetManager.HeaderManager.Utility.Views;
    });
