/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: HospitalManager.Common
 * */


define([
        "app",
        "apps/hmis/public/common/views",
        "common/views"
    ],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("HospitalManager.Public.Common",
            function (Common, HospitalManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {

                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {
                        var that = this;

                        require(["entities/feature"],
                            function () {

                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'hmis');
                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('Feature HospitalManager is not installed');
                                    }

                                    HospitalManager.feature = {
                                        id: feature.get('id')
                                    };

                                    HospitalManager.started = true;
                                    var layout = Common.Controller.getLayoutView();


                                    IntranetManager.appLayout = layout;//Common.Controller.getLayoutView();

                                    IntranetManager.siteMainContent.reset();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);
                                    IntranetManager.trigger('hmis:show:menu');

                                    //Call the next function, Setup app layout must be run before..
                                    if (next) {
                                        next();
                                    }
                                })
                                    .fail(function (error) {
                                        alert(error);
                                        console.log('Go to 404 page');
                                        /*//TODO: navigate to 404 pages*/
                                    });

                            }
                        );

                    },

                    getAppHomeView: function () {

                        return new CommonViews.AppHomeView();
                    },

                    displayOverviewPage: function (alias) {
                        // alert('showing a public news post' + opts.slug);
                        var that = this;

                        require(['entities/applications'], function () {


                            var options = {
                                alias: alias,
                                parent_feature: HospitalManager.feature.id
                            };

                            console.log('@@ Fetching Current Applicaiton using = ' + options);

                            var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                            fetchingApp.then(function (app) {

                                console.log(app);

                                IntranetManager.trigger('dom:title', app.get('title'));
                                alert('loading the components for the home overview page');

                                /*                                IntranetManager.layoutContent.reset();
                                 IntranetManager.layoutContent.show(that.getPublicView(post));*/

                                return app;

                            }).fail(function (err) {
                                console.log('an error occurred ' + err);
                            });


                        });

                    }
                };


            });


        return IntranetManager.HospitalManager.Public.Common.Controller;
    });

