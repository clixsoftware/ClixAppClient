define([
    "app",
    "common/views",
    "tpl!apps/news/widgets/templates/list.tpl",
    "tpl!apps/news/widgets/templates/list_item.tpl",
    "tpl!apps/news/widgets/templates/trending.tpl",
    "tpl!apps/news/widgets/templates/related.tpl",
    "tpl!apps/news/widgets/templates/recommended.tpl",
    "tpl!apps/news/widgets/templates/categories.tpl",
    "tpl!apps/news/widgets/templates/around_web.tpl",
    "tpl!apps/news/widgets/templates/meta.tpl",
    "tpl!apps/news/widgets/templates/news_item_headline.tpl",
    "tpl!apps/news/widgets/templates/basic_news_item_headline.tpl",
    "tpl!apps/news/widgets/templates/news_headline_summary.tpl",
    "tpl!apps/news/widgets/templates/recent.tpl",
    "semantic"
],
    function ( IntranetManager, GlobalViews, listTpl, listItemTpl,  trendingTpl, relatedTpl, recommendedTpl, categoriesTpl, aroundWebTpl, metaTpl, newsItemHeadlineTpl,basicNewsItemHeadlineTpl, newsHeadlineSummaryTpl, recentTpl) {

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

                Views.BasicNewsItemHeadlineView = Views.NewsItemHeadlineView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: basicNewsItemHeadlineTpl,

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

                Views.TrendingView = Marionette.CompositeView.extend({
                    template: trendingTpl,

                    itemView: Views.NewsItemHeadlineView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

                    className: 'widget news public trending view',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.TrendingView - Loaded***DONE ***  >>');
                    }
                });

                Views.RelatedView = Marionette.CompositeView.extend({
                    template: relatedTpl,

                    itemView: Views.BasicNewsItemHeadlineView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

                    className: 'widget related news view',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.RelatedView - Loaded***DONE ***  >>');
                    }
                });

                Views.RecentView = Marionette.CompositeView.extend({
                    template: recentTpl,

                    itemView: Views.NewsHeadlineSummaryView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

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

                Views.RecommendedView = Marionette.CompositeView.extend({
                    template: recommendedTpl,

                    itemView: Views.BasicNewsItemHeadlineView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

                    className: 'widget recommended news view',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.RecommendedView - Loaded***DONE ***  >>');
                    }
                });

                Views.CategoriesView = Marionette.ItemView.extend({
                    template: categoriesTpl
                });

                Views.AroundWebView = Marionette.ItemView.extend({
                    template: trendingTpl
                });

                Views.MetaView = Marionette.ItemView.extend({
                    template: trendingTpl
                });

                Views.LatestView = Marionette.ItemView.extend({
                    template: trendingTpl
                });


                Views.ListItemView =  GlobalViews.ListItemView.extend({
                    template: listItemTpl
                }) ;

                Views.ListView = GlobalViews.ListView.extend({
                    template: listTpl,
                    itemView: this.ListItemView


                });

            });

        return IntranetManager.NewsManager.Widgets.Views;
    });

