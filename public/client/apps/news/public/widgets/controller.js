
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

                getRecentView: function(collection){
                       return new WidgetsShow.RecentView({
                        collection: collection
                    });

                },

                showRecentPosts: function(options){
                    var that = this;

                    console.group('<< News: Widgets: showRecentPosts>>');

                    require([
                        "entities/news"
                    ], function(){

                        options.limit = 5;
                        options.sort = 'createdAt desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('news:app:posts:find', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getRecentView(posts));
                        })
                            .fail(function(error){

                                IntranetManager.trigger("core:error:action", error);

                            });

                    });

                    console.groupEnd();
                },

                getPopularView: function(collection){
                    return new WidgetsShow.ListView({
                        collection: collection
                    });

                },
                showPopularPosts: function(options){
                    var that = this;

                    require([
                        "entities/news"
                    ], function(){

                        console.group('<< News Manager: Widgets: showPopularPosts  ')
                        options.limit = 5;
                        options.sort = 'views desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('news:app:posts:find', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getPopularView(posts));

                        });

                    });

                }
            }
        });

    return IntranetManager.NewsManager.Widgets.Show.Controller;
});

