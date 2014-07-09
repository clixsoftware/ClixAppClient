

define([
    "app",
    "apps/search/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("SearchManager.Public.Common",
            function (Common, SearchManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {

                        var that = this;

                        console.log('<< initAppEngine:  (SearchManager)  >>');
                   /*     if (ProjectsManager.started === false || ProjectsManager.started === undefined) {*/

                        require(["entities/feature"],
                            function () {

                                //fetch feature
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'search');

                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('The feature SearchManager is not installed, or the API is down.');
                                    }

                                    SearchManager.feature = {
                                        id: feature.get('id')
                                    };

                                    SearchManager.started = true;

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
                                        console.log('!!! Error starting - SearchManager App ' + error);
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


        return IntranetManager.SearchManager.Public.Common.Controller;
    });

