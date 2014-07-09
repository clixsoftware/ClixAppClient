
define([
    "app",
    "apps/blogs/public/widgets/views",
    "moment"
], function ( IntranetManager, WidgetsShow) {

    IntranetManager.module("BlogsManager.Public.Widgets.Show",
        function ( Show,
                   IntranetManager,
                   Backbone,
                   Marionette,
                   $, _ ) {

            Show.Controller = {


                getUserProfileView: function(profile){
                    return new WidgetsShow.UserProfileView({
                        model: profile
                    })

                },

                showUserProfile: function(profileId){

                    var that = this;

                    require([
                        "entities/profiles"
                    ], function(){

                        var fetchingProfile = IntranetManager.request('profiles:entity:user', profileId);

                        fetchingProfile.then(function(profile){


                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getUserProfileView(profile));

                        }).fail(function(err){
                            console.log('showRecentPosts: Error occurred  ' + err);
                        })
                    });
                },

                getRecentPostsView: function(categories){
                    return new WidgetsShow.ListView({
                        collection: categories
                    })

                },

                showRecentPosts: function(options){
                    var that = this;


                    require([
                        "entities/blogs"
                    ], function(){

                        var fetchingPosts = IntranetManager.request('blogs:posts:recent', options);

                        fetchingPosts.then(function(posts){


                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getRecentPostsView(posts));

                        }).fail(function(err){
                            console.log('showRecentPosts: Error occurred  ' + err);
                        })
                    });
                }

            }
        });

    return IntranetManager.BlogsManager.Public.Widgets.Show.Controller;
});

