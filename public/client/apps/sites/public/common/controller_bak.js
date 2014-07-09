/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/home/common/views",
    "common/views",
    "Q"
],
    function ( IntranetManager, CommonViews, GlobalViews ) {
        IntranetManager.module("HomeManager.Common",
            function ( Common, HomeManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getLayoutView: function () {

                        return new CommonViews.LayoutView();
                    },

                    setupAppLayout: function ( next ) {
                        var that = this;


                        if (HomeManager.started === false || HomeManager.started === undefined) {
                            console.log('<<Setup Home Page layout>>');

                            require(["entities/home"],
                                function () {

                                    var fetchFeature = IntranetManager.request('home:get:default');

                                    fetchFeature.then(function ( data ) {
                                        //console.log(data);

                                        HomeManager.started = true;

                                        IntranetManager.appLayout = Common.Controller.getLayoutView();

                                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                        IntranetManager.trigger('dom:title', data.get('title'));

                                        IntranetManager.currentApplication = data;

                                        //Call the next function, Setup app layout must be run before..
                                        if (next) {
                                            next();
                                        }


                                    }).fail(function ( err ) {

                                            console.log('error occurred fetching home ' + err);
                                        });
                                    /*                                    //fetch workspaces
                                     var fetchFeature = IntranetManager.request('home:get:feature');

                                     $.when(fetchFeature).done(function ( feature ) {

                                     console.log('fetching feature completed');

                                     if (feature) {

                                     HomeManager.feature = {
                                     id: feature.get('_id')
                                     };


                                     HomeManager.started = true;

                                     IntranetManager.appLayout = Common.Controller.getLayoutView();

                                     IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                     //Call the next function, Setup app layout must be run before..
                                     if (next) {
                                     next();
                                     }


                                     }

                                     });*/

                                }
                            );


                        } else {

                            if (next) {
                                next();
                            }

                        }
                    }
                };


            });


        return IntranetManager.HomeManager.Common.Controller;
    });

