

define([
    "app",
    "apps/projects/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("ProjectsManager.Public.Common",
            function (Common, ProjectsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {

                        var that = this;

                        console.log('<< initAppEngine:  (ProjectsManager)  >>');
                   /*     if (ProjectsManager.started === false || ProjectsManager.started === undefined) {*/

                        require(["entities/feature"],
                            function () {

                                //fetch feature
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'projects');

                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('The feature Project Manager is not installed, or the API is down.');
                                    }

                                    ProjectsManager.feature = {
                                        id: feature.get('id')
                                    };

                                    ProjectsManager.started = true;

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
                                        console.log('!!! Error starting - Project Manager App ' + error);
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


        return IntranetManager.ProjectsManager.Public.Common.Controller;
    });

