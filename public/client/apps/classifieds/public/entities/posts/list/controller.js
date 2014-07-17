define([
        "app",
        "apps/classifieds/public/entities/posts/list/views",
        "apps/classifieds/public/common/views",
        "common/views",
        "backbone.virtual-collection",
        "backbone.grouped-collection",
        "moment",
        "simple.pagination"
    ],
    function (IntranetManager, ListViews, CommonViews, GlobalViews) {
        IntranetManager.module("ClassifiedsManager.Public.Posts.List",
            function (List, ClassifiedsManager, Backbone, Marionette, $, _) {
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


                    showPostsList: function (options) {

                        console.group('<< showPostsList : INIT >>');

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/classifieds'], function () {

                            var settings = {
                                alias: options.alias,
                                parent_feature: ClassifiedsManager.feature.id
                            };

                            console.log('@@ Fetching Current Application using = ' + JSON.stringify(settings));

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                            fetchingApp.then(function (app) {
                                console.log('Classifieds Application ' + JSON.stringify(app));

                                var options = {
                                    app: app.id,
                                    page: 1,
                                    parent_application: app.get('id')
                                };

                                var fetchingRecords = IntranetManager.request('classifieds:posts:search', options);

                                //load categories
                                //IntranetManager.trigger('classifieds:load:categories');

                                return [app, fetchingRecords, layout, options];

                            })
                                .spread(function (app, fetchedPosts, layout, triggerOptions) {

                                    var searchFormView = that.getSearchFormView();


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
                                                layout.peopleNav.show(that.getListView(success));
                                            });


                                        });

                                        layout.peopleNav.show(that.getListView(collection));
                                        layout.paginator.show(paginatedView);

                                    };

                                    layout.addRegion("peopleNav", "#peoplenav");
                                    layout.addRegion("paginator", "#paginator");
                                    //setup the search

                                    searchFormView.on("people:search", function (filterCriterion) {

                                        console.log("people:search event , criterion = " + filterCriterion);
                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id
                                        };

                                        var search = IntranetManager.request("classifieds:posts:search", search_options);

                                        search.then(function (results) {
                                            buildPaginate(results, 'classifieds:posts:search', search_options);
                                        });

                                    });

                                    layout.on('show', function () {

                                        IntranetManager.layoutHeader.reset();
                                        IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        IntranetManager.layoutSearch.reset();
                                        IntranetManager.layoutSearch.show(searchFormView);

                                        buildPaginate(fetchedPosts, 'classifieds:posts:search', triggerOptions);

                                    });

                                    IntranetManager.appLayout = layout;
                                    IntranetManager.layoutContent.show(IntranetManager.appLayout);

                                })
                                .fail(function (error) {

                                    console.log(error);
                                });

                        });


                    },

                    getCategoriesView: function () {
                        return new ListViews.CategoryView();
                    },

                    displayPatientCategories: function () {

                        IntranetManager.layoutZone2.reset();
                        IntranetManager.layoutZone2.show(new this.getCategoriesView());
                    }
                }

            });

        return IntranetManager.ClassifiedsManager.Public.Posts.List.Controller;
    });

