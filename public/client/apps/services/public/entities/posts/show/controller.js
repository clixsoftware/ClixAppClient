define([
    "app",
    "apps/services/public/entities/posts/show/views",
    "moment"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("ServicesManager.Public.Posts.Show",
        function (Show, ServicesManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDetailsView: function (post) {
                    return new ShowViews.DetailsView({
                        model: post
                    });

                },

                showDetailsPage: function (opts) {
                   //  alert('showProjectDetailsPage');
                    var that = this;

                    require(['entities/applications', 'entities/services'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: ServicesManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {
                            console.log(app);

                            //IntranetManager.appLayout = Show.Controller.getPostLayoutView();

                            // IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            //  IntranetManager.trigger('home:news:posts', alias);
                            //IntranetManager.trigger('dom:title', app.get('title'));
                            return app;

                        }).then(function (app) {

                                var fetchingPost = IntranetManager.request("services:service", opts.id);

                                return    fetchingPost.then(function (post) {
                                    console.log(post);

                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getDetailsView(post));

                                    IntranetManager.trigger('dom:title', post.get('title'));

                                    return post;

                                });

                            }).then(function (post) {
                                // alert('post fetched and returned');


                            }).fail(function (err) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },



            }
        });

    return IntranetManager.ServicesManager.Public.Posts.Show.Controller;
});

