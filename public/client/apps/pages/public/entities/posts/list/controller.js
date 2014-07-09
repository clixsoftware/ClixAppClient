define([
    "app",
    "apps/pages/public/entities/posts/list/views",
    "apps/pages/public/common/views",
    "common/views",
    "backbone.virtual-collection",
    "backbone.grouped-collection",
    "moment"

],
    function ( IntranetManager, ListViews, CommonViews, GlobalViews ) {
        IntranetManager.module("PageManager.Public.Posts.List",
            function ( List, PageManager, Backbone, Marionette, $, _ ) {
                List.Controller = {


                   getListView: function ( projects ) {
                        return   new ListViews.ListView({
                            collection: projects
                        });
                    },

                    getSearchFormView: function () {
                        return new ListViews.SearchFormView();
                    },

                    getNoRecordsView: function () {
                        return new ListViews.NoRecordsView();
                    },

                    getHeaderView: function (app) {
                        return new ListViews.HeaderView({
                            model: app
                        });
                    },

                    showPostListPage: function (options) {

                        console.group('<<PageManager  showPostsListPage>>');

                        var that = this;

                        require(['entities/applications', 'entities/calendar'], function () {

                       options.parent_feature =  CalendarManager.feature.id;

                        console.log('@@ Fetching Current Application using = ' + JSON.stringify(options));

                        var fetchingApp = IntranetManager.request('applications:feature:alias', options);

                        fetchingApp.then(function(app){

                            var settings = {
                                applicationId: app.get('id')
                            };

                            IntranetManager.layoutHeader.reset();
                            IntranetManager.layoutHeader.show(that.getHeaderView(app));

                            var fetchingPosts = IntranetManager.request('calendar:app:events', settings);

                            var fetchedPosts = fetchingPosts.then(function(posts){
                                return posts;
                            });

                           /* var searchFormView = that.getSearchFormView();
                            IntranetManager.layoutSearch.reset();
                            IntranetManager.layoutSearch.show(searchFormView);
*/
                            return [app, fetchedPosts, settings]
                        })
                        .spread(function(app, posts, settings){

/*                                searchFormView.on("projects:search", function ( filterCriterion ) {

                                    console.log("projects:search event , criterion = " + filterCriterion);
                                    // alert('searching');
                                    settings.criterion =  filterCriterion;

                                    var search = IntranetManager.request("projects:app:projects:search", settings);
                                    search.then(function ( results ) {
                                        IntranetManager.layoutContent.reset();
                                        IntranetManager.layoutContent.show(that.getListView(results));
                                    });

                                });*/

                                IntranetManager.layoutContent.reset();

                           if(posts.length === 0 ){
                               IntranetManager.layoutContent.show(new GlobalViews.NoItemFoundView());
                             }else{
                                 IntranetManager.layoutContent.show(that.getListView(posts));
                             }


                        })
                            .fail(function(error){
                                console.log('Error ' + error);
                            });
                    });

                    }

                }

            });

        return IntranetManager.PageManager.Public.Posts.List.Controller;
    });

