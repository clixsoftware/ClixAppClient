/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "../../../../app",
    "apps/yp/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("YPManager.Common",
            function (Common, YPManager, Backbone, Marionette, $, _) {

                Common.Controller = {

                    getAppLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new CommonViews.AppLayoutView();

                    },

                    getContent2ColLayoutView: function () {

                        console.log('<< getContent2ColLayoutView: Return Layout >>');

                        return new CommonViews.NewsLayoutView();

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

                        console.group('YPManager: SetupAppLayout')


                        if (YPManager.started === false || YPManager.started === undefined) {

                            require(["../../../../entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'how-do-i');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('Feature Yellow Pages is not installed');
                                        }


                                        YPManager.feature = {
                                            id: feature.get('id')
                                        };

                                        YPManager.started = true;

                                        IntranetManager.appLayout = Common.Controller.getAppLayoutView();

                                        IntranetManager.siteMainContent.show(IntranetManager.appLayout);

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

                    setupContentLayout: function (next) {

                        console.group('YPManager: setupContentLayout');


                        var that = this;

                        /*          if (YPManager.started === false || YPManager.started === undefined) {*/

                        console.log('<< setupContentLayout: init (YPManager.started === undefined)  >>');

                        require(["../../../../entities/feature"],
                            function () {

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'how-do-i');
                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('Feature News is not installed');
                                    }

                                    YPManager.feature = {
                                        id: feature.get('id')
                                    };

                                    YPManager.started = true;


                                    //Call the next function, Setup app layout must be run before..
                                    if (next) {

                                        console.log('Calling the next() in setupContentLayout ');
                                        next();
                                    }

                                    console.log('About to Show Layout');

                                    IntranetManager.appLayout = Common.Controller.getContent2ColLayoutView();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);


                                })
                                    .fail(function (error) {
                                     //   alert(error);
                                        console.log(error);
                                        /*//TODO: navigate to 404 pages*/
                                    });
                                ;
                                ;

                            }
                        );

                        /*                            require(["entities/feature"],
                         function () {

                         //fetch workspaces
                         var fetchFeature = IntranetManager.request('feature:entity:search:code', 'newsmanager');

                         $.when(fetchFeature).done(function ( feature ) {

                         console.log('<< setupContentLayout: Feature fetch completed  >>');


                         if (feature) {

                         console.log('<< setupContentLayout: Feature Record Found >> '+  feature.at(0).get('id'));


                         YPManager.feature = {
                         id: feature.at(0).get('id')
                         };

                         YPManager.started = true;

                         IntranetManager.appLayout = Common.Controller.getContent2ColLayoutView();


                         var trendOptions = {
                         reach: 'global',
                         limit: 5
                         };

                         IntranetManager.trigger('news:public:posts:trending', trendOptions );


                         console.log('<< setupContentLayout: Show Layout >>');

                         IntranetManager.siteMainContent.show(IntranetManager.appLayout);


                         if (next != null) {
                         next();
                         }


                         }

                         });

                         }
                         );*/

                        /*                        } else {

                         // console.log('Skipped news manager setup');
                         if (next) {
                         next();
                         }

                         }*/

                    }
                };


            });


        return IntranetManager.YPManager.Common.Controller;
    });

