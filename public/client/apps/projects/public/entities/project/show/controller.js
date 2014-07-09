define([
    "app",
    "apps/projects/public/entities/project/show/views",
    "moment"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("ProjectsManager.Public.Projects.Show",
        function (Show, ProjectsManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDetailsView: function (post) {
                    return new ShowViews.DetailsView({
                        model: post
                    });

                },

                showProjectDetailsPage: function (opts) {
                    alert('showProjectDetailsPage');
                    var that = this;

                    require(['entities/applications', 'entities/projects'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: ProjectsManager.feature.id
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

                                var fetchingPost = IntranetManager.request("projects:project", opts.id);

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

    return IntranetManager.ProjectsManager.Public.Projects.Show.Controller;
});

