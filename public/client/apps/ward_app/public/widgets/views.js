define([
    "app",
    "common/views",
    "tpl!apps/sites/public/widgets/templates/featured_posts.tpl",
    "tpl!apps/sites/public/widgets/templates/featured_post_item.tpl",
    "tpl!apps/sites/public/widgets/templates/no_item_found.tpl",
    "tpl!apps/sites/public/widgets/templates/home_posts.tpl",
    "tpl!apps/sites/public/widgets/templates/home_posts_item.tpl",
    "tpl!apps/sites/public/widgets/templates/home_posts_item_small_media.tpl",
    "tpl!apps/sites/public/widgets/templates/home_posts_item_headline.tpl",
    "tpl!apps/sites/public/widgets/templates/calendar_posts.tpl",
    "tpl!apps/sites/public/widgets/templates/ad_post.tpl",
    "tpl!apps/sites/public/widgets/templates/howdoi_most_active.tpl",
    "tpl!apps/sites/public/widgets/templates/recently_updated.tpl",
    "tpl!apps/sites/public/widgets/templates/breadcrumb.tpl",
    "tpl!apps/sites/public/widgets/templates/how_do_i_item.tpl",
    "tpl!apps/sites/public/widgets/templates/home_events.tpl",
    "tpl!apps/sites/public/widgets/templates/home_event_item.tpl"
],
    function ( IntranetManager, GlobalViews, featuredPostsTpl, featuredPostItemTpl,
               noItemTpl, homePostsTpl, homePostItemTpl, homePostItemSmallMediaTpl,
               homePostItemHeadlineTpl,  calendarPostsTpl, adPostTpl,howDoIMostActiveTpl,
               recentUpdatedTpl, breadcrumbTpl, howDoITpl, homeEventTpl, homeEventItemTpl) {

        IntranetManager.module("SiteManager.Widgets.Views",
            function ( Views, IntranetManager, Backbone, Marionette, $, _ ) {

                Views.HowDoIItemView = Marionette.ItemView.extend({

                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },

                    template: howDoITpl,

                    tagName: 'li',

                    onRender: function(){
                        console.log('<< Views.HowDoIItemView - Loaded***DONE ***  >>');
                    }
                });

                Views.HowDoIMostActiveView = Marionette.CompositeView.extend({
                    template: howDoIMostActiveTpl,

                    itemView: Views.HowDoIItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'ul.first-link',

                    className: 'category-block',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                       // alert('rendering how do i most active');
                        console.log('<< Views.HowDoIMostActiveView - Loaded***DONE ***  >>');
                    }
                });


                Views.HowDoIRecentView = Marionette.CompositeView.extend({
                    template: recentUpdatedTpl,

                    itemView: Views.HowDoIItemView,

                    emptyView: GlobalViews.NoRecordsView,

                    itemViewContainer: 'ul.first-link',

                    className: 'category-block',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        // alert('rendering how do i most active');
                        console.log('<< Views.HowDoIMostActiveView - Loaded***DONE ***  >>');
                    }
                });


                Views.BreadcrumbView = Marionette.ItemView.extend({
                    template: breadcrumbTpl,

                    onRender: function(){
                        console.log('<< Views.BreadcrumbView - Loaded ***DONE ***  >>');
                    }
                });


                Views.RecentlyUpdatedView = Marionette.ItemView.extend({
                    template: recentUpdatedTpl,

                    onRender: function(){
                        console.log('<< Views.RecentlyUpdatedView - Loaded ***DONE ***  >>');
                    }
                });

                Views.CalendarPostsView = Marionette.ItemView.extend({
                    template: calendarPostsTpl,

                    onRender: function(){
                        console.log('<< Views.CalendarPostsView - Loaded ***DONE ***  >>');
                    }
                });


                Views.AdPostView = Marionette.ItemView.extend({
                    template: adPostTpl,

                    onRender: function(){
                        console.log('<< Views.AdPostView - Loaded ***DONE ***  >>');
                    }
                });


                Views.Top5NewsView = Marionette.ItemView.extend({
                    template: featuredPostsTpl,

                    onRender: function(){
                        console.log('<< Views.Top5NewsView - Loaded to layoutZone1 ***DONE ***  >>');
                    }
                });


                Views.NoItemFoundView = Marionette.ItemView.extend({
                    template: noItemTpl,

                    onRender: function(){
                        console.log('<< Views.NoItemFoundView - Loaded ***DONE ***  >>');
                    }
                });


                Views.PostItemView = Marionette.ItemView.extend({
                    template: homePostItemTpl,

                    className: 'item item-post',

                    ui: {
                      media : '.js-media'
                    },

                    onRender: function(){

                        //alert(this.model.get('media'));

                        if(_.isEmpty(this.model.get('media'))){
                            this.ui.media.hide();
                        }else{
                            if(this.model.get('media')){

                                //alert('media available');
                            }else{
                                this.ui.media.hide();
                            }

                        }
                        console.log('<< Views.NoItemFoundView - Loaded ***DONE ***  >>');
                    }
                });

                Views.FeaturedPostsView = Marionette.CollectionView.extend({
                    //template: featuredPostsTpl,

                    itemView: Views.PostItemView,

                    emptyView: Views.NoItemFoundView,

                    className: 'widget home featured posts ui four items',

                    itemViewContainer: 'div ',

                    onRender: function(){
                        console.log('<< Views.FeaturedPostsView - Loaded  ***DONE ***  >>');
                    }
                });

                Views.HomeNewsPostItem = Marionette.ItemView.extend({


                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },


                    //template: homePostItemTpl,

                    template: homePostItemSmallMediaTpl,

                    className: 'item box-generic',

                    onBeforeRender: function(){
                      /*  if(this.model.get('index') > 2 && this.model.get('index') < 6){
                            this.template = homePostItemSmallMediaTpl;
                        }*/
                        if(this.model.get('index') >= 6){
                            this.template = homePostItemHeadlineTpl;
                        }

                    },
                    onRender: function(){

                        //console.log(this.$el.addClass('ttestst' + this.model.get('index')));
                        console.log('<< Views.HomeNewsPostItem - Loaded ***DONE ***  >>');
                    }
                });


                Views.HomeNewsPostsView = Marionette.CompositeView.extend({

                    template: homePostsTpl,

                   itemView: Views.HomeNewsPostItem,

                    emptyView: Views.NoItemFoundView,

                   tagName: 'section',

                   className: 'most_popular_block',

                   itemViewContainer: 'div#ht-feature-news',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.FeaturedPostsView - Loaded  ***DONE ***  >>');
                    }
                });

                Views.HomeEventsPostItem = Marionette.ItemView.extend({


                    initialize: function(options){
                        //  console.log('index of model ' + options.index);
                        this.model.set('index', options.index);
                    },
                    template: homeEventItemTpl,

                    className: 'item box-generic',

/*                    onBeforeRender: function(){
                        *//*  if(this.model.get('index') > 2 && this.model.get('index') < 6){
                         this.template = homePostItemSmallMediaTpl;
                         }*//*
                        if(this.model.get('index') >= 6){
                            this.template = homePostItemHeadlineTpl;
                        }

                    },*/
                    onRender: function(){

                        //console.log(this.$el.addClass('ttestst' + this.model.get('index')));
                        console.log('<< Views.HomeEventsPostItem - Loaded ***DONE ***  >>');
                    }
                });


                Views.HomeEventsPostsView = Marionette.CompositeView.extend({

                    template: homeEventTpl,

                    itemView: Views.HomeEventsPostItem,

                    emptyView: Views.NoItemFoundView,

                    tagName: 'section',

                    className: 'most_popular_block',

                    itemViewContainer: 'div#ht-events',

                    itemViewOptions: function(model){
                        return {
                            index: this.collection.indexOf(model) +1
                        }
                    },

                    onRender: function(){
                        console.log('<< Views.HomeEventsPostsView - Loaded  ***DONE ***  >>');
                    }
                });

            });

        return IntranetManager.SiteManager.Widgets.Views;
    });

