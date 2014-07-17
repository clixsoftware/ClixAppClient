define([
        "app",
        "apps/classifieds/public/common/views",
        "common/views"
    ],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("PatientsManager.Public.Common",
            function (Common, PatientsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getAppLayoutView: function () {
                        return new CommonViews.AppLayoutView();
                    },

                    initAppEngine: function (next) {
                        var that = this;

                        console.group('PatientsManager: initAppEngine');


                        if (PatientsManager.started === false || PatientsManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'classifieds');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('Feature Classifieds is not installed');
                                        }

                                        PatientsManager.feature = {
                                            id: feature.get('id')
                                        };

                                        PatientsManager.started = true;

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


        return IntranetManager.PatientsManager.Public.Common.Controller;
    });

