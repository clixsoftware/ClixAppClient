define([
        "app",
        "common/views",
        "tpl!apps/classifieds/public/widgets/templates/action_menu.tpl",
        "tpl!apps/classifieds/public/widgets/templates/recent_list.tpl",
        "tpl!apps/classifieds/public/widgets/templates/list_item.tpl",
    ],
    function (IntranetManager, GlobalViews, actionMenuTpl, recentListTpl, listItemTpl) {

        IntranetManager.module("ClassifiedsManager.Widgets.Views",
            function (Views, IntranetManager, Backbone, Marionette, $, _) {

                Views.ActionMenuView = Marionette.ItemView.extend({
                    template: actionMenuTpl,

                    onRender: function () {
                        console.log('Rendering the ListItemView view');
                    }

                });

                Views.ListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: listItemTpl,

                    className: 'item',

                    onRender: function(){
                        console.log('<< Classifieds - Views.ListItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.RecentsPostsView = Marionette.CompositeView.extend({

                    template: recentListTpl,

                    childView: Views.ListItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'div.ui.list',

                    className: 'widget-box nobottom',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Classifieds - Views.RecentListItemView - Loaded***DONE ***  >>');
                    }
                });



            });

        return IntranetManager.ClassifiedsManager.Widgets.Views;
    });

