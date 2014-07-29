define([
        "app",
        "apps/vacancy/public/entities/posts/list/views",
        "apps/vacancy/public/common/views",
        "common/views",
        "backbone.virtual-collection",
        "backbone.grouped-collection",
        "moment",
        "simple.pagination"
    ],
    function (IntranetManager, ListViews, CommonViews, GlobalViews) {
        IntranetManager.module("VacancyManager.Public.Posts.List",
            function (List, VacancyManager, Backbone, Marionette, $, _) {
                List.Controller = {


                    getLayoutView: function () {
                        return new ListViews.LayoutView();
                    },

                    getListView: function (collection) {
                        var view = new ListViews.ListView({
                            collection: collection
                        });
                        return view;
                    },

                    getHeaderView: function (app) {

                        return new ListViews.HeaderView({
                            model: app
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getPaginatorView: function (results) {
                        return new ListViews.PaginatedView({
                            model: results
                        });
                    },

                    displayHomePage: function (pageSettings) {

                        console.group('<< displayHomePage : INIT >>');

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/content'], function () {

                            var appSearchSettings = {
                                alias: pageSettings.alias,
                                parent_feature: VacancyManager.feature.id
                            };

                            console.log('@@ Fetching Current Application using = ' + JSON.stringify(appSearchSettings));

                            var fetchingApp = IntranetManager.request('applications:feature:alias', appSearchSettings);

                            fetchingApp.then(function (app) {

                                var postSearchOptions = {
                                    page: (pageSettings.page)? pageSettings.page: 0,
                                    parent_application: app.get('id')
                                };

                                var fetchingRecords = IntranetManager.request('content:posts:search', postSearchOptions);

                                return [app, fetchingRecords, layout, postSearchOptions];

                            })
                                .spread(function (app, fetchedPosts, layout, triggerOptions) {

                                    console.group('Application');
                                    console.log(app);
                                    console.groupEnd();

                                    var searchFormView = that.getSearchFormView();

                                    //pagination function - needs fixing
                                    var buildPaginate = function (collection, trigger, settings) {
                                        var PaginateModel = Backbone.Model.extend();

                                        var paginator = new PaginateModel({
                                            items: collection.total,
                                            itemsOnPage: collection.limit,
                                            path: app.get('path')
                                        });

                                        var paginatedView = that.getPaginatorView(paginator);

                                        paginatedView.on('change:page', function (pageNumber) {

                                            console.group('Page Change Initialize');

                                            settings.page = pageNumber;

                                            console.log(settings);
                                            console.log(trigger);
                                            console.groupEnd();


                                            var records = IntranetManager.request(trigger, settings);

                                            records.then(function (success) {
                                                console.log('Resetting the collection information');

                                                //layout.peopleNav.reset();
                                                layout.searchResults.show(that.getListView(success));
                                            });


                                        });

                                        layout.searchResults.show(that.getListView(collection));
                                        layout.paginator.show(paginatedView);

                                    };

                                    //add additional regions to support search and paginator
                                    layout.addRegion("searchResults", "#searchResults");
                                    layout.addRegion("paginator", "#paginator");

                                    //fires when a search is conducted
                                    searchFormView.on("posts:search", function (filterCriterion) {

                                        console.log("posts:search event , criterion = " + filterCriterion);
                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id
                                        };

                                        var search = IntranetManager.request("content:posts:search", search_options);

                                        search.then(function (results) {
                                            buildPaginate(results, 'content:posts:search', search_options);
                                        });

                                    });

                                    //shows the actual page layout
                                    layout.on('show', function () {

                                        //load the application category widget
                                        var taxonomy = app.get('taxonomy');

                                        IntranetManager.trigger('core:object:categories', {
                                            collection: taxonomy,
                                            url: '/classifieds/posts-by-category/{{slug}}'
                                        });

                                        IntranetManager.trigger('core:object:tags', {
                                            collection: taxonomy,
                                            url: '/classifieds/posts-by-tags/{{slug}}'
                                        });

                                        //empty layoutHeader and show Header
                                        IntranetManager.layoutHeader.reset();
                                        IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        //empty layoutHeader and show Header
                                        IntranetManager.layoutSearch.reset();
                                        IntranetManager.layoutSearch.show(searchFormView);

                                        //fetch the posts and display using the pagination function
                                        buildPaginate(fetchedPosts, 'content:posts:search', triggerOptions);

                                    });

                                    //adds the page layout
                                    IntranetManager.appLayout = layout;

                                    //reset main content area and show the page layout instead
                                    IntranetManager.siteMainContent.reset();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                })
                                .fail(function (error) {
                                    IntranetManager.trigger('core:error:action', error);
                                });

                        });


                    }
                }

            });

        return IntranetManager.VacancyManager.Public.Posts.List.Controller;
    });

