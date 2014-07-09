
define([
    "app",
    "apps/news/public/widgets/views"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("NewsManager.Widgets.Show",
        function ( Show,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _ ) {

            Show.Controller = {

                getTrendingView: function(posts){
                    return new WidgetsShow.TrendingView({
                        collection: posts
                    });
                },

                getRelatedView: function(collection){
                    return new WidgetsShow.RelatedView({
                        collection: collection
                    });
                },

                getRecentView: function(collection){
                    return new WidgetsShow.RecentView({
                        collection: collection
                    });
                },

                getRecommendedView: function(collection){
                    return new WidgetsShow.RecommendedView({
                        collection: collection
                    });
                },


                getPostCategoriesView: function(categories){
                    return new WidgetsShow.PostCategoriesView({
                        collection: categories
                    })

                },

                getNewsCategoriesView: function(app){

                    return new WidgetsShow.CategoriesView();
                },

                getMetaView: function(){
                    return new WidgetsShow.MetaView({

                    });
                },

                getPhotoGallery: function(){
                    return new WidgetsShow.Top5NewsView();
                },

                getLatestView: function(){
                    return new WidgetsShow.LatestView();
                },

                showPublicAppCategories: function(app){

                    console.log('<< INIT: showPublicAppCategories >>');

                    IntranetManager.layoutZone3.show(this.getNewsCategoriesView(app));
                },

                showRelatedPosts: function(options){

                    console.group('<< NewsManager: Widgets: showRelatedPosts >>');


                    var that = this;

                    require([
                        "entities/news_post"
                    ], function(){

                        var fetchingPost = IntranetManager.request('news:posts:related', options);

                        console.log('<< showRelatedPosts: Fetching Postings  >>');

                        $.when(fetchingPost).done(function(posts){

                            console.log('<< showRelatedPosts: Fetching Postings ***DONE ***  >>');

                            if(posts){

                                console.log('<< showRelatedPosts: Fetching Postings ***SUCCESSFUL***  >>');

                                console.log('<< showRelatedPosts: Loading to layoutZone1 >>');

                                //IntranetManager.layoutContent.postRelated.show(that.getRelatedView(posts));

                                var region = Marionette.Region.extend({
                                    el: '#post-related'
                                });

                                IntranetManager.addRegions({
                                    relatedPostsRegion:  region

                                });

                                IntranetManager.relatedPostsRegion.show(that.getRelatedView(posts));

                            }else{

                                console.log('TODO: no record found view');
                            }
                        });

                    });

                    console.groupEnd();
                },

                showRecommendedPosts: function(options){

                    console.group('<< NewsManager: Widgets: showRecommendedPosts >>');


                    var that = this;

                    require([
                        "entities/news_post"
                    ], function(){

                        var fetchingPost = IntranetManager.request('news:posts:recommended', options);

                        console.log('<< showTrendingPosts: Fetching Postings  >>');

                        $.when(fetchingPost).done(function(posts){

                            console.log('<< showRecommendedPosts: Fetching Postings ***DONE ***  >>');

                            if(posts){

                                console.log('<< showRecommendedPosts: Fetching Postings ***SUCCESSFUL***  >>');

                                //IntranetManager.layoutZone2.show(that.getRecommendedView(posts));


                                var recommendedRegion = Marionette.Region.extend({
                                    el: '#post-recommended'
                                });

                                IntranetManager.addRegions({
                                    recommendedRegion:  recommendedRegion

                                });

                                IntranetManager.recommendedRegion.show(that.getRecommendedView(posts));


                            }else{

                                console.log('TODO: no record found view');
                            }
                        });

                    });

                    console.groupEnd();

                },

                showTrendingPosts: function(options){

                    console.log('<< NewsManager: Widgets: showTrendingPosts>>');


                    var that = this;

                    require([
                        "entities/news_post"
                    ], function(){

                        var fetchingPost = IntranetManager.request('news:posts:trending', options);

                        console.log('<< showTrendingPosts: Fetching Postings  >>');

                        $.when(fetchingPost).done(function(posts){

                            console.log('<< showTrendingPosts: Fetching Postings ***DONE ***  >>');

                            if(posts){

                                console.log('<< showTrendingPosts: Fetching Postings ***SUCCESSFUL***  >>');

                                console.log('<< showTrendingPosts: Loading to layoutZone1 >>');

                                IntranetManager.layoutZone1.show(that.getTrendingView(posts));

                            }else{

                                console.log('TODO: no record found view');
                            }
                        });

                    });

                    console.groupEnd();

                },

                showRecentPosts: function(appId){
                    var that = this;

                    console.log('<< NewsManager: Widgets: showRecentPosts ' +  appId + ' >>');

                    require([
                        "entities/news_post"
                    ], function(){

                        var options =  {
                            parent_application: appId,
                            limit: 5
                        };

                        var fetchingPosts = IntranetManager.request('news:posts:search:recent', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getRecentView(posts));
                            //IntranetManager.layoutZone1.show(that.getRecentView(posts));
                        });

                    });

                    console.groupEnd();
                },

               showPostCategories: function(objectId){
                   var that = this;
                   console.log('<< NewsManager: Widgets: showPostCategories ' +  objectId + ' >>');

                   require([
                    "entities/taxonomy"
                   ], function(){

                        var fetchingCategories = IntranetManager.request('taxonomy:object:terms', objectId);

                       fetchingCategories.then(function(categories){

                           IntranetManager.layoutZone2.reset();
                           IntranetManager.layoutZone2.show(that.getPostCategoriesView(categories));

                       })
                   });
               },

                getPostRelatedTagsView: function(categories){
                    return new WidgetsShow.PostRelatedTagsView({
                        collection: categories
                    })

                },

                showPostRelatedTagsWidget: function(objectId){
                    var that = this;

                    require([
                        "entities/taxonomy"
                    ], function(){

                        var fetchingCategories = IntranetManager.request('taxonomy:object:tags', objectId);

                        fetchingCategories.then(function(categories){


                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getPostRelatedTagsView(categories));

                        }).fail(function(err){
                            console.log('showPostRelatedCategoriesWidget: Error occurred  ' + err);
                        })
                    });
                }



            }
        });

    return IntranetManager.NewsManager.Widgets.Show.Controller;
});

