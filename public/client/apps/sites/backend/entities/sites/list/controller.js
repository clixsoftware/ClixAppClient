define([
    "app",
    "apps/sites/backend/entities/sites/list/views",
    "apps/sites/backend/common/views",
    "common/views"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("SitesManager.Sites.List",
            function ( List, SitesManager, Backbone, Marionette, $, _ ) {

                List.Controller = {

                    getSearchView: function(){

                        return new ListViews.SearchView();
                    },

                    displaySearchView: function(){

                        IntranetManager.layoutZone2.show(this.getSearchView());
                    },

                    getListView: function(sites){

                        return new ListViews.ListView({
                            collection: sites
                        });

                    },

                    displayList: function () {

                        console.group('SitesManager: List: displaySitesList');

                        var that = this;

                        var cb = function () {

                            require(['entities/applications'], function () {

                                var fetchingApps = IntranetManager.request('applications:search:feature', 'sites');

                                fetchingApps.then(function ( apps ) {

                                    console.log(apps);

                                    IntranetManager.layoutSearch.show(that.getSearchView());

                                    //Main results content
                                    var listView = List.Controller.getListView(apps);
                                    IntranetManager.layoutContent.show(listView);

                                    //Trigger loading additional widgets
                                    IntranetManager.trigger('sites:backend:list:header:show');


   /*                                 var fetchingNews = IntranetManager.request('news:posts:search:app', appId);

                                    return ([app, fetchingNews]);*/

                                });/*
                                    .spread(function ( app, fetchedNews ) {
                                        var listView = List.Controller.getListView(fetchedNews);
                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView(app));

                                        IntranetManager.layoutContent.show(listView);

                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                        // IntranetManager.trigger('newsmanager:app:categories', appId);

                                        IntranetManager.layoutZone2.reset();
                                        console.log('fetched app and news')
                                    })*/

                            });


                        };

                        IntranetManager.trigger("sites:backend:init", cb);
                        console.groupEnd();

                    }
                }

            });

        return IntranetManager.SitesManager.Sites.List.Controller;
    });

