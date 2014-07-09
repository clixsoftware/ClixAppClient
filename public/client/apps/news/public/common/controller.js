/*
 * Application: Site Manager
 * Controller: Common Controller
 * Module: SiteManager.Common
 * */


define([
    "app",
    "apps/news/public/common/views",
    "common/views"
],
    function (IntranetManager, CommonViews, GlobalViews) {
        IntranetManager.module("NewsManager.Common",
            function (Common, NewsManager, Backbone, Marionette, $, _) {

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

                        console.group('NewsManager: SetupAppLayout')


                        if (NewsManager.started === false || NewsManager.started === undefined) {

                            require(["entities/feature"],
                                function () {

                                    //fetch workspaces
                                    var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'news');
                                    fetchFeature.then(function (feature) {

                                        if (!feature) {
                                            throw new Error('Feature News is not installed');
                                        }


                                        NewsManager.feature = {
                                            id: feature.get('id')
                                        };

                                        NewsManager.started = true;

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

                            /*                            require(["entities/feature"],
                             function () {

                             //fetch workspaces
                             var fetchFeature = IntranetManager.request('feature:entity:search:code', 'newsmanager');

                             $.when(fetchFeature).done(function ( feature ) {

                             console.log('<< setupAppLayout: feature fetch completed >>');

                             if (feature) {

                             // console.log(JSON.stringify(feature));
                             NewsManager.feature = {
                             id: feature.at(0).get('_id')
                             };

                             console.info('<< Feature ID ' + NewsManager.feature.id);
                             // console.info('<< setupAppLayout: feature found >>');

                             NewsManager.started = true;

                             IntranetManager.appLayout = new GlobalViews.AppLayoutView();

                             IntranetManager.appLayout.on('show', function () {

                             IntranetManager.layoutHeader.show(Common.Controller.getHeaderView());

                             IntranetManager.layoutTopNavBar.show(Common.Controller.getAppMenuView());


                             });


                             IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                             //Call the next function, Setup app layout must be run before..
                             if (next != null) {
                             next();
                             }


                             } else {
                             console.error('Feature not found');
                             }

                             });

                             }
                             );*/


                        } else {

                            if (next) {
                                next();
                            }

                        }

                        console.groupEnd();
                    },

                    setupContentLayout: function (next) {

                        console.group('NewsManager: setupContentLayout');


                        var that = this;

                        /*          if (NewsManager.started === false || NewsManager.started === undefined) {*/

                        console.log('<< setupContentLayout: init (NewsManager.started === undefined)  >>');

                        require(["entities/feature"],
                            function () {

                                //fetch workspaces
                                var fetchFeature = IntranetManager.request('feature:entity:search:alias', 'news');
                                fetchFeature.then(function (feature) {

                                    if (!feature) {
                                        throw new Error('Feature News is not installed');
                                    }

                                    NewsManager.feature = {
                                        id: feature.get('id')
                                    };

                                    NewsManager.started = true;


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
                                        alert(error);
                                        console.log('Go to 404 page');
                                        /*//TODO: navigate to 404 pages*/
                                    });

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


                         NewsManager.feature = {
                         id: feature.at(0).get('id')
                         };

                         NewsManager.started = true;

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


        return IntranetManager.NewsManager.Common.Controller;
    });

