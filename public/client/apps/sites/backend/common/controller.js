define([
    "app",
    "apps/sites/backend/common/views",
    "common/views"
],
    function ( IntranetManager, CommonViews, GlobalViews ) {
        IntranetManager.module("SiteManager.Common",
            function ( Common, SiteManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getLayoutView: function () {

                        return new CommonViews.LayoutView();
                    },


                    setupAppLayout: function ( next ) {
                        var that
                            = this;

                        // if (HomeManager.started === false || HomeManager.started === undefined) {
                        console.log('<<Setup Home Page layout>>');
                        //console.log('Init site manager setup : ');


                        require(["entities/feature"],
                            function () {

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'sites');
                                fetchFeature.then(function ( feature ) {

                                    // console.log('an error occurred do we reach here');
                                    // alert(feature);
                                    if (!feature) {
                                        throw new Error('Feature HomePage is not installed');
                                    }

                                    SiteManager.feature = {
                                        id: feature.get('id')
                                    };

                                    SiteManager.started = true;

                                    IntranetManager.appLayout = Common.Controller.getLayoutView();

                                    IntranetManager.siteMainContent.reset();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                    //Call the next function, Setup app layout must be run before..
                                    if (next) {
                                        next();
                                    }
                                })
                                    .fail(function ( error ) {
                                        alert(error);
                                        console.log('Go to 404 page');
                                        /*//TODO: navigate to 404 pages*/
                                    });

                            }
                        );

                    },

                };


            });


        return IntranetManager.SiteManager.Common.Controller;
    });

