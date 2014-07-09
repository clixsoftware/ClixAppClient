define([
    "app",
    "apps/directory/public/common/views",
    "common/views"
],
    function ( IntranetManager, CommonViews, GlobalViews ) {
        IntranetManager.module("DirectoryManager.Public.Common",
            function ( Common, DirectoryManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getLayoutView: function () {
                        return new CommonViews.LayoutView();
                    },

                    initAppEngine: function ( next ) {

                        console.log('<< initAppEngine:  (DirectoryManager)  >>');

                        var that = this;

                        require(["entities/feature"],
                            function () {

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'directory');

                                fetchFeature.then(function ( feature ) {

                                    if (!feature) {
                                        throw new Error('The feature DirectoryManager is not installed, or the API is down.');
                                    }


                                    DirectoryManager.feature = {
                                        id: feature.get('id')
                                    };

                                    DirectoryManager.started = true;

                                 //   IntranetManager.appLayout = Common.Controller.getLayoutView();

                                 //   IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    //Call the next function, Setup app layout must be run before..
                                    if (next) {
                                        next();
                                    }

                                }).fail(function ( error ) {
                                        console.log('!!! Error starting - DirectoryManager Application ' + error);
                                    });

                            }
                        );

                    }
                };


            });


        return IntranetManager.DirectoryManager.Public.Common.Controller;
    });

