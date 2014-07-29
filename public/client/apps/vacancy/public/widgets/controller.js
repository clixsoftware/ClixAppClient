
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

                showRecentPosts: function(appId){
                    var that = this;

                    console.log('<< NewsManager: Widgets: showRecentPosts ' +  appId + ' >>');

                    require([
                        "entities/news"
                    ], function(){

                        var options =  {
                            parent_application: appId,
                            limit: 5
                        };

                        var fetchingPosts = IntranetManager.request('news:apps:posts:recent', options);

                        fetchingPosts.then(function(posts){

                            console.log(posts);

                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getRecentView(posts));
                        })
                            .fail(function(error){

                                IntranetManager.trigger("core:error:action", error);

                            });

                    });

                    console.groupEnd();
                },


            }
        });

    return IntranetManager.NewsManager.Widgets.Show.Controller;
});

