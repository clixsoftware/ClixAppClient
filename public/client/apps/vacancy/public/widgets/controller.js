
define([
    "app",
    "apps/vacancy/public/widgets/views"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("VacancyManager.Public.Widgets.Show",
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

                    console.group('<< vacancy: Widgets: showRecentPosts>>');

                    require([
                        "entities/vacancy"
                    ], function(){

                        options.limit = 5;
                        options.sort = 'createdAt desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('vacancy:app:posts:find', options);

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
                        "entities/vacancy"
                    ], function(){

                        console.group('<< vacancy Manager: Widgets: showPopularPosts  ')
                        options.limit = 5;
                        options.sort = 'views desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('vacancy:app:posts:find', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone4.reset();
                            IntranetManager.layoutZone4.show(that.getPopularView(posts));

                        });

                    });

                }
            }
        });

    return IntranetManager.VacancyManager.Public.Widgets.Show.Controller;
});

