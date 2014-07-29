/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/vacancy/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("VacancyManager.Common",
            function (Common, VacancyManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getAppLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new CommonViews.AppLayoutView();

                    },

                    initAppEngine: function (next) {
                        var that = this;
                        console.group('VacancyManager: initAppEngine');


                        if (VacancyManager.started === false || VacancyManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'vacancies');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('VacancyManager  is not installed');
                                        }
                                        VacancyManager.feature = {
                                            id: feature.get('id')
                                        };
                                        VacancyManager.started = true;

                                       // IntranetManager.appLayout = Common.Controller.getAppLayoutView();

                                      //  IntranetManager.siteMainContent.reset();
                                       // IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                        if (next) {
                                            next();
                                        }

                                    }).fail(function (error) {

                                        IntranetManager.trigger('core:error:action', error);

                                    });


                                }
                            );
                        } else {

                            if (next) {
                                console.log('Executing next()');
                                next();
                            }

                        }
                        console.groupEnd();
                    }

              };


            });


        return IntranetManager.VacancyManager.Common.Controller;
    });

