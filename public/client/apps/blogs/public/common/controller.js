/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/blogs/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("BlogsManager.Public.Common",
            function (Common, BlogsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getContent2ColLayoutView: function () {

                        console.info('<< getContent2ColLayoutView: Return Layout >>');

                        return new CommonViews.NewsLayoutView();

                    },

                    setupContentLayout: function (next) {

                        var that = this;

                        require(["entities/feature"],
                            function () {

                                console.group('BlogsManager: Public : Common : setupContentLayout');

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'blogs');
                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('Feature blogs is not installed');
                                    }

                                    BlogsManager.feature = {
                                        id: feature.get('id')
                                    };

                                    BlogsManager.started = true;

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


        return IntranetManager.BlogsManager.Public.Common.Controller;
    });

