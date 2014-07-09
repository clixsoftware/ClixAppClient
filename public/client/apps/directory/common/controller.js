/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/directory/common/views",
    "common/views"
],
    function ( IntranetManager, CommonViews, GlobalViews ) {
        IntranetManager.module("DirectoryManager.Common",
            function ( Common, DirectoryManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getPublicLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new CommonViews.PublicLayoutView();

                    },

                    getAppLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new CommonViews.AppLayoutView();

                       },

                    getHeaderView: function () {

                        //setup the header view
                        var view = new CommonViews.HeaderView();

                        view.on('button:command:new', function () {
                            //IntranetManager.trigger('app:feature:new:form');
                        });

                        return view;
                    },

                    getAppMenuView: function () {
                        return new CommonViews.AppMenuView();
                    },

                    setupAppLayout: function (next) {
                        var that = this;

                        console.group('DirectoryManager: SetupAppLayout')


                        if (DirectoryManager.started === false || DirectoryManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'directory');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('Feature Directory Manager is not installed');
                                        }


                                        DirectoryManager.feature = {
                                            id: feature.get('id')
                                        };

                                        DirectoryManager.started = true;

                                        DirectoryManager.appLayout = Common.Controller.getAppLayoutView();

                                        DirectoryManager.siteMainContent.show(IntranetManager.appLayout);

                                        //Call the next function, Setup app layout must be run before..
                                        if (next) {
                                            next();
                                        }
                                    }).fail(function (error) {
                                            alert(error);
                                            console.log('Go to 404 page');
                                            /*//TODO: navigate to 404 pages*/
                                        });
                                    ;

                                }
                            );


                        } else {

                            if (next) {
                                next();
                            }

                        }

                        console.groupEnd();
                    },

                    setupContentLayout: function ( next ) {

                        console.group('DirectoryManager: setupContentLayout');

                        console.log('started ' + DirectoryManager.started);

                        var that = this;

                     //   if (DirectoryManager.started === false || DirectoryManager.feature === undefined) {

                            require(["entities/directory"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('directory:feature');

                                    fetchFeature.then(function(feature){

                                        if (!feature) {
                                            throw new Error('Feature Directory Pages is not installed');
                                        }


                                        DirectoryManager.feature = {
                                            id: feature.get('id')
                                        };

                                        DirectoryManager.started = true;

                                        IntranetManager.appLayout = Common.Controller.getPublicLayoutView();

                                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                        //Call the next function, Setup app layout must be run before..
                                        if (next) {
                                            next();
                                        }

                                    }).fail(function(error){
                                            alert(error);
                                        });

                                }
                            );

                        //} else {

                           // console.log('Skipped news manager setup');
                          // if (next) {
                           //    next();
                         //   }

                       // }

                    }
                };


            });


        return IntranetManager.DirectoryManager.Common.Controller;
    });

