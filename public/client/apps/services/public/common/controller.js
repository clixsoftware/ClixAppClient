

define([
    "app",
    "apps/services/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("ServicesManager.Public.Common",
            function (Common, ServicesManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {

                        var that = this;

                        console.log('<< initAppEngine:  (ServicesManager)  >>');
                   /*     if (ServicesManager.started === false || ServicesManager.started === undefined) {*/

                        require(["entities/feature"],
                            function () {

                                //fetch feature
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'services');

                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('The feature Services Manager is not installed, or the API is down.');
                                    }

                                    ServicesManager.feature = {
                                        id: feature.get('id')
                                    };

                                    ServicesManager.started = true;

                                    IntranetManager.appLayout =  Common.Controller.getLayoutView();

                                   // IntranetManager.siteMainContent.reset();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    //console.log(Common.Controller.getLayoutView());

                                    //Call the next function, Setup app layout must be run before..

                                    if (next) {
                                       //alert('doing next');
                                        next();
                                    }

                                })
                                    .fail(function (error) {
                                        console.log('!!! Error starting - Services Manager App ' + error);
                                    });

                            }
                        );
/*                        } else {

                            if (next) {
                                next();
                            }

                        }*/
                    }
                };


            });


        return IntranetManager.ServicesManager.Public.Common.Controller;
    });

