define([
    "app",
    "common/views",
    "tpl!apps/howdoi/public/widgets/templates/list.tpl",
    "tpl!apps/howdoi/public/widgets/templates/list_item.tpl",
    "tpl!apps/howdoi/public/widgets/templates/trending.tpl",
    "tpl!apps/howdoi/public/widgets/templates/related.tpl",
    "tpl!apps/howdoi/public/widgets/templates/recommended.tpl",
    "tpl!apps/howdoi/public/widgets/templates/categories.tpl",
    "tpl!apps/howdoi/public/widgets/templates/around_web.tpl",
    "tpl!apps/howdoi/public/widgets/templates/meta.tpl",
    "tpl!apps/howdoi/public/widgets/templates/yp_item_headline.tpl",
    "tpl!apps/howdoi/public/widgets/templates/basic_yp_item_headline.tpl",
    "tpl!apps/howdoi/public/widgets/templates/yp_headline_summary.tpl",
    "tpl!apps/howdoi/public/widgets/templates/recent.tpl",
    "tpl!apps/howdoi/public/widgets/templates/recent_item.tpl",
    "tpl!apps/howdoi/public/widgets/templates/most_active.tpl",
    "tpl!apps/howdoi/public/widgets/templates/cat_list.tpl",
    "tpl!apps/howdoi/public/widgets/templates/cat_list_item.tpl",
    "tpl!apps/howdoi/public/widgets/templates/post_category_list.tpl",
    "tpl!apps/howdoi/public/widgets/templates/post_category_list_item.tpl",
    "tpl!apps/howdoi/public/widgets/templates/post_tag_list.tpl",
    "tpl!apps/howdoi/public/widgets/templates/post_tag_list_item.tpl",
    "tpl!apps/howdoi/public/widgets/templates/tags_list.tpl",
    "tpl!apps/howdoi/public/widgets/templates/tags_list_item.tpl"

],
    function ( IntranetManager, GlobalViews, listTpl, listItemTpl,  trendingTpl, relatedTpl, recommendedTpl, categoriesTpl, aroundWebTpl, metaTpl, ypItemHeadlineTpl,basicNewsItemHeadlineTpl, ypHeadlineSummaryTpl, recentTpl, recentItemTpl,
               mostActiveTpl, catListTpl, catListItemTpl, postCategoryListTpl, postCategoryListItemTpl, postTagListTpl, postTagListItemTpl, tagsListTpl, tagsListItemTpl) {

        IntranetManager.module("HowDoIManager.Public.Widgets.Views",
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

                Views.HomeCategoryListItemView = Marionette.ItemView.extend({
                    template: catListItemTpl,

                    tagName: 'li',

                    className: 'howdoi',


                    onRender: function(){
                        console.log('Rendering the ListItemView view');
                        //$(this.$el).addClass('t' + this.model.get('id'));
                    }


                });

                Views.HomeCategoryListView = Marionette.CompositeView.extend({

                    className: 'widget-box',

                    template: catListTpl,

                    itemView: Views.HomeCategoryListItemView,


                    itemViewContainer: 'ul.howdoi',

                    onRender: function () {
                        console.log('Rendering the ListView view');
                    }
                });

                Views.PostCategoriesItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: postCategoryListItemTpl,

                    tagName: 'span',

                    className: 'wptag',

                    onRender: function(){
                        this.$el.addClass('t' + this.model.get('id'));
                        //console.log('<< Views.PostCategoriesItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.PostRelatedCategoriesView = Marionette.CompositeView.extend({
                    template: postCategoryListTpl,

                    itemView: Views.PostCategoriesItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'div.ui.list',

                    className: 'widget-box',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.PostRelatedCategoriesView - Loaded***DONE ***  >>');
                    }
                });

                Views.PostRelatedTagItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: postTagListItemTpl,

                    tagName: 'span',

                    className: '',

                    onRender: function(){
                        console.log(this.$el.addClass('t' + this.model.get('id')));
                        console.log('<< Views.PostCategoriesItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.PostRelatedTagsView = Marionette.CompositeView.extend({

                    template: postTagListTpl,

                    itemView: Views.PostRelatedTagItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'p.ui.list',

                    className: 'widget-box',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.PostCategoriesView - Loaded***DONE ***  >>');
                    }
                });

                Views.HomeTagsListItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: tagsListItemTpl,

                    tagName: 'span',

                    className: '',

                    onRender: function(){
                        console.log(this.$el.addClass('t' + this.model.get('id')));
                        console.log('<< Views.PostCategoriesItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.HomeTagsListView = Marionette.CompositeView.extend({

                    className: 'widget-box',

                    template: tagsListTpl,

                    itemView: Views.HomeTagsListItemView,

                    itemViewContainer: 'div.tagcloud',

                    onRender: function () {
                        console.log('Rendering the ListView view');
                    }
                });


            });

        return IntranetManager.HowDoIManager.Public.Widgets.Views;
    });

