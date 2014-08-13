

define([
    "app",
    "apps/blogs/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("BlogsManager.Public.Common",
            function (Common, BlogsManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function (next) {

                        var that = this;

                        console.log('<< initAppEngine:  (BlogsManager)  >>');

                        require(["entities/feature"],
                            function () {

                                //fetch feature
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'blogs');

                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('The feature Project Manager is not installed, or the API is down.');
                                    }

                                    BlogsManager.feature = {
                                        id: feature.get('id')
                                    };

                                    BlogsManager.started = true;

                                    IntranetManager.appLayout =  Common.Controller.getLayoutView();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    console.log(Common.Controller.getLayoutView());

                                    //Call the next function, Setup app layout must be run before..

                                    if (next) {
                                        next();
                                    }

                                })
                                    .fail(function (error) {
                                        console.log('!!! Error starting - Project Manager App ' + error);
                                    });

                            }
                        );

                    }
                };


            });


        return IntranetManager.BlogsManager.Public.Common.Controller;
    });

