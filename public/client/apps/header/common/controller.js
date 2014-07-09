/*
 * Application: Header Manager
 * Controller: Common Controller
 * Module: HeaderManager.Common
 * */

define([
    "app",
    "apps/header/common/views",
    "apps/header/entities/sitenav/list/views",
    "apps/header/entities/utilitynav/list/views"
], function ( IntranetManager, CommonViews, SiteNavListViews, UtilityNavViews ) {

    IntranetManager.module("HeaderManager.Common",
        function ( Common, IntranetManager, Backbone, Marionette, $, _ ) {

            Common.Controller = {

                getLayoutView: function () {
                    return new CommonViews.LayoutView();
                },

                getMobileNavView: function () {

                    return new CommonViews.MobileNavView();
                },

                getBrandMenuView: function () {
                    var that = this;

                    var view = new CommonViews.BrandMenuView();

                    view.on('sidebar:toggle', function () {

                        IntranetManager.siteLeftBar.show(new CommonViews.MainMenuView());
                    });

                    view.on('sidebar:search:toggle', function () {
                        IntranetManager.siteTopBar.show(that.getSiteSearchView());
                    });

                    view.on('menu:nav:home', function () {
                        IntranetManager.trigger("home:show");
                    });

                    return view;
                },

                getSiteSearchView: function () {
                    console.log('<< getSiteSearchView: load site SearchView  >>');
                    var view = new CommonViews.SiteSearchView();


/*                    view.on('sidebar:close', function () {
                        //alert('closing the side bar');
                    });*/

                    return view;
                },

                getUserMenuView: function () {
                    return new CommonViews.UserMenuView();
                },

                setupLayout: function () {
                    var that = this;

                    IntranetManager.headerLayout = this.getLayoutView();

                    IntranetManager.headerLayout.on("show", function () {

                        IntranetManager.siteMobileNav.show(that.getMobileNavView());
                        IntranetManager.siteBrand.show(that.getBrandMenuView());
                        IntranetManager.siteSearch.show(that.getSiteSearchView());
                        //setup the navigation
                        that.setupNavigation();
                        that.setupUtilityNavigation();

                    });

                    IntranetManager.siteHeader.show(IntranetManager.headerLayout);
                },

                setActiveHeader: function ( headerUrl ) {
                    var links = IntranetManager.request('sitenav:entities');
                    var headerToSelect = links.find(function ( header ) {return header.get("url") === headerUrl; });
                    headerToSelect.select();
                    links.trigger("reset");
                },

                setupNavigation: function () {

                    require(["apps/header/entities/sitenav/model"], function () {

                        var links = IntranetManager.request("sitenav:entities");
                        var headers = new SiteNavListViews.SiteNavView({
                            collection: links
                        });

                        headers.on('brand:clicked', function () {

                        });

                        headers.on('itemview:navigate', function ( childview, model ) {

                            var trigger = model.get('navigationTrigger');
                            IntranetManager.trigger(trigger);

                        });

                        IntranetManager.siteNavigationBar.show(headers);


                    });


                },

                setupUtilityNavigation: function () {

                    require(["apps/header/entities/utilitynav/model"], function () {

                        var links = IntranetManager.request("utilitynav:entities");
                        var headers = new UtilityNavViews.UtilityNavView({
                            collection: links
                        });

                        headers.on('brand:clicked', function () {

                        });

                        headers.on('itemview:navigate', function ( childview, model ) {

                            var trigger = model.get('navigationTrigger');
                            IntranetManager.trigger(trigger);

                        });

                        IntranetManager.utilityNavBar.show(headers);


                    });


                }

            }
        });

    return IntranetManager.HeaderManager.Common.Controller;
});

