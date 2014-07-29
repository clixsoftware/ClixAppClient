define([
    "app",
    "apps/howdoi/public/entities/home/show/views",
    "moment"
], function ( IntranetManager, Views ) {

    IntranetManager.module("HowDoIManager.Public.Home.Show",
        function ( Show, HowDoIManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getLayoutView: function () {
                    return new Views.LayoutView();

                },

                getCategoryHeaderView: function ( category ) {

                    return new Views.CategoryHeaderView({
                        model: category
                    });
                },

                getSearchFormView: function ( item ) {

                    return new Views.SearchFormView({
                        model: item
                    });
                },

                getListView: function ( results ) {

                    return new Views.ListView({
                        collection: results
                    });
                },

                showHomePage: function ( alias ) {
                    var that = this;

                    require(['entities/applications', 'entities/howdoi', 'entities/taxonomy'], function () {

                        var options = {
                            alias: alias,
                            parent_feature: HowDoIManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function ( app ) {

                            IntranetManager.appLayout = Show.Controller.getLayoutView();

                            IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            //IntranetManager.trigger('howdoi:app:category:list', app.get('uuid'));

                           // IntranetManager.trigger('howdoi:app:tags:list', app.get('uuid'));

                            IntranetManager.trigger('dom:title', app.get('title'));

                            //var fetchingCategories = IntranetManager.request('taxonomy:object:terms', app.get('uuid'));

                            return [app];

                        }).spread(function ( app ) {

                            var options = {};
                            var categories = app.get('categories');

                            var term = IntranetManager.request('taxonomy:entity:new');

                            options.collection = categories.trim().replace(/"/g, '').trim().split(',');
                            term.set('items', IntranetManager.request('taxonomy:collection:set:categories', options))

                             var searchFormView = that.getSearchFormView(term);

                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            searchFormView.on("howdoi:search", function ( filterCriterion ) {

                                IntranetManager.trigger('howdoi:search', filterCriterion);

                                //alert(filterCriterion);
                                /*
                                 console.log("news:category:search event , criterion = " + filterCriterion);
                                 // alert('searching');
                                 opts.criterion =  filterCriterion;

                                 var search = IntranetManager.request("news:posts:search:category", opts);
                                 search.then(function ( results ) {
                                 IntranetManager.layoutContent.reset();
                                 IntranetManager.layoutContent.show(that.getListView(results));
                                 });*/

                            });

                            var taxoptions = {
                                parentFeature: app.get('parent_application_feature'),
                                appFeature: 'how-do-i',
                                appAlias: app.get('parent_application_alias'),
                                parentId: app.get('parent_application'),
                                objectId: app.get('uuid'),
                                categories: app.get('categories'),
                                tags: app.get('tags'),
                                url: app.get('path')
                            };



                            console.group("app");
                            console.log(app);
                            console.groupEnd();

                            console.group("taxoptions");
                            console.log(taxoptions);
                            console.groupEnd();
                            // IntranetManager.trigger('news:public:category:list', parentApp.get('uuid'));
                            IntranetManager.trigger('core:object:categories', taxoptions );


                        }).fail(function ( err ) {
                            //alert(' an error occurred ' + err);
                            console.log('an error occurred ' + err);
                        });

                    });

                },


                showCategoryHeader: function ( options ) {

                    console.log(options);
                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:entity:feature:alias:code', options);


                        fetchingCategory.then(function ( category ) {
                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getCategoryHeaderView(category.at(0)));

                        })
                            .fail(function ( error ) {
                                alert(error);
                            });


                    });


                },

                getSearchLayoutView: function () {
                    return new Views.SearchLayoutView();

                },

                getSearchResultsHeaderView: function (results) {

                    return new Views.SearchResultsHeaderView({
                        model: results
                    });
                },

                getSearchListView: function ( results ) {
                    return new Views.SearchListView({
                        collection: results
                    });
                },

                showSearchResultsPage: function ( opts ) {
                    var that = this;

                    console.log(opts);
                    require(['entities/applications', 'entities/howdoi', 'entities/taxonomy'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: HowDoIManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function ( app ) {

                            console.log(app);

                            IntranetManager.appLayout = Show.Controller.getSearchLayoutView();

                            IntranetManager.siteMainContent.show(IntranetManager.appLayout);


                            IntranetManager.trigger('dom:title', app.get('title'));

                            var fetchingPosts = IntranetManager.request('howdoi:posts:search', opts.criterion);

                            return [app, fetchingPosts];

                        }).spread(function ( app, fetchingPosts ) {

                            console.log(fetchingPosts);

                            var searchHdr = Backbone.Model.extend();

                            var hdr = new searchHdr({
                                count: fetchingPosts.length,
                                criterion: opts.criterion
                            });


                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getSearchResultsHeaderView(hdr));

                            IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(that.getSearchListView(fetchingPosts));


                        }).fail(function ( err ) {
                            //alert(' an error occurred ' + err);
                            console.log('an error occurred ' + err);
                        });

                    });
                }


            }
        });

    return IntranetManager.HowDoIManager.Public.Home.Show.Controller;
});

