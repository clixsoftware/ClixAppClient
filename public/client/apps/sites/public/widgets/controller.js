define([
    "app",
    "apps/sites/public/widgets/views",
    "moment"
], function (IntranetManager, WidgetsShow) {

    IntranetManager.module("SiteManager.Widgets.Show",
        function (Show, IntranetManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getRecentlyUpdatedView: function (posts) {
                    //alert('getting the view');
                    return new WidgetsShow.HowDoIRecentView({
                        collection: posts
                    });

                },

                getBreadcrumbView: function () {

                    return new WidgetsShow.BreadcrumbView();

                },

                getHowDoIMostActiveView: function (posts) {
                    //alert('getting the view');
                    return new WidgetsShow.HowDoIMostActiveView({
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

                    console.log('<< INIT: displayHomeNewsPosts >>');

                    var that = this;

                    require([
                        "entities/news_post"
                    ], function () {

                        var options = {
                            alias: alias,
                            feature_alias: 'sites'
                        };

                        var fetchingPosts = IntranetManager.request('news:posts:feature:alias', options);

                        console.log('<< displayHomeNewsPosts: Fetching Postings  >>');

                        fetchingPosts.then(function (posts) {
                            IntranetManager.layoutZone2.reset();
                            IntranetManager.layoutZone2.show(that.getHomeNewsPosts(posts));

                        })
                            .fail(function (error) {
                                alert(error);
                            });

                    });
                },

                getHomeEventsView: function (events) {
                    return new WidgetsShow.HomeEventsPostsView({
                        collection: events
                    })
                },

                displayHomeEventsPosts: function (alias) {

                    console.log('<< INIT: displayHomeEventsPosts >>');

                    var that = this;

                    require([
                        "entities/calendar"
                    ], function () {

                        var options = {
                            alias: alias,
                            feature_alias: 'sites'
                        };

                        var fetchingPosts = IntranetManager.request('calendar:events:feature:alias', options);

                        console.log('<< displayHomeEventsPosts: Fetching Postings  >>');

                        fetchingPosts.then(function (posts) {
                            IntranetManager.layoutZone6.reset();
                            IntranetManager.layoutZone6.show(that.getHomeEventsView(posts));

                        })
                            .fail(function (error) {
                                alert(error);
                            });

                    });
                },

                getFeaturedPostsView: function (posts) {
                    return new WidgetsShow.FeaturedPostsView({
                        collection: posts
                    });
                },

                displayFeaturedPosts: function (alias) {
                    console.log('<< INIT: displayFeaturedPosts >>');

                    var that = this;
                    require([
                        "entities/news_post"
                    ], function () {

                        var options = {
                            alias: alias,
                            feature_alias: 'sites'
                        };

                        var fetchingPosts = IntranetManager.request('news:posts:featured', options);

                        console.log('<< displayFeaturedPosts: Fetching Postings  >>');

                        fetchingPosts.then(function (posts) {
                            IntranetManager.layoutZone1.reset();
                            IntranetManager.layoutZone1.show(that.getFeaturedPostsView(posts));

                        })
                            .fail(function (error) {
                                alert(error);
                            });

                    });
                },

                displayRecentlyUpdated: function (alias) {


                    IntranetManager.layoutZone4.reset();
                    IntranetManager.layoutZone4.show(this.getRecentlyUpdatedView());
                },

                displayHowDoIMostActive: function (alias) {

                    console.group('<< SitesManager: Widgets: HowDoI: displayHowDoIMostActive >>');

                    var options = {
                        parent_application_alias: alias,
                        parent_application_feature: 'sites'
                    };


                    var that = this;

                    require([
                        "entities/howdoi"
                    ], function () {

                        var fetchingPost = IntranetManager.request('howdoi:posts:mostactive');

                        fetchingPost.then(function (posts) {

                            // alert('posts found');
                            // console.log(posts);
                            var view = that.getHowDoIMostActiveView(posts);
                            // console.log(view);

                            IntranetManager.layoutZone3.reset();
                            IntranetManager.layoutZone3.show(view);
                            console.groupEnd();
                        });


                    });


                },

                displayHowDoIRecent: function (alias) {

                    console.group('<< SitesManager: Widgets: HowDoI: displayHowDoIRecent >>');

                    var options = {
                        parent_application_alias: alias,
                        parent_application_feature: 'sites'
                    };


                    var that = this;

                    require([
                        "entities/howdoi"
                    ], function () {

                        var fetchingPost = IntranetManager.request('howdoi:posts:recent');

                        fetchingPost.then(function (posts) {

                            // alert('posts found');
                            // console.log(posts);
                            var view = that.getRecentlyUpdatedView(posts);
                            // console.log(view);

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

