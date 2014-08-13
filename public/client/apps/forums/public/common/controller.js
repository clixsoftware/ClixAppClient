/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/forums/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("ForumsManager.Public.Common",
            function (Common, ForumsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getContent2ColLayoutView: function () {

                        console.info('<< getContent2ColLayoutView: Return Layout >>');

                        return new CommonViews.NewsLayoutView();

                    },

                    setupContentLayout: function (next) {

                        var that = this;

                        require(["entities/feature"],
                            function () {

                                console.group('ForumsManager: Public : Common : setupContentLayout');

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'forums');
                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('Feature forums is not installed');
                                    }

                                    ForumsManager.feature = {
                                        id: feature.get('id')
                                    };

                                    ForumsManager.started = true;

                                    console.log('About to ContentLayout Layout');

                                    IntranetManager.appLayout = Common.Controller.getContent2ColLayoutView();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    console.groupEnd();

                                    //Call the next function, Setup app layout must be run before..
                                    if (next) {

                                        console.info('Executing next() in setupContentLayout ');
                                        next();
                                    }



                                })
                                    .fail(function (error) {
                                        IntranetManager.trigger('core:error:action', error);
                                    });

                            }
                        );



                    }
                };


            });


        return IntranetManager.ForumsManager.Public.Common.Controller;
    });

