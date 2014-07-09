define([
    "app",
    "apps/howdoi/public/entities/categories/show/views",
    "moment"
], function ( IntranetManager, CategoryShowViews ) {

    IntranetManager.module("HowDoIManager.Public.Category.Show",
        function ( Show, HowDoIManager, Backbone, Marionette, $, _ ) {

            Show.Controller = {

                getLayoutView: function () {
                    return new CategoryShowViews.LayoutView();

                },

                getCategoryHeaderView: function ( category ) {

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

                showCategoryPostsPage: function ( opts ) {
                    var that = this;

                    require(['entities/applications', 'entities/howdoi'], function () {


                        var options = {
                            alias: opts.alias,
                            parent_feature: HowDoIManager.feature.id
                        };

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify( options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);


                        fetchingApp.then(function ( app ) {

                            //console.log('How Do I Applicaiton ' + JSON.stringify(app));

                            IntranetManager.appLayout = Show.Controller.getLayoutView();

                            IntranetManager.siteMainContent.show(IntranetManager.appLayout);

                            var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);

                            IntranetManager.trigger('howdoi:app:related:categories', app.get('uuid'));

                            IntranetManager.trigger('dom:title', app.get('title'));

                            var fetchingPosts = IntranetManager.request('howdoi:posts:search:category', opts);

                            return [app, fetchingPosts, searchFormView];

                        }).spread(function ( app, fetchedPosts, searchFormView ) {

                                //IntranetManager.trigger('howdoi:category:header', opts.category);

                                that.showCategoryHeader(opts.category);

                                searchFormView.on("howdoi:category:search", function ( filterCriterion ) {

                                    console.log("howdoi:category:search event , criterion = " + filterCriterion);
                                    // alert('searching');
                                     opts.criterion =  filterCriterion;

                                    var search = IntranetManager.request("howdoi:posts:search:category", opts);
                                    search.then(function ( results ) {
                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(that.getListView(results));
                                    });

                                });


                                IntranetManager.layoutContent.reset();
                                IntranetManager.layoutContent.show(that.getListView(fetchedPosts));

                            }).fail(function ( err ) {
                                //alert(' an error occurred ' + err);
                                console.log('an error occurred ' + err);
                            });

                    });

                },


                showCategoryHeader: function ( category_code ) {


                    var that = this;

                    require(['entities/taxonomy'], function () {

                        var fetchingCategory = IntranetManager.request('taxonomy:entity:by:code', category_code);


                        fetchingCategory.then(function ( category ) {
                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getCategoryHeaderView(category.at(0)));

                        })
                            .fail(function ( error ) {
                                alert(error);
                            });


                    });


                }


            }
        });

    return IntranetManager.HowDoIManager.Public.Category.Show.Controller;
});

