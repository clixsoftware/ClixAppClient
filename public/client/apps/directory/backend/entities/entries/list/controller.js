/*
 * Application: Directory Manager
 * Module: Directory Manager.Entries.List.Controller
 * */


define([
    "app",
    "apps/directory/entities/entries/list/views",
    "apps/directory/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("DirectoryManager.Entries.List",
            function ( List, DirectoryManager, Backbone, Marionette, $, _ ) {
                List.Controller = {

                    getPublicLayoutView: function () {

                        console.log('<< getAppLayoutView: Return Layout >>');

                        return new ListViews.PublicLayoutView();

                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getPaginatorView: function ( results ) {
                        alert('paginator view');
                        return new ListViews.PaginatedView({
                            collection: results
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

                    getHeaderView: function ( app ) {
                        var that = this;

                        app.set('_page_header_', 'Directory Application : ' + app.get('alias'));
                        app.set('_page_description_', 'Directory Entries for the application');
                        app.set('_page_command_button_', 'Add New Entry');
                        app.set('_page_command_button_show', true);

                        var view = new CommonViews.ListHeaderView({
                            model: app
                        });

                        view.on('button:command:new', function () {
                            //    alert('new directory entry');
                            IntranetManager.trigger('directory:admin:contact:new', app.get('id'));
                        });

                        return view;

                    },

                    getListSearchView: function () {

                        var that = this;
                        var view = new GlobalViews.SearchView();

                        view.on('list:search', function ( criterion ) {
                            that.listSearch(criterion);
                        });

                        return view;

                    },

                    getListView: function ( collection ) {
                        var view = new ListViews.ListView({
                            collection: collection
                        });

                        return view;
                    },
                    getAdminListView: function ( collection ) {
                        var view = new ListViews.AdminListView({
                            collection: collection
                        });

                        return view;
                    },
                    getBlankView: function ( appId ) {

                        var view = new ListViews.BlankView();

                        view.on('command:form:new', function () {
                            IntranetManager.trigger('newsmanager:posts:new:form', appId);

                        });

                        return view;
                    },

                    getBlankHelpView: function () {
                        return new ListViews.BlankHelpView();
                    },

                    getNoRecordsView: function () {

                        var view = new GlobalViews.ListNoRecordsView();

                        view.on('list:command:all', function () {
                            IntranetManager.trigger('sitemanager:home:show');
                        });

                        return view;
                    },

                    listSearch: function ( criterion ) {

                        var that = this;
                        var fetchingRecords = IntranetManager.request('site:search', 'title=' + criterion);

                        $.when(fetchingRecords).done(function ( fetchedRecords ) {

                            //  alert('search for features');
                            //  console.log(fetchedRecords);
                            if (fetchedRecords != undefined) {


                                var listView = that.getListView(fetchedRecords);
                                IntranetManager.layoutContent.show(listView);
                            } else {
                                IntranetManager.layoutContent.show(that.getNoRecordsView());

                            }

                        });


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

                    loadCategories: function ( appId ) {

                        require(['entities/taxonomy'], function () {

                            var fetchingCatgories = IntranetManager.request('taxonomy:entities:search', 'parent_app=' + appId);

                            $.when(fetchingCatgories).done(function ( fetchedCategories ) {

                                if (fetchedCategories) {

                                    IntranetManager.layoutZone1.show(List.Controller.getCategoriesView(fetchedCategories, appId));

                                } else {

                                    console.log('no categoires found');
                                }
                            });

                        });

                    },

                    showPublicDirectoryHome: function ( alias ) {
                        var that = this;
                        console.group('DirectoryManager: showPublicDirectoryHome');

                        console.log('Directory Application - ' + alias);

                        var layout = this.getPublicLayoutView();

                        require(['entities/applications', 'entities/dir_entry'], function () {

                            var settings = {
                                alias: alias,
                                parent_feature: DirectoryManager.feature.id
                            };

                            console.log('@@ Fetching Current Application using = ' + JSON.stringify(settings));

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                            var searchFormView = that.getSearchFormView();


                            fetchingApp.then(function ( app ) {

                                var fetchingRecords = IntranetManager.request('directory:application:contacts', app.id);
                                return [app, fetchingRecords];

                            })
                                .spread(function ( app, fetchedContacts ) {

                                    console.log(app);

                                    // if(fetchedContacts){
                                    //      var listView = List.Controller.getListView(fetchedContacts);
                                    //      IntranetManager.layoutContent.show(listView);

                                    // }
                                    layout.addRegion("peopleNav", "#peoplenav");
                                    //  layout.addRegion("paginator", "#paginator");
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
                                            layout.peopleNav.reset();
                                            layout.peopleNav.show(that.getListView(results));
                                        });

                                    });

                                    layout.on('show', function () {
                                        //alert('showing the list public layout');
                                        layout.searchRegion.show(searchFormView);
                                        //layout.navigationRegion.show(that.getAtoZView());
                                        //  layout.headerRegion.show(that.getSortFilterView());
                                        layout.peopleNav.show(that.getListView(fetchedContacts));
                                    });

                                    IntranetManager.appLayout = layout;
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                })
                                .fail(function ( error ) {

                                    console.log(error);
                                });
                        });

                        console.groupEnd();

                    },

                    showPublicNewsHome: function ( alias ) {

                        console.group('<< showPublicNewsHome : INIT >>');

                        var that = this;

                        var cb = function () {

                            require(['entities/app'], function () {

                                var query = 'alias=' + alias + '&parent_feature=' + NewsManager.feature.id;

                                var fetchingApp = IntranetManager.request('appmodel:search', query);

                                $.when(fetchingApp).done(function ( fetchedApp ) {

                                    console.log('<< showPublicNewsHome: fetch app completed  >>');

                                    if (fetchedApp) {

                                        console.log('<< showPublicNewsHome: fetch app success >>');

                                        IntranetManager.trigger('news:public:app:channels:list', fetchedApp);

                                        // IntranetManager.trigger('newsmanager:public:popular:posts:global');

                                        //get the parent application
                                        var query2 = fetchedApp.at(0).get('parent_app');

                                        var fetchingParentApp = IntranetManager.request('appmodel:entity', query2);

                                        console.log('@@ Fetching Application App using = ' + query2);

                                        $.when(fetchingParentApp).done(function ( fetchedParentApp ) {

                                            console.log('++ Fetching App Completed');

                                            if (fetchedParentApp) {

                                                console.log('++ Fetching App Success');

                                                console.log('*** Parent App Name ' + fetchedParentApp.get('title'));

                                                IntranetManager.trigger('app:show:navigation', fetchedParentApp);

                                            }

                                        });

                                        require(["entities/news_post"],
                                            function () {

                                                var appId = fetchedApp.at(0).get('id');

                                                console.log('Get News Postings for News App ID = ' + appId);

                                                //fetch posts
                                                var fetchingRecords = IntranetManager.request('news:posts:search:app', appId);

                                                $.when(fetchingRecords).done(function ( fetchedRecords ) {


                                                    if (fetchedRecords != undefined) {

                                                        console.log(fetchedRecords.at(1).get('title'));
                                                        var grouped = new Backbone.buildGroupedCollection({
                                                            collection: fetchedRecords,
                                                            groupBy: function ( post ) {
                                                                return post.get('category');
                                                            }
                                                        });
                                                        //var listView = new Marionette.CollectionView();

                                                        grouped.each(function ( group, index, list ) {
                                                            console.log(group.id);
                                                            //listView.appendHtml(List.Controller.getPublicNewsHomeView(group.vc));
                                                            //IntranetManager.layoutContent.show(listView);
                                                        });

                                                        console.log(grouped.at(1).get('id'));

                                                        var listView = List.Controller.getPublicNewsHomeView(grouped);
                                                        IntranetManager.layoutContent.show(listView);


                                                    } else {

                                                        console.log('XXX No News Post Found , rendering Blank,');
                                                        console.log('TODO: change public blank view,');
                                                        //TODO: change public blank view

                                                        IntranetManager.layoutZone1.show(that.getBlankHelpView());
                                                        IntranetManager.layoutContent.show(that.getBlankView(appId));
                                                        IntranetManager.layoutSearch.reset();
                                                        IntranetManager.layoutHeader.reset();
                                                    }

                                                });


                                            }
                                        );

                                    } else {
                                        console.log('application record found');
                                    }
                                });

                            });


                        };

                        IntranetManager.trigger("news:public:init", cb);
                        console.groupEnd();

                    }
                }

            });

        return IntranetManager.DirectoryManager.Entries.List.Controller;
    });

