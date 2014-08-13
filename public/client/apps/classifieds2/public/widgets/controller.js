define([
    "app",
    "apps/classifieds/public/widgets/views"
], function (IntranetManager, WidgetViews) {

    IntranetManager.module("ClassifiedsManager.Widgets.Show",
        function (Show, IntranetManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getActionMenuView: function(){
                    return new WidgetViews.ActionMenuView();
                },

                displayActionMenu: function(){
                    var that= this;

                    IntranetManager.layoutZone1.reset();
                    IntranetManager.layoutZone1.show(that.getActionMenuView());
                },


                getRecentPostsView: function(posts){
                    return new WidgetViews.RecentsPostsView({
                        collection: posts
                    });
                },

                displayRecentPosts: function(options){
                    var that = this;

                    console.log('<< Classifieds Manager: Widgets: showRecentPosts >>');

                    require([
                        "entities/classifieds"
                    ], function(){

                        var fetchingPosts = IntranetManager.request('classifieds:posts:recent', options);

                        fetchingPosts.then(function(posts){

                            console.log(posts);

                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(that.getRecentPostsView(posts));
                        })
                            .fail(function(error){

                                IntranetManager.trigger("core:error:action", error);

                            });

                    });

                    console.groupEnd();
                }

            }
        });

    return IntranetManager.ClassifiedsManager.Widgets.Show.Controller;
});

