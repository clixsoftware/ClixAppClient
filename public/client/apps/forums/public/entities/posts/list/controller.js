define([
        "app",
        "apps/forums/public/entities/posts/list/views",
        "apps/forums/public/common/views",
        "common/views",
        "backbone.virtual-collection",
        "backbone.grouped-collection",
        "moment",
        "simple.pagination"
    ],
    function (IntranetManager, ListViews, CommonViews, GlobalViews) {
        IntranetManager.module("ForumsManager.Public.Posts.List",
            function (List, ForumsManager, Backbone, Marionette, $, _) {
                List.Controller = {


                    getLayoutView: function () {
                        return new ListViews.LayoutView();
                    },

                    getListForumView: function (collection) {
                        var view = new ListViews.ListForumView({
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

                        console.group('<< forums : List: showPostsList  >>');

                        console.group('forums  Options');
                        console.log(opts);
                        console.groupEnd();

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/forums', 'entities/taxonomy', 'entities/core'], function () {

                            var settings = {
                                alias: opts.alias,
                                parent_feature: ForumsManager.feature.id
                            };

                            console.group('@@ Fetching forums  Application ' );
                            console.log(settings);
                            console.groupEnd();

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                            fetchingApp.then(function (app) {

                                console.group('forums  App');
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

                                var fetchingRecords = IntranetManager.request('forums:apps:posts:forums', options);

                                return [app, fetchingRecords, layout, options];

                            })
                                .spread(function (app, fetchedPosts, layout, triggerOptions) {

                                    fetchedPosts.each(function(post) {
                                        var children = post.get('children');
                                        var childrenCol = IntranetManager.request('forums:new:data:entities',  children);
                                        post.set('forum_categories', childrenCol);
                                    });

                                    return [app, fetchedPosts, layout, triggerOptions]

                                }).spread(function(app, fetchedPosts, layout, triggerOptions){
                                    console.group('Fetched Forums');
                                   console.log(fetchedPosts);
                                    console.groupEnd();

                                    var pageTitle = app.get('title');
                                    var appUrls = app.get('urls');

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

                                        paginatedView.on('paginatedView', function (pageNumber) {

                                            console.group('paginatedView: paginatedView: event');

                                            settings.page = pageNumber;

                                            console.log(settings);
                                            console.log(trigger);
                                            console.groupEnd();


                                            var records = IntranetManager.request(trigger, settings);

                                            records.then(function (success) {
                                                layout.searchResults.reset();
                                                layout.searchResults.show(that.getListForumView(success));
                                            });


                                        });

                                        layout.searchResults.show(that.getListForumView(collection));
                                        layout.paginator.show(paginatedView);

                                    };

                                    layout.addRegion("searchResults", "#searchResults");
                                    layout.addRegion("paginator", "#paginator");
                                    //setup the search

                                    searchFormView.on("posts:search", function (filterCriterion) {

                                        console.group('searchFormView: posts:search: event');

                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id,
                                            categories: opts.uuid
                                        };

                                        console.log(search_options);
                                        console.groupEnd();

                                        var search = IntranetManager.request("forums:app:posts:search", search_options);

                                        search.then(function (results) {
                                            buildPaginate(results, 'forums:app:posts:search', search_options);
                                        });

                                    });

                                    var updateTitles = function(title, lastCrumb){

                                       // alert('updating titles');

                                        IntranetManager.trigger('dom:title',title );

                                        IntranetManager.trigger('core:object:breadcrumbs', {
                                            crumbs: [
                                                {title: app.get('title'), url:appUrls.friendly.href},
                                                {title: title, url:''}
                                            ]
                                        });

                                     };

                                    layout.on('show', function () {


                                        IntranetManager.trigger('core:object:categories', {
                                            collection:  app.get('taxonomy'),
                                            url: '/sites/' + opts.alias +  '/forums/posts-by-category/{{slug}}?uuid={{uuid}}',
                                            urlTrigger: "forums:category:posts"
                                        });

                                        IntranetManager.trigger('core:object:tags', {
                                            collection:  app.get('taxonomy'),
                                            url: '/sites/' + opts.alias +  '/forums/posts-by-tag/{{slug}}'
                                        });

                                        IntranetManager.layoutHeader.reset();

                                        if(triggerOptions.categories) {

                                            console.group('Searching by Taxonomy/Category');
                                            console.log(triggerOptions.categories)
                                            console.groupEnd();


                                            var fetchingTaxonomy = IntranetManager.request('taxonomy:entity:uuid', triggerOptions.categories);

                                            fetchingTaxonomy.then(function (category) {

                                                  IntranetManager.layoutHeader.show(that.getHeaderView(category));
                                                updateTitles("posts  by category :: " + category.get('title'), null);

                                            });

                                        }else if (triggerOptions.tag){

                                            var tagModel = IntranetManager.request('core:new:entity', {title: 'All blog posts tagged : ' + triggerOptions.tag});
                                            updateTitles("All blog posts tagged : : " + triggerOptions.tag, null);
                                            IntranetManager.layoutHeader.show(that.getHeaderView(tagModel));

                                        }else{
                                            IntranetManager.trigger('dom:title', app.get('title') );
                                            IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        }

                                      //  IntranetManager.layoutSearch.reset();
                                       // IntranetManager.layoutSearch.show(searchFormView);

                                        buildPaginate(fetchedPosts, 'forums:app:posts:search', triggerOptions);

                                    });

                                    IntranetManager.appLayout = layout;

                                    IntranetManager.siteMainContent.reset();
                                    IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                                })
                                .fail(function (error) {

                                    IntranetManager.trigger('core:error:action', error);
                                });

                        });


                    },

                    showCategoryList: function (opts) {

                        console.group('<< forums : List: showCategoryList  >>');

                        console.group('forums  Options');
                        console.log(opts);
                        console.groupEnd();

                        var that = this;
                        var layout = this.getLayoutView();

                        require(['entities/applications', 'entities/forums'], function () {

                            var settings = {
                                alias: opts.alias,
                                parent_feature: ForumsManager.feature.id
                            };

                            console.group('@@ Fetching forums  Application ' );
                            console.log(settings);
                            console.groupEnd();

                            var fetchingApp = IntranetManager.request('applications:feature:alias', settings);

                            fetchingApp.then(function (app) {

                                console.group('forums  App');
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

                                var fetchingRecords = IntranetManager.request('forums:apps:posts:categories', options);

                                return [app, fetchingRecords, layout, options];

                            })
                                .spread(function (app, fetchedPosts, layout, triggerOptions) {

                                    fetchedPosts.each(function(post) {
                                        var children = post.get('children');
                                        var childrenCol = IntranetManager.request('forums:new:data:entities',  children);
                                        post.set('forum_categories', childrenCol);
                                    });

                                    return [app, fetchedPosts, layout, triggerOptions]

                                }).spread(function(app, fetchedPosts, layout, triggerOptions){
                                    console.group('Fetched Forums');
                                    console.log(fetchedPosts);
                                    console.groupEnd();

                                    var pageTitle = app.get('title');
                                    var appUrls = app.get('urls');

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

                                        paginatedView.on('paginatedView', function (pageNumber) {

                                            console.group('paginatedView: paginatedView: event');

                                            settings.page = pageNumber;

                                            console.log(settings);
                                            console.log(trigger);
                                            console.groupEnd();


                                            var records = IntranetManager.request(trigger, settings);

                                            records.then(function (success) {
                                                layout.searchResults.reset();
                                                layout.searchResults.show(that.getListForumView(success));
                                            });


                                        });

                                        layout.searchResults.show(that.getListForumView(collection));
                                        layout.paginator.show(paginatedView);

                                    };

                                    layout.addRegion("searchResults", "#searchResults");
                                    layout.addRegion("paginator", "#paginator");
                                    //setup the search

                                    searchFormView.on("posts:search", function (filterCriterion) {

                                        console.group('searchFormView: posts:search: event');

                                        // alert('searching');
                                        var search_options = {
                                            criterion: filterCriterion,
                                            parent_application: app.id,
                                            categories: opts.uuid
                                        };

                                        console.log(search_options);
                                        console.groupEnd();

                                        var search = IntranetManager.request("forums:app:posts:search", search_options);

                                        search.then(function (results) {
                                            buildPaginate(results, 'forums:app:posts:search', search_options);
                                        });

                                    });

                                    var updateTitles = function(title, lastCrumb){

                                        // alert('updating titles');

                                        IntranetManager.trigger('dom:title',title );

                                        IntranetManager.trigger('core:object:breadcrumbs', {
                                            crumbs: [
                                                {title: app.get('title'), url:appUrls.friendly.href},
                                                {title: title, url:''}
                                            ]
                                        });

                                    };

                                    layout.on('show', function () {


                                        IntranetManager.trigger('core:object:categories', {
                                            collection:  app.get('taxonomy'),
                                            url: '/sites/' + opts.alias +  '/forums/posts-by-category/{{slug}}?uuid={{uuid}}',
                                            urlTrigger: "forums:category:posts"
                                        });

                                        IntranetManager.trigger('core:object:tags', {
                                            collection:  app.get('taxonomy'),
                                            url: '/sites/' + opts.alias +  '/forums/posts-by-tag/{{slug}}'
                                        });

                                        IntranetManager.layoutHeader.reset();

                                        if(triggerOptions.categories) {

                                            console.group('Searching by Taxonomy/Category');
                                            console.log(triggerOptions.categories)
                                            console.groupEnd();


                                            var fetchingTaxonomy = IntranetManager.request('taxonomy:entity:uuid', triggerOptions.categories);

                                            fetchingTaxonomy.then(function (category) {

                                                IntranetManager.layoutHeader.show(that.getHeaderView(category));
                                                updateTitles("posts  by category :: " + category.get('title'), null);

                                            });

                                        }else if (triggerOptions.tag){

                                            var tagModel = IntranetManager.request('core:new:entity', {title: 'All blog posts tagged : ' + triggerOptions.tag});
                                            updateTitles("All blog posts tagged : : " + triggerOptions.tag, null);
                                            IntranetManager.layoutHeader.show(that.getHeaderView(tagModel));

                                        }else{
                                            IntranetManager.trigger('dom:title', app.get('title') );
                                            IntranetManager.layoutHeader.show(that.getHeaderView(app));

                                        }

                                        //  IntranetManager.layoutSearch.reset();
                                        // IntranetManager.layoutSearch.show(searchFormView);

                                        buildPaginate(fetchedPosts, 'forums:app:posts:search', triggerOptions);

                                    });

                                    IntranetManager.appLayout = layout;

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

        return IntranetManager.ForumsManager.Public.Posts.List.Controller;
    });

