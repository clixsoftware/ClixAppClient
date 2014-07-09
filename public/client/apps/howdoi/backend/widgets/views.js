define([
    "../../../../app",
    "common/views",
    "tpl!apps/yp/widgets/templates/list.tpl",
    "tpl!apps/yp/widgets/templates/list_item.tpl",
    "tpl!apps/yp/widgets/templates/trending.tpl",
    "tpl!apps/yp/widgets/templates/related.tpl",
    "tpl!apps/yp/widgets/templates/recommended.tpl",
    "tpl!apps/yp/widgets/templates/categories.tpl",
    "tpl!apps/yp/widgets/templates/around_web.tpl",
    "tpl!apps/yp/widgets/templates/meta.tpl",
    "tpl!apps/yp/widgets/templates/yp_item_headline.tpl",
    "tpl!apps/yp/widgets/templates/basic_yp_item_headline.tpl",
    "tpl!apps/yp/widgets/templates/yp_headline_summary.tpl",
    "tpl!apps/yp/widgets/templates/recent.tpl",
    "tpl!apps/yp/widgets/templates/recent_item.tpl",
    "tpl!apps/yp/widgets/templates/most_active.tpl",
    "semantic"
],
    function ( IntranetManager, GlobalViews, listTpl, listItemTpl,  trendingTpl, relatedTpl, recommendedTpl, categoriesTpl, aroundWebTpl, metaTpl, ypItemHeadlineTpl,basicNewsItemHeadlineTpl, ypHeadlineSummaryTpl, recentTpl, recentItemTpl,mostActiveTpl) {

        IntranetManager.module("YPManager.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.NewsItemHeadlineView = Marionette.ItemView.extend({

                    initialize: function(options){
                     //  console.log('index of model ' + options.index);
                      this.model.set('index', options.index);
                    },

                    template: ypItemHeadlineTpl,

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

                    tagName: 'li',

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

                    template: ypHeadlineSummaryTpl,

                    className: 'widgetypitem',

                    onRender: function(){
                        console.log('<< Views.NewsHeadlineSummary - Loaded***DONE ***  >>');
                    }
                });

                Views.TrendingView = Marionette.CompositeView.extend({
                    template: trendingTpl,

                    itemView: Views.NewsItemHeadlineView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

                    className: 'widget yp public trending view',

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

                    itemViewContainer: 'ul',

                    className: 'widget-box list',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.RelatedView - Loaded***DONE ***  >>');
                    }
                });

                Views.RecentItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: recentItemTpl,

                    tagName: 'li',

                    onRender: function(){
                        console.log('<< Views.RecentItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.RecentView = Marionette.CompositeView.extend({
                    template: recentTpl,

                    itemView: Views.RecentItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'ul.first-link',

                    className: 'category-block',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.RelatedView - Loaded***DONE ***  >>');
                    }
                });

                Views.MostActiveView = Marionette.CompositeView.extend({
                    template: mostActiveTpl,

                    itemView: Views.RecentItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'ul.first-link',

                    className: 'category-block',

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

                    className: 'widget recommended yp view',

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

        return IntranetManager.YPManager.Widgets.Views;
    });

