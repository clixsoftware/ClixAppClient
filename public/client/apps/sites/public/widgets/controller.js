define([
    "app",
    "apps/sites/public/widgets/views",
    "moment"
], function (IntranetManager, WidgetsShow) {

    IntranetManager.module("SiteManager.Widgets.Show",
        function (Show, IntranetManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getRecentlyUpdatedView: function (posts) {

                    return new WidgetsShow.RecentlyUpdatedView({
                        collection: posts
                    });

                },

                getBreadcrumbView: function () {

                    return new WidgetsShow.BreadcrumbView();

                },

                getPopularContentView: function (posts) {
                    //alert('getting the view');
                    return new WidgetsShow.PopularContentView({
                        collection: posts
                    });

                },

                getAdPostsView: function () {

                    return new WidgetsShow.AdPostView();

                },

                getCalendarPostsView: function () {
                    return new WidgetsShow.CalendarPostsView();

                },


                getHomeNewsPosts: function (posts) {
                    return new WidgetsShow.HomeNewsPostsView({
                        collection: posts
                    });
                },

                displayHomeNewsPosts: function (alias) {

                    console.group('displayHomeNewsPosts -->>');

                    var that = this;

                    require([
                        "entities/news"
                    ], function () {

                        var options = {
                            alias: alias,
                            feature_alias: 'sites'
                        };

                        var fetchingPosts = IntranetManager.request('news:posts:feature:alias', options);

                        fetchingPosts.then(function (posts) {
                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getHomeNewsPosts(posts));
                            console.groupEnd();

                        })
                            .fail(function (error) {
                                alert(error);
                            });

                    });
                },

                getEventsView: function (events) {
                    return new WidgetsShow.getEventsView({
                        collection: events
                    })
                },



                getFeaturedPostsView: function (posts) {
                    return new WidgetsShow.FeaturedPostsView({
                        collection: posts
                    });
                },

                displayUpcomingEvents: function (alias) {

                    console.log('<< INIT: displayUpcomingEvents >>');

                    var that = this;

                    require([
                        "entities/calendar"
                    ], function () {

                        var options = {
                            alias: alias,
                            feature_alias: 'sites'
                        };

                        var fetchingPosts = IntranetManager.request('calendar:apps:posts:upcoming', options);

                        fetchingPosts.then(function (posts) {
                            IntranetManager.layoutZone6.reset();
                            IntranetManager.layoutZone6.show(that.getEventsView(posts));

                        })
                            .fail(function (error) {
                                alert(error);
                            });

                    });
                },

                displayFeaturedPosts: function (alias) {

                    console.group('displayFeaturedPosts ->>');

                    var that = this;
                    require([
                        "entities/news"
                    ], function () {

                        var options = {
                            alias: alias
                        };

                        var fetchingPosts = IntranetManager.request('news:apps:posts:featured', options);

                        fetchingPosts.then(function (posts) {

                           // console.log(posts);

                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getFeaturedPostsView(posts));
                            console.groupEnd();
                        })
                            .fail(function (error) {
                                IntranetManager.trigger('core:error:action', error)
                                //alert(error);
                            });

                    });


                },

                displayPopularContentWidget: function (options) {

                    console.group('displayPopularContentWidget >>');

/*
                     options.parent_application_alias =  alias;
                     options.parent_application_feature =  'sites';
*/

                    console.log(options);

                    var that = this;

                    require([
                        "entities/content"
                    ], function () {

                        var fetchingPost = IntranetManager.request('content:posts:popular', {limit: 7});

                        fetchingPost.then(function (posts) {

                            // alert('posts found');
                            // console.log(posts);
                            var view = that.getPopularContentView(posts);
                            // console.log(view);

                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(view);
                            console.groupEnd();
                        });


                    });


                },

                displayRecentContent: function (alias) {

                    console.group('SitesManager: Widgets: displayRecentContent >>');

                    var that = this;

                    require([
                        "entities/content"
                    ], function () {

                        var fetchingPost = IntranetManager.request('content:posts:recent', {limit: 7});

                        fetchingPost.then(function (posts) {
                            var view = that.getRecentlyUpdatedView(posts);

                            IntranetManager.layoutZone4.reset();
                            IntranetManager.layoutZone4.show(view);
                            console.groupEnd();
                        });


                    });


                },

                displayBreadcrumb: function () {

                    IntranetManager.layoutTopNavBar.reset();
                    IntranetManager.layoutTopNavBar.show(this.getBreadcrumbView());

                }



            }
        });

    return IntranetManager.SiteManager.Widgets.Show.Controller;
});

