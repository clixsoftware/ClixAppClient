/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/classifieds/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("ClassifiedsManager.Public.Common",
            function (Common, ClassifiedsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getContent2ColLayoutView: function () {

                        console.info('<< getContent2ColLayoutView: Return Layout >>');

                        return new CommonViews.NewsLayoutView();

                    },

                    setupContentLayout: function (next) {

                        var that = this;

                        require(["entities/feature"],
                            function () {

                                console.group('ClassifiedsManager: Public : Common : setupContentLayout');

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'classifieds');
                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('Feature classifieds is not installed');
                                    }

                                    ClassifiedsManager.feature = {
                                        id: feature.get('id')
                                    };

                                    ClassifiedsManager.started = true;

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


        return IntranetManager.ClassifiedsManager.Public.Common.Controller;
    });

