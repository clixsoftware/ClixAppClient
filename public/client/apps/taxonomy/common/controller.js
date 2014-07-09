/*
 * Application: Application Manager
 * Controller: Common Controller
 * Module: WorkspaceManager.Common
 * */


define([
    "app",
    "apps/taxonomy/common/views",
    "common/views"
],
    function ( IntranetManager, CommonViews, GlobalViews ) {
        IntranetManager.module("TaxonomyManager.Common",
            function ( Common, TaxonomyManager, Backbone, Marionette, $, _ ) {

                Common.Controller = {

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

                    getAppPublicMenu: function (app) {
                        return new CommonViews.AppPublicMenuView({
                            model: app
                        });
                    },

                    showPublicNavigation: function(app){

                        if(app){
                            //alert('showing the public navigation');
                            IntranetManager.siteNavigationBar.show(this.getAppPublicMenu(app));
                        }
                    },


                    setupAppLayout: function (next) {
                        var that = this;

                        console.log('Setup Application Layout');

                        if (TaxonomyManager.started === false || TaxonomyManager.started === undefined) {

                            TaxonomyManager.started = true;

                            IntranetManager.appLayout = new GlobalViews.AppLayoutView();

                            IntranetManager.appLayout.on('show', function () {

                                IntranetManager.layoutHeader.show(Common.Controller.getHeaderView());

                                IntranetManager.siteSubNavigationBar.show(Common.Controller.getAppMenuView());
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
                    }
                };


            });


        return IntranetManager.TaxonomyManager.Common.Controller;
    });

