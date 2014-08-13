define([
    "app",
    "common/views",
    "tpl!apps/calendar/public/widgets/templates/news_item_headline.tpl",
    "tpl!apps/calendar/public/widgets/templates/news_headline_summary.tpl",
    "tpl!apps/calendar/public/widgets/templates/recent.tpl",
    "tpl!apps/calendar/public/widgets/templates/item_headline.tpl",
    "tpl!apps/calendar/public/widgets/templates/list_view.tpl"
],
    function ( IntranetManager, GlobalViews, newsItemHeadlineTpl,
               newsHeadlineSummaryTpl, recentTpl, itemHeadlineTpl, listViewTpl) {

        IntranetManager.module("CalendarManager.Public.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.NewsItemHeadlineView = Marionette.ItemView.extend({

                    initialize: function(options){
                     //  console.log('index of model ' + options.index);
                      this.model.set('index', options.index);
                    },

                    template: newsItemHeadlineTpl,

                    className: 'item',

                    onRender: function(){
                        console.log('<< Views.NewsItemHeadlineView - Loaded***DONE ***  >>');
                    }
                });

                Views.NewsHeadlineSummaryView = Views.NewsItemHeadlineView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: newsHeadlineSummaryTpl,

                    className: 'widgetnewsitem',

                    onRender: function(){
                        console.log('<< Views.NewsHeadlineSummary - Loaded***DONE ***  >>');
                    }
                });

                Views.RecentView = Marionette.CompositeView.extend({
                    template: recentTpl,

                    childView: Views.NewsHeadlineSummaryView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: 'div.ui.list',

                    className: 'widget-box nobottom',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.RelatedView - Loaded***DONE ***  >>');
                    }
                });

                Views.ItemHeadlineView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },
                    tagName: 'li',
                    template: itemHeadlineTpl,

                    onRender: function(){
                        console.log('<< Views.ItemHeadlineView - Loaded***DONE ***  >>');
                    }
                });

                Views.ListView = Marionette.CompositeView.extend({

                    initialize: function(options){
                        this.collection = options.collection;
                    },

                    template: listViewTpl,

                    childView: Views.ItemHeadlineView,

                    emptyView: GlobalViews.NoRecordsView,

                    childViewContainer: '.list-inner',

                    className: 'category-block list-widget',

                    childViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.ListView - Loaded***DONE ***  >>');
                    }
                });

            });

        return IntranetManager.CalendarManager.Public.Widgets.Views;
    });

