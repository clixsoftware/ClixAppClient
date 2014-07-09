
define([
    "app",
    "apps/howdoi/public/widgets/views"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("HowDoIManager.Public.Widgets.Show",
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

                getMostActiveView: function(collection){
                    return new WidgetsShow.HowDoIMostActiveView({
                        collection: collection
                    });
                },

                getRecommendedView: function(collection){
                    return new WidgetsShow.RecommendedView({
                        collection: collection
                    });
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

                showRelatedPosts: function(applicationId){

                    console.group('<< HowDoIManager: Widgets: showRelatedPosts >>');


                    var that = this;

                    require([
                        "entities/yp_post"
                    ], function(){

                        var fetchingPost = IntranetManager.request('yp:posts:related', applicationId);

                        console.log('<< showRelatedPosts: Fetching Postings  >>');

                        fetchingPost.then(function(posts){
                            console.log('<< showRelatedPosts: Fetching Postings ***DONE ***  >>');
                            console.log('<< showRelatedPosts: Fetching Postings ***SUCCESSFUL***  >>');

                            console.log('<< showRelatedPosts: Loading to layoutZone1 >>');

                            //IntranetManager.layoutContent.postRelated.show(that.getRelatedView(posts));

                            var region = Marionette.Region.extend({
                                el: '#post-related'
                            });

                            IntranetManager.addRegions({
                                relatedPostsRegion:  region

                            });
                            IntranetManager.relatedPostsRegion.reset();

                            IntranetManager.relatedPostsRegion.show(that.getRelatedView(posts));

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

                showRecentPosts: function(options){
                    var that = this;

                    console.log('<< HowDoIManager: Widgets: showRecentPosts - ' + JSON.stringify(options) + ' >>');

                    require([
                        "entities/yp_post"
                    ], function(){

                        var fetchingPosts = IntranetManager.request('yp:posts:get:feature:app', options);

                        fetchingPosts.then(function(posts){

                            console.log('found posts');
                            IntranetManager.layoutZone4.reset();
                            IntranetManager.layoutZone4.show(that.getRecentView(posts));
                            //IntranetManager.layoutZone1.show(that.getRecentView(posts));
                        });

                    });

                    console.groupEnd();
                },

                showMostActivePosts: function(options){

                    console.group('<< HowDoIManager: Widgets: showMostActivePosts >>');


                    var that = this;

                    require([
                        "entities/yp_post"
                    ], function(){

                        var fetchingPost = IntranetManager.request('yp:posts:search:app:mostactive', options);

                         fetchingPost.then(function(posts){
                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getMostActiveView(posts));

                        });


                    });

                    console.groupEnd();
                },

                getHomeCategoryListView: function (results) {

                    return new WidgetsShow.HomeCategoryListView({
                        collection: results
                    });
                },

                showAppCategoryListWidget: function(objectId){

                    console.log(objectId);
                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:object:terms', objectId);

                        fetchingCategory.then(function ( categories ) {
                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getHomeCategoryListView(categories));

                        })
                            .fail(function ( error ) {
                                alert(error);
                            });


                    });

                },

                getHomeTagsListView: function (results) {

                    return new WidgetsShow.HomeTagsListView({
                        collection: results
                    });
                },

                showAppTagsListWidget: function(objectId){

                    console.log(objectId);
                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:app:tags', objectId);

                        fetchingCategory.then(function ( categories ) {
                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getHomeTagsListView(categories));

                        })
                            .fail(function ( error ) {
                                alert(error);
                            });


                    });

                },

                getPostRelatedCategoriesView: function(categories){
                    return new WidgetsShow.PostRelatedCategoriesView({
                        collection: categories
                    })

                },


                showAppRelatedCategoriesWidget: function(objectId){
                    var that = this;


                    require([
                        "entities/taxonomy"
                    ], function(){

                        var fetchingCategories = IntranetManager.request('taxonomy:object:terms', objectId);

                        fetchingCategories.then(function(categories){


                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getPostRelatedCategoriesView(categories));

                        }).fail(function(err){
                            console.log('showPostRelatedCategoriesWidget: Error occurred  ' + err);
                        })
                    });
                },


                showPostRelatedCategoriesWidget: function(objectId){
                    var that = this;


                    require([
                        "entities/taxonomy"
                    ], function(){

                        var fetchingCategories = IntranetManager.request('taxonomy:object:terms', objectId);

                        fetchingCategories.then(function(categories){


                            IntranetManager.layoutZone1.reset();
                           IntranetManager.layoutZone1.show(that.getPostRelatedCategoriesView(categories));

                        }).fail(function(err){
                            console.log('showPostRelatedCategoriesWidget: Error occurred  ' + err);
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

    return IntranetManager.HowDoIManager.Public.Widgets.Show.Controller;
});

