define([
    "app",
    "apps/news/public/entities/categories/show/views",
    "moment"
], function (IntranetManager, CategoryShowViews) {

    IntranetManager.module("NewsManager.Category.Show",
        function (Show, NewsManager, Backbone, Marionette, $, _) {

            Show.Controller = {

                getLayoutView: function () {
                    return new CategoryShowViews.LayoutView();

                },

                getCategoryHeaderView: function (category) {

                    return new CategoryShowViews.CategoryHeaderView({
                        model: category
                    });
                },

                getSearchFormView: function () {

                    return new CategoryShowViews.SearchFormView();
                },

                getListView: function (results) {

                    return new CategoryShowViews.ListView({
                        collection: results
                    });
                },

                showLayout: function (opts) {
                    var that = this;

                    require(['entities/applications', 'entities/news'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: NewsManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + options);

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function (app) {

                            //console.log(app);

                            IntranetManager.appLayout = Show.Controller.getLayoutView();

                            IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            IntranetManager.trigger('news:public:category:list', opts);

                            IntranetManager.trigger('dom:title', app.get('title'));

                            var fetchingPosts = IntranetManager.request('news:posts:search:category', opts);

                            return [app, fetchingPosts, searchFormView];

                        }).spread(function (app, fetchedPosts, searchFormView) {

                            IntranetManager.trigger('news:public:category:header', opts);


                            searchFormView.on("news:category:search", function (filterCriterion) {

                                console.log("news:category:search event , criterion = " + filterCriterion);
                                // alert('searching');
                                opts.criterion = filterCriterion;

                                var search = IntranetManager.request("news:posts:search:category", opts);
                                search.then(function (results) {
                                    IntranetManager.layoutContent.reset();
                                    IntranetManager.layoutContent.show(that.getListView(results));
                                });

                            });


                            IntranetManager.layoutContent.reset();
                            IntranetManager.layoutContent.show(that.getListView(fetchedPosts));

                        }).fail(function (err) {
                            //alert(' an error occurred ' + err);
                            console.log('an error occurred ' + err);
                        });

                    });

                },


                showCategoryHeader: function (options) {

                    console.log('Show Cat Header ' + JSON.stringify(options));

                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:entity:by:code', options.category);


                        fetchingCategory.then(function (category) {
                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getCategoryHeaderView(category.at(0)));

                        })
                            .fail(function (error) {
                                alert(error);
                            });


                    });


                }


            }
        });

    return IntranetManager.NewsManager.Category.Show.Controller;
});

