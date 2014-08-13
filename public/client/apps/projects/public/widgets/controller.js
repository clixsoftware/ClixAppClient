
define([
    "app",
    "apps/projects/public/widgets/views"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("ProjectManager.Public.Widgets.Show",
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

                    console.group('<< projects: Widgets: showRecentPosts>>');

                    require([
                        "entities/projects"
                    ], function(){

                        options.limit = 5;
                        options.sort = 'createdAt desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('projects:app:posts:find', options);

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
                        "entities/projects"
                    ], function(){

                        console.group('<< projects Manager: Widgets: showPopularPosts  ')
                        options.limit = 5;
                        options.sort = 'views desc';

                        console.info(options);
                        console.groupEnd();

                        var fetchingPosts = IntranetManager.request('projects:app:posts:find', options);

                        fetchingPosts.then(function(posts){

                            IntranetManager.layoutZone4.reset();
                            IntranetManager.layoutZone4.show(that.getPopularView(posts));

                        });

                    });

                }
            }
        });

    return IntranetManager.ProjectManager.Public.Widgets.Show.Controller;
});

