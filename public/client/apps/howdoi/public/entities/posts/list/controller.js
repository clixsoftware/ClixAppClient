define([
        "app",
        "apps/howdoi/public/entities/posts/list/views",
        "apps/howdoi/public/common/views",
        "common/views",
        "backbone.virtual-collection",
        "backbone.grouped-collection",
        "moment",
        "simple.pagination"
    ],
    function (IntranetManager, ListViews, CommonViews, GlobalViews) {
        IntranetManager.module("HowDoIManager.Public.Posts.List",
            function (List, HowDoIManager, Backbone, Marionette, $, _) {
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


                    showPostsList: function (opts) {

                        console.group('<< How DO I : List: showPostsList  >>');

                        console.group('How DO I  Options');
                        console.log(opts);
                        console.groupEnd();

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/howdoi', 'entities/taxonomy', 'entities/core'], function () {

                            var settings = {
                                alias: opts.alias,
                                parent_feature: HowDoIManager.feature.id
                            };

                            console.group('@@ Fetching How DO I  Application ' );
                            console.log(settings);
                            console.groupEnd();

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                            fetchingApp.then(function (app) {

                                console.group('How Do I  App');
                                console.log(app);
                                console.groupEnd();

                                var page=0;

                                if(opts.page){
                                    page = opts.page;
                                }

                                var options = {
                                    app: app.id,
                                    page: page,
                                    parent_application: app.get('id'),
                                    categories: opts.uuid,
                                    tag: opts.tag
                                };

                                var fetchingRecords = IntranetManager.request('howdoi:app:posts:search', options);

                                var fetchingTaxonomy = IntranetManager.request('taxonomy:entity:uuid', opts.uuid);

                                return [app, fetchingRecords, layout, options, fetchingTaxonomy];

                            })
                                .spread(function (app, fetchedPosts, layout, triggerOptions, fetchedTerm) {

                                    console.log(fetchedTerm);
                                    console.log(Backbone.history.location);
                                    var searchFormView = that.getSearchFormView();

                                    var buildPaginate = function (collection, trigger, settings) {
                                        var PaginateModel = Backbone.Model.extend();

                                        var paginator = new PaginateModel({
                                            items: collection.total,
                                            itemsOnPage: collection.limit,
                                            path: opts.path
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
                                                layout.searchResults.reset();
                                                layout.searchResults.show(that.getListView(success));
                                            });


                                        });

                                        layout.searchResults.show(that.getListView(collection));
                                        layout.paginator.show(paginatedView);

                                    };

                                    layout.addRegion("searchResults", "#searchResults");
                                    layout.addRegion("paginator", "#paginator");
                                    //setup the search

                                    searchFormView.on("posts:search", function (filterCriterion) {

                                        console.log("posts:search event , criterion = " + filterCriterion);
                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id,
                                            categories: opts.uuid
                                        };

                                        var search = IntranetManager.request("howdoi:app:posts:search", search_options);

                                        search.then(function (results) {
                                            buildPaginate(results, 'howdoi:app:posts:search', search_options);
                                        });

                                    });

                                    layout.on('show', function () {


                                        IntranetManager.trigger('core:object:categories', {
                                            collection:  app.get('taxonomy'),
                                            url: '/howdois/' + opts.alias +  '/posts-by-category/{{slug}}?uuid={{uuid}}',
                                            urlTrigger: "howdoi:category:posts"
                                        });

                                        IntranetManager.trigger('core:object:tags', {
                                            collection:  app.get('taxonomy'),
                                            url: '/howdois/'  + opts.alias +  '/posts-by-tag/{{slug}}'
                                        });

                                        IntranetManager.layoutHeader.reset();
                                        if(triggerOptions.categories) {
                                            var fetchingTaxonomy = IntranetManager.request('taxonomy:entity:uuid', triggerOptions.categories);

                                            fetchingTaxonomy.then(function (category) {
                                                IntranetManager.layoutHeader.show(that.getHeaderView(category));
                                            });

                                        }else if (triggerOptions.tag){

                                            var tagModel = IntranetManager.request('core:new:entity', {title: 'All Tasks & Guides tagged : ' + triggerOptions.tag});
                                            IntranetManager.layoutHeader.show(that.getHeaderView(tagModel));

                                        }else{

                                            IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        }

/*
                                        IntranetManager.layoutHeader.show(that.getHeaderView(fetchedTerm));*/

                                        IntranetManager.layoutSearch.reset();
                                        IntranetManager.layoutSearch.show(searchFormView);

                                        buildPaginate(fetchedPosts, 'howdoi:app:posts:search', triggerOptions);

                                    });

                                    IntranetManager.appLayout = layout;

                                    IntranetManager.siteMainContent.reset();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                })
                                .fail(function (error) {

                                    console.log(error);
                                });

                        });


                    }
                }

            });

        return IntranetManager.HowDoIManager.Public.Posts.List.Controller;
    });

