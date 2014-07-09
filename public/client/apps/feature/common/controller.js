/*
 * Application: Feature Manager
 * Controller: Common Controller
 * Module: FeatureManager.Common
 * */


define([
    "app",
    "apps/feature/common/views",
    "common/views"
],
    function ( IntranetManager, CommonViews, GlobalViews ) {
        IntranetManager.module("FeatureManager.Common",
            function ( Common, FeatureManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

                    getHeaderView: function () {

                        console.log('<< getHeaderView : INIT >>');

                        var view = new CommonViews.HeaderView();

                        view.on('button:command:new', function () {
                            IntranetManager.trigger('feature:admin:feature:new');
                        });

                        return view;
                    },


                    getAppMenuView: function () {
                        return new CommonViews.AppMenuView();
                    },

                    setupAppLayout: function ( next ) {

                        console.group('<< FeatureManager: setupAppLayout >>');


                        var that = this;


                        if (FeatureManager.started === false || FeatureManager.started === undefined) {


                            FeatureManager.started = true;

                            console.log('<< setupAppLayout : Started >>');

                            IntranetManager.appLayout = new GlobalViews.AppLayoutView();

                            IntranetManager.appLayout.on('show', function () {

                                IntranetManager.layoutHeader.show(Common.Controller.getHeaderView());

                                IntranetManager.siteNavigationBar.show(Common.Controller.getAppMenuView());

                                IntranetManager.layoutSearch.show(new GlobalViews.SearchView());
                            });


                            IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            if (next) {
                                next();
                            }

                        } else {

                            if (next) {
                                next();
                            }

                        }

                        console.groupEnd();

                    },

                    listApps: function () {

                        var that = this;

                        require(["entities/app"],
                            function () {

                                var fetchingApps = IntranetManager.request("appmodel:entity:byfeature", NewsManager.feature.id);

                                $.when(fetchingApps).done(function ( apps ) {

                                    var listView = new AppCommonViews.AppItemListView({
                                        collection: apps
                                    });

                                    //show
                                    IntranetManager.layoutContent.show(listView);
                                    IntranetManager.layoutHeader.show(new CommonViews.HeaderView());
                                    IntranetManager.layoutSearch.show(new CommonViews.SearchView());


                                    //close out zones
                                    IntranetManager.layoutZone1.reset();
                                    IntranetManager.layoutZone2.reset();
                                });


                            });

                    }


                };


            });


        return IntranetManager.FeatureManager.Common.Controller;
    });

