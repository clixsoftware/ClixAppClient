
define([
    "app",
    "apps/calendar/public/widgets/views"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("CalendarManager.Public.Widgets.Show",
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

                    console.group('<< calendar: Widgets: showRecentPosts>>');

                    require([
                        "entities/calendar"
                    ], function(){

                        options.limit = 5;
                        options.sort = 'createdAt desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('calendar:app:posts:find', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone5.reset();
                            IntranetManager.layoutZone5.show(that.getRecentView(posts));
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
                        "entities/calendar"
                    ], function(){

                        console.group('<< calendar Manager: Widgets: showPopularPosts  ')
                        options.limit = 5;
                        options.sort = 'views desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('calendar:app:posts:find', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone4.reset();
                            IntranetManager.layoutZone4.show(that.getPopularView(posts));

                        });

                    });

                }
            }
        });

    return IntranetManager.CalendarManager.Public.Widgets.Show.Controller;
});

