define([
        "app",
        "apps/classifieds/public/common/views",
        "common/views"
    ],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("ClassifiedsManager.Public.Common",
            function (Common, ClassifiedsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getAppLayoutView: function () {
                        return new CommonViews.AppLayoutView();
                    },

                    initAppEngine: function (next) {
                        var that = this;
                        console.group('ClassifiedsManager: initAppEngine');

                        if (ClassifiedsManager.started === false || ClassifiedsManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'classifieds');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('Feature Classifieds  is not installed');
                                        }
                                        ClassifiedsManager.feature = {
                                            id: feature.get('id')
                                        };
                                        ClassifiedsManager.started = true;

                                        IntranetManager.appLayout = Common.Controller.getAppLayoutView();
                                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

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
                                console.log('Executing next()');
                                next();
                            }

                        }
                        console.groupEnd();
                    }
                };
            });

        return IntranetManager.ClassifiedsManager.Public.Common.Controller;
    });

