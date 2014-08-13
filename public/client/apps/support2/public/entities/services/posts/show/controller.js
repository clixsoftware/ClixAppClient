define([
    "../../../../../../../app",
    "apps/support/public/entities/services/show/views",
    "moment"
], function (IntranetManager, ShowViews) {

    IntranetManager.module("SupportManager.Public.Services.Show",
        function (Show, SupportManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getDetailsView: function (post) {
                    return new ShowViews.DetailsView({
                        model: post
                    });

                },

                showServiceForm: function (opts) {
                   //  alert('showProjectDetailsPage');
                    var that = this;

                    require(['../../../../../../../entities/applications', 'entities/services'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: SupportManager.feature.id
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

                                var fetchingPost = IntranetManager.request("support:service", opts.id);

                                return  fetchingPost.then(function (post) {
                                    var triggers = post.get('form_triggers');

                                    console.log(triggers);
                                    IntranetManager.trigger(triggers.create, post);

                                    //IntranetManager.layoutContent.reset();
                                    //IntranetManager.layoutContent.show(that.getDetailsView(post));

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

    return IntranetManager.SupportManager.Public.Services.Show.Controller;
});

