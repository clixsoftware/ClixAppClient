

define([
    "app",
    "apps/calendar/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("CalendarManager.Public.Common",
            function (Common, CalendarManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {

                        var that = this;

                        console.log('<< initAppEngine:  (CalendarManager)  >>');
                   /*     if (ProjectsManager.started === false || ProjectsManager.started === undefined) {*/

                        require(["entities/feature"],
                            function () {

                                //fetch feature
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'calendar');

                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('The feature PCalendarManager is not installed, or the API is down.');
                                    }

                                    CalendarManager.feature = {
                                        id: feature.get('id')
                                    };

                                    CalendarManager.started = true;

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
                                        console.log('!!! Error starting - CalendarManager App ' + error);
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


        return IntranetManager.CalendarManager.Public.Common.Controller;
    });

