define([
    "app",
    "common/views",
    "tpl!apps/news/public/widgets/templates/news_item_headline.tpl",
    "tpl!apps/news/public/widgets/templates/news_headline_summary.tpl",
    "tpl!apps/news/public/widgets/templates/recent.tpl"
],
    function ( IntranetManager, GlobalViews, newsItemHeadlineTpl,
               newsHeadlineSummaryTpl, recentTpl) {

        IntranetManager.module("NewsManager.Widgets.Views",
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


            });

        return IntranetManager.NewsManager.Widgets.Views;
    });

