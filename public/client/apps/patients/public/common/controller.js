/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/patients/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("PatientManager.Public.Common",
            function (Common, PatientManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getAppLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new CommonViews.AppLayoutView();

                    },

                    initAppEngine: function (next) {
                        var that = this;

                        console.group('PatientManager: initAppEngine');


                        if (PatientManager.started === false || PatientManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'patients');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('Feature Patients is not installed');
                                        }


                                        PatientManager.feature = {
                                            id: feature.get('id')
                                        };

                                        PatientManager.started = true;

                                        IntranetManager.appLayout = Common.Controller.getAppLayoutView();

                                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);
                                        IntranetManager.trigger('hmis:show:menu');

                                        if (next) {
                                            next();
                                        }

                                    }).fail(function (error) {
                                            alert(error);
                                            console.log('Go to 404 page');
                                            /*//TODO: navigate to 404 pages*/
                                        });


                                }
                            );


                        } else {

                            if (next) {
                                next();
                            }

                        }

                        console.groupEnd();
                    }


                };


            });


        return IntranetManager.PatientManager.Public.Common.Controller;
    });

