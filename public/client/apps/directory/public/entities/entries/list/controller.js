/*
 * Application: Directory Manager
 * Module: Directory Manager.Entries.List.Controller
 * */


define([
    "app",
    "apps/directory/public/entities/entries/list/views",
    "apps/directory/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "simple.pagination"
],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("DirectoryManager.Public.Entries.List",
            function ( List, DirectoryManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                    getLayoutView: function () {
                        return new ListViews.LayoutView();
                    },

                    getHeaderView: function (app) {

                        return new ListViews.HeaderView({
                            model: app
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getPaginatorView: function ( results ) {
                        return new ListViews.PaginatedView({
                            model: results
                        });
                    },

                    getAtoZView: function () {
                        return new ListViews.AtoZView();
                    },

                    getSortFilterView: function () {
                        return new ListViews.SortFilterView();
                    },


                    getCategoriesView: function ( collection, appId ) {

                        var view = new ListViews.CategoriesView({
                            collection: collection
                        });

                        var options = {
                            trigger: 'directorymanager:app:categories',
                            appId: appId
                        };

                        view.on('command:new:category', function () {
                            IntranetManager.trigger('taxonomy:new:form', options);
                        });

                        return view;
                    },

                    getListView: function ( collection ) {
                        var view = new ListViews.ListView({
                            collection: collection
                        });

                        return view;
                    },

                    listRecords: function ( appId ) {

                        console.group('DirectoryManager: Contacts: listRecords');

                        var that = this;

                        var cb = function () {

                            require(['entities/applications', 'entities/dir_entry'], function () {

                                var fetchingApp = IntranetManager.request('applications:entity', appId);

                                fetchingApp.then(function ( app ) {

                                    var fetchingRecords = IntranetManager.request('directory:application:contacts', appId);
                                    return [app, fetchingRecords];

                                })
                                    .spread(function ( app, fetchedContacts ) {

                                        console.log(app);

                                        if (fetchedContacts) {
                                            var listView = List.Controller.getAdminListView(fetchedContacts);
                                            IntranetManager.layoutContent.show(listView);

                                        }

                                        IntranetManager.layoutHeader.show(List.Controller.getHeaderView(app));

                                        IntranetManager.layoutSearch.show(List.Controller.getListSearchView());

                                        IntranetManager.layoutZone2.reset();
                                    })
                                    .fail(function ( error ) {

                                        console.log(error);
                                    });
                            });


                        };

                        IntranetManager.trigger("directory:admin:init", cb);
                        console.groupEnd();

                    },

                    showHomePage: function ( diroptions ) {

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/dir_entry'], function () {

                            var settings = {
                                alias: diroptions.alias,
                                parent_feature: DirectoryManager.feature.id
                            };

                            console.log('@@ Fetching Current Application using = ' + JSON.stringify(settings));

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);


                            fetchingApp.then(function ( app ) {
                                console.log('Directory Application ' + JSON.stringify(app));

                                var page = 1;
                                if(diroptions.page){
                                    page = diroptions.page
                                }

                                var options = {
                                    app: app.id,
                                    page: page
                                };

                                var fetchingRecords = IntranetManager.request('directory:application:contacts', options);
                                return [app, fetchingRecords, layout, options];

                            })
                                .spread(function ( app, fetchedContacts, layout, triggerOptions ) {

                                    var searchFormView = that.getSearchFormView();



                                    var doGrouping = function(models){

                                        //alert('doing grouping');
                                        models.each(function ( model, index, list ) {

                                            var gid = parseInt(index / 3);
                                            model.set('gid', gid);
                                            console.log('gid ' + gid);


                                        });

                                        return new Backbone.buildGroupedCollection({
                                            collection: models,
                                            groupBy: function ( post ) {

                                                return post.get('gid');
                                            }
                                        });
                                    };

                                    var buildPaginate = function(collection, trigger, settings){
                                        var PaginateModel = Backbone.Model.extend();

                                        console.log('Paginate this collection');
                                        console.log(collection);
                                        var paginator =  new PaginateModel({
                                            items: collection.total,
                                            itemsOnPage: collection.limit,
                                            path: app.get('path')
                                        });
                                        var groupedCollection = doGrouping(collection);
                                       //
                                       // console.log(JSON.stringify(groupedCollection.vc));
                                        var paginatedView = that.getPaginatorView(paginator);

                                         paginatedView.on('change:page', function ( pageNumber ) {

                                             settings.page = pageNumber;
/*
                                             var options = {
                                                 app: app.id,
                                                 page: pageNumber

                                             };
*/
                                              var records = IntranetManager.request(trigger, settings);

                                             records.then(function(success){

                                                 //alert(success);
                                                // layout.peopleNav.reset();
                                                 layout.peopleNav.show(that.getListView(doGrouping(success)));

                                             });



                                         });


                                        console.log('Grouped collection');
                                        console.log(groupedCollection);
                                        layout.peopleNav.show(that.getListView(groupedCollection));
                                         //console.log(JSON.stringify(paginator));
                                        layout.paginator.show(paginatedView);

                                        //return paginatedView;
                                    };

                                    layout.addRegion("peopleNav", "#peoplenav");
                                    layout.addRegion("paginator", "#paginator");
                                    //setup the search

                                    searchFormView.on("people:search", function ( filterCriterion ) {

                                        console.log("people:search event , criterion = " + filterCriterion);
                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id
                                        };

                                        var search = IntranetManager.request("directory:application:contacts:search", search_options);

                                       search.then(function ( results ) {
                                            //console.log('Search results ' +results.models.length);

                                           buildPaginate(results, 'directory:application:contacts:search', search_options);


                                        });

                                    });
                                    layout.on('show', function () {
                                       //alert(app.get('title'));

                                        IntranetManager.layoutHeader.reset();
                                        IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        IntranetManager.layoutSearch.reset();
                                        IntranetManager.layoutSearch.show(searchFormView);


                                        //layout.navigationRegion.show(that.getAtoZView());
                                        //  layout.headerRegion.show(that.getSortFilterView());
                                        console.log('first showing');
/*                                        layout.peopleNav.show(that.getListView(doGrouping(fetchedContacts)));

                                        //console.log(JSON.stringify(paginator));
                                        layout.paginator.show(buildPaginate(fetchedContacts));*/
                                        buildPaginate(fetchedContacts, 'directory:application:contacts', triggerOptions);
                                    });


                                    IntranetManager.appLayout = layout;

                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);


                                })
                                .fail(function ( error ) {

                                    console.log(error);
                                });
                        });

                        console.groupEnd();

                    }
                }

            });

        return IntranetManager.DirectoryManager.Public.Entries.List.Controller;
    });

