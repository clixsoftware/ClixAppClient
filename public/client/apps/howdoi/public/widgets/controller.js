
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

                getRelatedView: function(collection){
                    return new WidgetsShow.ListView({
                        collection: collection
                    });
                },

                getRecentView: function(collection){
                    return new WidgetsShow.ListView({
                        collection: collection
                    });
                },

                getPopularView: function(collection){
                    return new WidgetsShow.ListView({
                        collection: collection
                    });
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

                showPopularPosts: function(options){
                    var that = this;

                    console.group('<< HowDoIManager: Widgets: showPopularPosts  ')
                    console.info(options);

                    require([
                        "entities/howdoi"
                    ], function(){

                        var fetchingPosts = IntranetManager.request('howdoi:app:posts:popular', options);

                        fetchingPosts.then(function(posts){

                            console.log('found posts');
                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getPopularView(posts));
                            //IntranetManager.layoutZone1.show(that.getRecentView(posts));
                        });

                    });

                    console.groupEnd();
                }

            }
        });

    return IntranetManager.HowDoIManager.Public.Widgets.Show.Controller;
});

