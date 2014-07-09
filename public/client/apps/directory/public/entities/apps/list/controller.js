/*
 * Application: Directory Manager
 * Module: Directory Manager.Entries.List.Controller
 * */


define([
        "app",
        "apps/directory/public/entities/apps/list/views",
        "apps/directory/common/views",
        "common/views",
        "backbone.virtual-collection",
        "backbone.grouped-collection",
        "simple.pagination"
    ],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("DirectoryManager.Public.Apps.List",
            function ( List, DirectoryManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                    getLayoutView: function () {
                        return new ListViews.LayoutView();
                    },

                    getHeaderView: function () {

                        return new ListViews.HeaderView();
                    },

                    getListView: function ( collection ) {
                        //alert('getting the list view');
                        var view = new ListViews.ListView({
                            collection: collection
                        });

                        return view;
                    },

                    loadAppsHome: function () {

                        var that = this;
                        var layout = this.getLayoutView();
                        layout.addRegion("peopleNav", "#peoplenav");

                        require(['entities/applications'], function () {

                            console.log('@@ Fetching applications');

                            var fetchingApps = IntranetManager.request('applications:search:feature', 'directory');


                            fetchingApps.then(function ( apps ) {
                               // console.log('Directory Applications ' + JSON.stringify(apps));

                                var doGrouping = function(models){

                                    //alert('doing grouping');
                                    models.each(function ( model, index, list ) {

                                        var gid = parseInt(index / 3);
                                        model.set('gid', gid);
                                        console.log('gid ' +  model.get('gid') + ' ' + model.get('title'));
                                    });

                                    return new Backbone.buildGroupedCollection({
                                        collection: models,
                                        groupBy: function ( post ) {
                                            return post.get('gid');
                                        }
                                    });
                                };



                                layout.on('show', function () {
                                    IntranetManager.layoutHeader.reset();
                                    IntranetManager.layoutHeader.show(that.getHeaderView());
                                    console.log('Group this collection');
                                    console.log(apps);
                                    var groupedCollection = doGrouping(apps);
                                    console.log('Grouped collection');
                                    console.log(groupedCollection);
                                    layout.peopleNav.show(that.getListView(groupedCollection));

                                });


                                IntranetManager.appLayout = layout;
                                IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                               // IntranetManager.layoutZone1.show(that.getListView(doGrouping(apps)));

                            });
                        });


                    }
                }

            });

        return IntranetManager.DirectoryManager.Public.Apps.List.Controller;
    });

