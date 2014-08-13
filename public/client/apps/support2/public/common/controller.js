

define([
    "app",
    "apps/support/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("SupportManager.Public.Common",
            function (Common, SupportManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {

                        var that = this;

                        console.log('<< initAppEngine:  (SupportManager)  >>');
                   /*     if (ProjectsManager.started === false || ProjectsManager.started === undefined) {*/

                        require(["entities/feature"],
                            function () {

                                //fetch feature
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'support');

                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('The feature SupportManager is not installed, or the API is down.');
                                    }

                                    SupportManager.feature = {
                                        id: feature.get('id')
                                    };

                                    SupportManager.started = true;

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
                                        console.log('!!! Error starting - SupportManager App ' + error);
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


        return IntranetManager.SupportManager.Public.Common.Controller;
    });

